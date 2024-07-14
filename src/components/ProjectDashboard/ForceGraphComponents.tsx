import React, { useRef, useCallback, useMemo, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ForceGraph2D } from 'react-force-graph';
import { fetchDirectoryStructure } from '../../utils/api';
import { transformApiResponse } from '../../utils/transformApiResponse';
import useFileChanges from '../../hooks/useFileChanges';

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

  // ディレクトリ構造を読み込む関数
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

  // システムが選択されたらディレクトリ構造を読み込む
  useEffect(() => {
    if (selectedSystem) {
      loadDirectoryStructure();
    }
  }, [selectedSystem, loadDirectoryStructure]);

  // ファイルの変更があったらディレクトリ構造を再読み込み
  useEffect(() => {
    if (changes.length > 0) {
      loadDirectoryStructure();
    }
  }, [changes, loadDirectoryStructure]);

  // ノードの色を取得する関数
  const getNodeColor = useCallback((node) => {
    if (node.type === 'directory') {
      const specialDirectoryColors = {
        'exe_history': 'rgba(255, 99, 71, 0.8)',  // トマト
        'frontend': 'rgba(255, 165, 0, 0.8)',    // かなり明るいオレンジ
        'backend': 'rgba(230, 130, 255, 0.8)',      // かなり明るい紫
        'middleware': 'rgba(0, 255, 127, 0.8)',   // かなり明るい緑
        'docs': 'rgba(138, 43, 226, 0.8)',        // ブルーバイオレット
        'tests': 'rgba(255, 20, 147, 0.8)',       // ディープピンク
        'resources': 'rgba(0, 191, 255, 0.8)',    // ディープスカイブルー
        'database': 'rgba(255, 215, 0, 0.8)',     // ゴールド
        'logs': 'rgba(169, 169, 169, 0.8)',       // ダークグレー
        'locales': 'rgba(0, 250, 154, 0.8)',      // メディウムスプリンググリーン
        'meta': 'rgba(255, 215, 0, 1)'            // 純金色
      };
      return specialDirectoryColors[node.name] || 'rgba(0, 150, 255, 0.8)';
    }
    const extension = node.name.split('.').pop().toLowerCase();
    switch (extension) {
      case 'js':
      case 'jsx':
        return 'rgba(255, 165, 0, 0.8)'; // JavaScript（オレンジ）
      case 'ts':
        return 'rgba(255, 140, 0, 0.8)'; // TypeScript（ダークオレンジ）
      case 'tsx':
        return 'rgba(255, 69, 0, 0.8)'; // TypeScript React（レッドオレンジ）
      case 'css':
      case 'scss':
        return 'rgba(0, 220, 255, 0.8)'; // スタイルシート
      case 'html':
        return 'rgba(255, 100, 0, 0.8)'; // HTML
      case 'json':
        return 'rgba(150, 150, 150, 0.8)'; // JSON
      case 'md':
        return 'rgba(100, 255, 100, 0.8)'; // Markdown
      case 'py':
        return 'rgba(230, 130, 255, 0.8)'; // Python（かなり明るい紫系統に変更）
      case 'rb':
        return 'rgba(255, 45, 85, 0.8)'; // Ruby（赤系統に変更）
      case 'php':
        return 'rgba(255, 69, 58, 0.8)'; // PHP（赤系統に変更）
      case 'java':
        return 'rgba(255, 105, 97, 0.8)'; // Java（赤系統に変更）
      case 'go':
        return 'rgba(255, 55, 95, 0.8)'; // Go（赤系統に変更）
      case 'rs':
        return 'rgba(255, 85, 85, 0.8)'; // Rust（赤系統に変更）
      case 'sql':
        return 'rgba(255, 99, 71, 0.8)'; // SQL（赤系統に変更）
      case 'sh':
      case 'bash':
        return 'rgba(255, 69, 0, 0.8)'; // シェルスクリプト（赤系統に変更）
      case 'yml':
      case 'yaml':
        return 'rgba(203, 23, 30, 0.8)'; // YAML
      case 'dockerfile':
        return 'rgba(0, 128, 0, 0.8)'; // Dockerfile（緑系統に変更）
      default:
        return 'rgba(200, 200, 200, 0.8)'; // その他
    }
  }, []);

  // ノードクリック時の処理
  const handleClick = useCallback((node) => {
    console.log('Clicked node:', node);
    if (fgRef.current) {
      const fg = fgRef.current;
      fg.zoom(4, 2000);
    }

    // 強調表示するノードとリンクを格納するSetを作成
    const highlightedNodes = new Set();
    const highlightedLinks = new Set();

    // クリックされたノードを強調表示に追加
    highlightedNodes.add(node);

    // クリックされたノードの隣接ノードとリンクを強調表示に追加
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

    // 強調表示するノードとリンクをフィルタリング
    const filteredNodes = directoryStructure.nodes.filter(n => highlightedNodes.has(n));
    const filteredLinks = directoryStructure.links.filter(l => highlightedLinks.has(l));

    // フィルタリングされたノードとリンクを設定
    setFilteredNodes(filteredNodes);
    setFilteredLinks(filteredLinks);

    // 選択中ノードの更新
    setSelectedNodes(prevSelected => {
      const index = prevSelected.findIndex(n => n.id === node.id);
      if (index > -1) {
        return prevSelected.filter(n => n.id !== node.id);
      } else {
        return [...prevSelected, node];
      }
    });
  }, [directoryStructure]);

  // 検索処理
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

  // 全体表示の処理
  const showAll = useCallback(() => {
    setFilteredNodes(directoryStructure.nodes);
    setFilteredLinks(directoryStructure.links);
    setSearchQuery('');
    if (fgRef.current) {
      fgRef.current.zoomToFit(400);
    }
  }, [directoryStructure]);

  // フォースグラフの設定
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

      // ディレクトリノードを常に光らせる
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

      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillStyle = 'rgba(255, 255, 255, 1)';
      ctx.fillText(label, node.x, node.y + fontSize * 1.5);

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
  }), [getNodeColor, handleClick, selectedNodes, filteredNodes, filteredLinks]);

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
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder={t('Search file name')}
            className="px-3 py-1 text-sm rounded-md bg-[#2a2a2a] text-[#d4d4d4] border border-[#3c3c3c] focus:outline-none focus:border-[#6c6c6c]"
          />
          <button
            onClick={showAll}
            className="px-3 py-1 text-sm rounded-md bg-[#4a4a4a] text-white hover:bg-[#5a5a5a] transition-colors"
          >
            {t('Show All')}
          </button>
          {['FileTree', 'BusinessStructure', 'Dependencies', 'DataStructure', 'Similarity', 'ImmuneSystem', 'Multimedia'].map((structure) => (
            <button
              key={structure}
              onClick={() => setSelectedStructure(structure)}
              className={`px-3 py-1 text-sm rounded-md transition-colors ${
                selectedStructure === structure ? 'bg-[#4a4a4a] text-white' : 'bg-[#2a2a2a] text-[#a0a0a0] hover:bg-[#3a3a3a]'
              }`}
            >
              {t(structure)}
            </button>
          ))}
        </div>
      </div>
      <div className="flex-grow">
        <ForceGraph2D
          ref={fgRef}
          {...forceGraphConfig}
        />
      </div>
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
    </div>
  );
});