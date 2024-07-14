import os
import subprocess
import datetime

# Get current date and time
current_datetime = datetime.datetime.now().strftime("%Y%m%d_%H%M%S")

# Define the script filename
script_filename = f"{current_datetime}_file-splitting-script.py"

# Define the content of the script
script_content = '''
import os
import subprocess
from typing import List, Dict

def create_directory(path: str) -> None:
    """Create directory if it doesn't exist."""
    os.makedirs(path, exist_ok=True)

def write_file(path: str, content: str) -> None:
    """Write content to file, creating directories if needed."""
    create_directory(os.path.dirname(path))
    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)

def run_command(command: List[str]) -> str:
    """Run a shell command and return its output."""
    return subprocess.run(command, capture_output=True, text=True).stdout.strip()

def file_exists(path: str) -> bool:
    """Check if a file exists."""
    return os.path.exists(path)

def get_user_confirmation(message: str) -> bool:
    """Get user confirmation for an action."""
    response = input(f"{message} (yes/no): ").lower()
    return response == 'yes' or response == 'y'

def split_files() -> None:
    """Split ForceGraphComponents.tsx into multiple files."""
    base_path = 'SystemEditor'
    source_file = os.path.join(base_path, 'ForceGraphComponents.tsx')

    # Define the new file structure
    new_files: Dict[str, str] = {
        'components/FileStructure/index.tsx': """
import React, { useRef, useCallback, useMemo, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import ForceGraph from './ForceGraph';
import MockEditor from './MockEditor';
import SearchBar from './SearchBar';
import RecentChanges from './RecentChanges';
import Button from '../common/Button';
import useFileChanges from '../../hooks/useFileChanges';
import useForceGraph from '../../hooks/useForceGraph';
import { fetchDirectoryStructure } from '../../utils/api';
import { transformApiResponse } from '../../utils/transformApiResponse';
import { getNodeColor } from '../../utils/colors';

export const FileStructure = React.memo(({ onNodeClick, selectedSystem }) => {
  const fgRef = useRef();
  const { t } = useTranslation();
  const [selectedNodes, setSelectedNodes] = useState([]);
  const [directoryStructure, setDirectoryStructure] = useState({ nodes: [], links: [] });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const changes = useFileChanges();
  const [selectedStructure, setSelectedStructure] = useState('FileTree');
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredNodes, setFilteredNodes] = useState([]);
  const [filteredLinks, setFilteredLinks] = useState([]);
  const [showFileNames, setShowFileNames] = useState(true);
  const [selectedNode, setSelectedNode] = useState(null);

  const loadDirectoryStructure = useCallback(async () => {
    try {
      setIsLoading(true);
      if (selectedSystem) {
        const data = await fetchDirectoryStructure(selectedSystem);
        const transformedData = transformApiResponse(data.structure);
        setDirectoryStructure(transformedData);
        setFilteredNodes(transformedData.nodes);
        setFilteredLinks(transformedData.links);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, [selectedSystem]);

  useEffect(() => {
    if (selectedSystem) {
      loadDirectoryStructure();
    }
  }, [selectedSystem, loadDirectoryStructure]);

  useEffect(() => {
    if (changes.length > 0) {
      loadDirectoryStructure();
    }
  }, [changes, loadDirectoryStructure]);

  const handleClick = useCallback((node) => {
    console.log('Clicked node:', node);
    if (fgRef.current) {
      const fg = fgRef.current;
      fg.zoom(4, 2000);
    }

    const highlightedNodes = new Set();
    const highlightedLinks = new Set();

    highlightedNodes.add(node);

    directoryStructure.links.forEach(link => {
      if (typeof link.source === 'object' && typeof link.target === 'object') {
        if (link.source.id === node.id || link.target.id === node.id) {
          highlightedLinks.add(link);
          const adjacentNode = link.source.id === node.id ? link.target : link.source;
          highlightedNodes.add(adjacentNode);
        }
      } else {
        console.error('Link source or target has unexpected format:', link);
      }
    });

    setFilteredNodes(Array.from(highlightedNodes));
    setFilteredLinks(Array.from(highlightedLinks));

    setSelectedNodes(prevSelected => {
      const index = prevSelected.findIndex(n => n.id === node.id);
      if (index > -1) {
        return prevSelected.filter(n => n.id !== node.id);
      } else {
        return [...prevSelected, node];
      }
    });

    setSelectedNode(node);
  }, [directoryStructure]);

  const handleSearch = useCallback((query) => {
    setSearchQuery(query);
    if (!query) {
      setFilteredNodes(directoryStructure.nodes);
      setFilteredLinks(directoryStructure.links);
    } else {
      const filteredResults = directoryStructure.nodes.filter(node => 
        (node.name && node.name.toLowerCase().includes(query.toLowerCase())) ||
        (node.path && node.path.toLowerCase().includes(query.toLowerCase()))
      );
      setFilteredNodes(filteredResults);
      const relatedLinks = directoryStructure.links.filter(link => 
        filteredResults.some(n => n.id === link.source) && filteredResults.some(n => n.id === link.target)
      );
      setFilteredLinks(relatedLinks);
    }
  }, [directoryStructure]);

  const showAll = useCallback(() => {
    setFilteredNodes(directoryStructure.nodes);
    setFilteredLinks(directoryStructure.links);
    setSearchQuery('');
    if (fgRef.current) {
      fgRef.current.zoomToFit(400);
    }
  }, [directoryStructure]);

  const forceGraphConfig = useMemo(() => ({
    graphData: { nodes: filteredNodes, links: filteredLinks },
    nodeLabel: "name",
    nodeAutoColorBy: getNodeColor,
    nodeCanvasObject: (node, ctx, globalScale) => {
      const label = node.name;
      const fontSize = node.type === 'directory' ? 14/globalScale : 12/globalScale;
      ctx.font = `${fontSize}px Sans-Serif`;
      const textWidth = ctx.measureText(label).width;
      const bckgDimensions = [textWidth, fontSize].map(n => n + fontSize * 0.2);

      ctx.beginPath();
      ctx.arc(node.x, node.y, node.type === 'directory' ? 6 : 4, 0, 2 * Math.PI);
      ctx.fillStyle = getNodeColor(node);
      ctx.fill();

      if (node.type === 'directory' || selectedNodes.some(n => n.id === node.id) || node.name === 'meta') {
        const baseGlowRadius = node.type === 'directory' ? 8 : 6;
        const time = performance.now() / 1000;
        const glowRadius = baseGlowRadius + Math.sin(time * 1.5) * 2;
        
        if (isFinite(node.x) && isFinite(node.y)) {
          const gradient = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, glowRadius);
          if (node.name === 'meta') {
            gradient.addColorStop(0, `rgba(255, 215, 0, ${0.8 + Math.sin(time * 1.5) * 0.2})`);
            gradient.addColorStop(0.5, `rgba(255, 215, 0, ${0.4 + Math.sin(time * 1.5) * 0.1})`);
            gradient.addColorStop(1, 'rgba(255, 215, 0, 0)');
          } else if (node.type === 'directory') {
            gradient.addColorStop(0, `rgba(0, 255, 255, ${0.8 + Math.sin(time * 1.5) * 0.2})`);
            gradient.addColorStop(0.5, `rgba(0, 255, 255, ${0.4 + Math.sin(time * 1.5) * 0.1})`);
            gradient.addColorStop(1, 'rgba(0, 255, 255, 0)');
          } else {
            gradient.addColorStop(0, `rgba(255, 255, 255, ${0.8 + Math.sin(time * 1.5) * 0.2})`);
            gradient.addColorStop(0.5, `rgba(255, 255, 255, ${0.4 + Math.sin(time * 1.5) * 0.1})`);
            gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
          }
          ctx.beginPath();
          ctx.arc(node.x, node.y, glowRadius, 0, 2 * Math.PI);
          ctx.fillStyle = gradient;
          ctx.fill();
        }

        ctx.beginPath();
        const circleRadius = node.type === 'directory' ? 6 : 4;
        ctx.arc(node.x, node.y, circleRadius, 0, 2 * Math.PI);
        ctx.strokeStyle = node.name === 'meta' ? 'rgba(255, 215, 0, 0.8)' : node.type === 'directory' ? 'rgba(0, 255, 255, 0.8)' : 'rgba(255, 255, 255, 0.8)';
        ctx.lineWidth = 2;
        ctx.stroke();
      }

      if (showFileNames) {
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = 'rgba(255, 255, 255, 1)';
        ctx.fillText(label, node.x, node.y + fontSize * 1.5);
      }

      node.__bckgDimensions = bckgDimensions;
    },
    linkWidth: 1.4,
    linkDirectionalParticles: 2,
    linkDirectionalParticleWidth: 1,
    linkDirectionalParticleSpeed: 0.005,
    linkDirectionalParticleColor: () => 'rgba(255, 255, 255, 0.6)',
    linkColor: () => 'rgba(255, 255, 255, 0.1)',
    nodeCanvasObjectMode: () => 'after',
    onNodeClick: handleClick,
    cooldownTicks: 1000,
    cooldownTime: 15000,
    width: 2000,
    height: 1000,
  }), [getNodeColor, handleClick, selectedNodes, filteredNodes, filteredLinks, showFileNames]);

  if (!selectedSystem) {
    return <div className="flex justify-center items-center h-full text-[#d4d4d4]">{t('Please select a system directory')}</div>;
  }

  if (isLoading) {
    return <div className="flex justify-center items-center h-full text-[#d4d4d4]">{t('Loading directory structure...')}</div>;
  }

  if (error) {
    return <div className="flex justify-center items-center h-full text-red-500">{t('Error')}: {error}</div>;
  }

  return (
    <div className="h-full border border-[#3c3c3c] rounded-md overflow-hidden bg-[#1e1e1e] flex flex-col">
      <div className="flex items-center justify-between p-3">
        <h3 className="text-lg font-medium text-[#d4d4d4] font-sans">{t('Project Structure')}</h3>
        <div className="flex space-x-2">
          <SearchBar onSearch={handleSearch} />
          <Button onClick={showAll}>{t('Show All')}</Button>
          <Button onClick={() => setShowFileNames(!showFileNames)}>
            {showFileNames ? t('Hide File Names') : t('Show File Names')}
          </Button>
          {['FileTree', 'BusinessStructure', 'Dependencies', 'DataStructure', 'Similarity', 'ImmuneSystem', 'Multimedia'].map((structure) => (
            <Button
              key={structure}
              onClick={() => setSelectedStructure(structure)}
              className={selectedStructure === structure ? 'bg-[#4a4a4a] text-white' : 'bg-[#2a2a2a] text-[#a0a0a0] hover:bg-[#3a3a3a]'}
            >
              {t(structure)}
            </Button>
          ))}
        </div>
      </div>
      <RecentChanges changes={changes} />
      {selectedNode && (
        <MockEditor
          node={selectedNode}
          onClose={() => setSelectedNode(null)}
        />
      )}
      <div className="flex-grow">
        <ForceGraph
          ref={fgRef}
          {...forceGraphConfig}
        />
      </div>
    </div>
  );
});

export default FileStructure;
""",
        'components/FileStructure/ForceGraph.tsx': """
import React, { forwardRef } from 'react';
import { ForceGraph2D } from 'react-force-graph';

const ForceGraph = forwardRef((props, ref) => {
  return <ForceGraph2D ref={ref} {...props} />;
});

export default ForceGraph;
""",
        'components/FileStructure/MockEditor.tsx': """
import React, { useState, useEffect } from 'react';

const MockEditor = ({ node, onClose }) => {
  const [position, setPosition] = useState({ x: window.innerWidth * 2/3, y: window.innerHeight / 2 - 250 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
  };

const handleMouseMove = (e) => {
    if (isDragging) {
      setPosition({
        x: Math.max(0, Math.min(e.clientX - dragStart.x, window.innerWidth - 600)),
        y: Math.max(0, Math.min(e.clientY - dragStart.y, window.innerHeight - 500))
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  return (
    <div 
      className="fixed bg-black bg-opacity-30 flex items-center justify-center z-50"
      style={{
        top: `${position.y}px`,
        left: `${position.x}px`,
        width: '600px',
        height: '500px',
        cursor: isDragging ? 'grabbing' : 'grab'
      }}
      onMouseDown={handleMouseDown}
    >
      <div className="bg-[#1e1e1e] bg-opacity-70 p-4 rounded-lg w-full h-full flex flex-col">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-white text-lg">{node.name}</h2>
          <button onClick={onClose} className="text-white text-sm hover:bg-[#3c3c3c] px-2 py-1 rounded">閉じる</button>
        </div>
        <pre className="flex-grow bg-[#2d2d2d] bg-opacity-30 p-3 rounded text-white text-sm overflow-auto">
          <textarea
            className="w-full h-full bg-transparent resize-none focus:outline-none"
            defaultValue={`// ${node.name} の内容がここに表示されます
// 実際のファイル内容を取得するには、
// バックエンドAPIとの連携が必要です。

// README.md の内容がここに表示されます
// 実際のファイル内容を取得するには、
// バックエンドAPIとの連携が必要です。

// ここにファイルの内容が表示されます。
// 実際のプロジェクトでは、このテキストエリアに
// 選択されたファイルの内容が動的に読み込まれます。

// エディタの機能をさらに拡張する場合は、
// シンタックスハイライトやコード補完などの
// 機能を追加することができます。`}
          />
        </pre>
      </div>
    </div>
  );
};

export default MockEditor;
""",
        'components/FileStructure/SearchBar.tsx': """
import React from 'react';
import { useTranslation } from 'react-i18next';

const SearchBar = ({ onSearch }) => {
  const { t } = useTranslation();

  return (
    <input
      type="text"
      onChange={(e) => onSearch(e.target.value)}
      placeholder={t('Search file name')}
      className="px-3 py-1 text-sm rounded-md bg-[#2a2a2a] text-[#d4d4d4] border border-[#3c3c3c] focus:outline-none focus:border-[#6c6c6c]"
    />
  );
};

export default SearchBar;
""",
        'components/FileStructure/RecentChanges.tsx': """
import React from 'react';
import { useTranslation } from 'react-i18next';

const RecentChanges = ({ changes }) => {
  const { t } = useTranslation();

  return (
    <div className="p-3 text-[#d4d4d4] max-h-[150px] overflow-y-auto">
      <h3 className="text-md font-medium mb-2">{t('Recent Changes')}:</h3>
      <ul className="list-disc list-inside">
        {changes.slice(0, 10).map((change, index) => (
          <li key={index} className="text-sm mb-1">
            {t(change.type)}: {change.path}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecentChanges;
""",
        'components/common/Button.tsx': """
import React from 'react';

const Button = ({ onClick, children, className = '' }) => {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-1 text-sm rounded-md bg-[#4a4a4a] text-white hover:bg-[#5a5a5a] transition-colors ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
""",
        'hooks/useFileChanges.ts': """
import { useState, useEffect } from 'react';

const useFileChanges = () => {
  const [changes, setChanges] = useState([]);

  useEffect(() => {
    // This is a mock implementation. In a real application, you would
    // set up a WebSocket connection or use polling to get file changes.
    const mockChanges = [
      { type: 'add', path: '/path/to/new/file.js' },
      { type: 'modify', path: '/path/to/modified/file.js' },
      { type: 'delete', path: '/path/to/deleted/file.js' },
    ];

    setChanges(mockChanges);

    // Clean up function
    return () => {
      // Close WebSocket connection or clear polling interval
    };
  }, []);

  return changes;
};

export default useFileChanges;
""",
        'hooks/useForceGraph.ts': """
import { useCallback, useMemo } from 'react';
import { getNodeColor } from '../utils/colors';

const useForceGraph = (directoryStructure, selectedNodes, handleClick) => {
  const forceGraphConfig = useMemo(() => ({
    graphData: directoryStructure,
    nodeLabel: "name",
    nodeAutoColorBy: getNodeColor,
    nodeCanvasObject: (node, ctx, globalScale) => {
      // Node rendering logic here
    },
    linkWidth: 1.4,
    linkDirectionalParticles: 2,
    linkDirectionalParticleWidth: 1,
    linkDirectionalParticleSpeed: 0.005,
    linkDirectionalParticleColor: () => 'rgba(255, 255, 255, 0.6)',
    linkColor: () => 'rgba(255, 255, 255, 0.1)',
    nodeCanvasObjectMode: () => 'after',
    onNodeClick: handleClick,
    cooldownTicks: 1000,
    cooldownTime: 15000,
    width: 2000,
    height: 1000,
  }), [directoryStructure, selectedNodes, handleClick]);

  return forceGraphConfig;
};

export default useForceGraph;
""",
        'utils/api.ts': """
export const fetchDirectoryStructure = async (selectedSystem) => {
  // This is a mock implementation. In a real application, you would
  // make an API call to fetch the directory structure.
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        structure: {
          nodes: [
            { id: 1, name: 'root', type: 'directory' },
            { id: 2, name: 'src', type: 'directory' },
            { id: 3, name: 'index.js', type: 'file' },
          ],
          links: [
            { source: 1, target: 2 },
            { source: 2, target: 3 },
          ],
        },
      });
    }, 1000);
  });
};
""",
        'utils/colors.ts': """
export const getNodeColor = (node) => {
  if (node.type === 'directory') {
    const specialDirectoryColors = {
      'exe_history': 'rgba(255, 99, 71, 0.8)',
      'frontend': 'rgba(255, 165, 0, 0.8)',
      'backend': 'rgba(230, 130, 255, 0.8)',
      'middleware': 'rgba(0, 255, 127, 0.8)',
      'docs': 'rgba(138, 43, 226, 0.8)',
      'tests': 'rgba(255, 20, 147, 0.8)',
      'resources': 'rgba(0, 191, 255, 0.8)',
      'database': 'rgba(255, 215, 0, 0.8)',
      'logs': 'rgba(169, 169, 169, 0.8)',
      'locales': 'rgba(0, 250, 154, 0.8)',
      'meta': 'rgba(255, 215, 0, 1)'
    };
    return specialDirectoryColors[node.name] || 'rgba(0, 150, 255, 0.8)';
  }
  const extension = node.name.split('.').pop().toLowerCase();
  switch (extension) {
    case 'js':
    case 'jsx':
      return 'rgba(255, 165, 0, 0.8)';
    case 'ts':
      return 'rgba(255, 140, 0, 0.8)';
    case 'tsx':
      return 'rgba(255, 69, 0, 0.8)';
    case 'css':
    case 'scss':
      return 'rgba(0, 220, 255, 0.8)';
    case 'html':
      return 'rgba(255, 100, 0, 0.8)';
    case 'json':
      return 'rgba(150, 150, 150, 0.8)';
    case 'md':
      return 'rgba(100, 255, 100, 0.8)';
    case 'py':
      return 'rgba(230, 130, 255, 0.8)';
    case 'rb':
      return 'rgba(255, 45, 85, 0.8)';
    case 'php':
      return 'rgba(255, 69, 58, 0.8)';
    case 'java':
      return 'rgba(255, 105, 97, 0.8)';
    case 'go':
      return 'rgba(255, 55, 95, 0.8)';
    case 'rs':
      return 'rgba(255, 85, 85, 0.8)';
    case 'sql':
      return 'rgba(255, 99, 71, 0.8)';
    case 'sh':
    case 'bash':
      return 'rgba(255, 69, 0, 0.8)';
    case 'yml':
    case 'yaml':
      return 'rgba(203, 23, 30, 0.8)';
    case 'dockerfile':
      return 'rgba(0, 128, 0, 0.8)';
    default:
      return 'rgba(200, 200, 200, 0.8)';
  }
};
""",
        'utils/transformApiResponse.ts': """
export const transformApiResponse = (data) => {
  // This is a mock implementation. In a real application, you would
  // transform the API response to the format expected by react-force-graph.
  return {
    nodes: data.nodes.map(node => ({
      ...node,
      id: node.id.toString(),
    })),
    links: data.links.map(link => ({
      ...link,
      source: link.source.toString(),
      target: link.target.toString(),
    })),
  };
};
""",
        'types/index.ts': """
export interface Node {
  id: string;
  name: string;
  type: 'file' | 'directory';
}

export interface Link {
  source: string;
  target: string;
}

export interface DirectoryStructure {
  nodes: Node[];
  links: Link[];
}

export interface FileChange {
  type: 'add' | 'modify' | 'delete';
  path: string;
}
"""
    }

    # Check if source file exists
    if not file_exists(source_file):
        print(f"Error: Source file {source_file} does not exist.")
        return

    # Create new files
    for file_path, content in new_files.items():
        full_path = os.path.join(base_path, file_path)
        if file_exists(full_path):
            print(f"Warning: File {full_path} already exists.")
            if not get_user_confirmation(f"Do you want to overwrite {full_path}?"):
                continue
        write_file(full_path, content)
        print(f"Created file: {full_path}")

    # Create redirect file
    redirect_content = "export { default } from './components/FileStructure';"
    write_file(source_file, redirect_content)
    print(f"Created redirect file: {source_file}")

    print("File splitting completed successfully.")

if __name__ == '__main__':
    split_files()
'''

# Write the script to a file
with open(script_filename, 'w') as f:
    f.write(script_content)

print(f"File splitting script has been created: {script_filename}")
print("To run the script, use the following command:")
print(f"python {script_filename}")