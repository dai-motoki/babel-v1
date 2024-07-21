import React, { useRef, useCallback, useMemo, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import ForceGraph2D from 'react-force-graph-2d';
import ForceGraph3D from 'react-force-graph-3d';
import * as THREE from 'three';
import SpriteText from 'three-spritetext';
import Draggable from 'react-draggable';
import { Copy, Trash, Highlighter, Network, Edit, MessageCircle, MousePointer, ListTodo, Plus, Box } from 'lucide-react';
import { Loader2, AlertTriangle } from 'lucide-react';

import HighlightedGroups from './HighlightedGroups';
import RecentChanges from './RecentChanges';
import ControlPanel from './ControlPanel';
import NodeContextMenu from './ContextMenus/NodeContextMenu';
import SelectionActionMenu from './ContextMenus/SelectionActionMenu';
import GraphOverlay from './GraphOverlay';
import FloatingButtons from './FloatingButtons';
import AIChat from './AIChat';
import TaskManager from './TaskManager';
import ForceGraph from './ForceGraph';

import MockEditor from '../IDE/MockEditor';
import Button from '@/components/common/Button';
import useFileChanges from '@/hooks/useFileChanges';
import useForceGraph from '@/hooks/useForceGraph';
import { fetchDirectoryStructure } from '@/utils/api';
import { transformApiResponse } from '@/utils/transformApiResponse';
import { getNodeColor } from '@/utils/colors';

export const FileStructure = React.memo(({ onNodeClick, selectedSystem }) => {
  const fgRef = useRef();
  const overlayRef = useRef();
  const { t } = useTranslation();
  const [selectedNodes, setSelectedNodes] = useState([]);
  const [directoryStructure, setDirectoryStructure] = useState({ nodes: [], links: [] });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { changes, handleFileChange: originalHandleFileChange } = useFileChanges();
  const [fileHistory, setFileHistory] = useState<{ [key: string]: string[] }>({});

  const handleFileChange = useCallback((newChanges) => {
    originalHandleFileChange(newChanges);
    
    // ファイル履歴の更新
    setFileHistory((prevHistory) => {
      const newHistory = { ...prevHistory };
      newChanges.forEach((change) => {
        if (!newHistory[change.fileName]) {
          newHistory[change.fileName] = [];
        }
        newHistory[change.fileName].push(change.content);
      });
      return newHistory;
    });
  }, [originalHandleFileChange]);

  const [selectedStructure, setSelectedStructure] = useState('FileTree');
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredNodes, setFilteredNodes] = useState([]);
  const [filteredLinks, setFilteredLinks] = useState([]);
  const [showFileNames, setShowFileNames] = useState(false);
  const [clickedNode, setClickedNode] = useState(null);
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });
  const [isSelectionMode, setIsSelectionMode] = useState(false);
  const [selectionPath, setSelectionPath] = useState([]);
  const [selectedNodesInPath, setSelectedNodesInPath] = useState([]);
  const [showAIChat, setShowAIChat] = useState(false);
  const [showTaskManager, setShowTaskManager] = useState(false);
  const [selectedGroupId, setSelectedGroupId] = useState(null);
  const [is3D, setIs3D] = useState(false);

  useEffect(() => {
    let ws: WebSocket;
  
    const connectWebSocket = () => {
      ws = new WebSocket('ws://localhost:8001/ws');
  
      ws.onopen = () => {
        console.log('WebSocket接続が確立されました');
      };
  
      ws.onmessage = (event) => {
        const data = JSON.parse(event.data);
        if (data.changes) {
          const newChanges = data.changes.map((change: any) => ({
            fileName: change.path.split('/babel_generated/').pop() || change.path,
            timestamp: new Date().toISOString(),
            type: change.type
          }));
          handleFileChange(newChanges);
        }
      };
  
      ws.onclose = () => {
        console.log('WebSocket接続が閉じられました。再接続を試みます...');
        setTimeout(connectWebSocket, 3000);
      };
  
      ws.onerror = (error) => {
        console.error('WebSocketエラー:', error);
      };
    };
  
    connectWebSocket();
  
    return () => {
      if (ws) {
        ws.close();
      }
    };
  }, [handleFileChange]);



  const [highlightedNodeGroups, setHighlightedNodeGroups] = useState(() => {
    const savedGroups = localStorage.getItem('highlightedNodeGroups');
    return savedGroups ? JSON.parse(savedGroups) : [{ id: 1, name: 'グループ1', nodes: [] }];
  });

  const addNewHighlightGroup = useCallback(() => {
    setHighlightedNodeGroups(prevGroups => {
      const newGroupId = Math.max(...prevGroups.map(g => g.id), 0) + 1;
      return [...prevGroups, { id: newGroupId, name: `グループ${newGroupId}`, nodes: [] }];
    });
  }, []);

  const editGroupName = useCallback((groupId, newName) => {
    setHighlightedNodeGroups(prevGroups =>
      prevGroups.map(group =>
        group.id === groupId ? { ...group, name: newName } : group
      )
    );
  }, []);

  const loadDirectoryStructure = useCallback(async () => {
    try {
      setIsLoading(true);
      if (selectedSystem) {
        const data = await fetchDirectoryStructure(selectedSystem);
        if (!data || !data.structure) {
          throw new Error('ディレクトリ構造データが不正です');
        }
        const transformedData = transformApiResponse(data.structure);
        setDirectoryStructure(transformedData);
        setFilteredNodes(transformedData.nodes);
        setFilteredLinks(transformedData.links);
  
        // ファイル履歴の更新
        setFileHistory(prevHistory => {
          const newHistory = { ...prevHistory };
          transformedData.nodes.forEach((node) => {
            if (node.type === 'file') {
              if (!newHistory[node.id]) {
                newHistory[node.id] = [node.content];
              } else if (newHistory[node.id][newHistory[node.id].length - 1] !== node.content) {
                newHistory[node.id].push(node.content);
              }
            }
          });
          return newHistory;
        });
      } else {
        throw new Error('システムが選択されていません');
      }
    } catch (err) {
      console.error('ディレクトリ構造の読み込み中にエラーが発生しました:', err);
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

  const handleClick = useCallback((node, event) => {
    if (!isSelectionMode) {
      console.log('クリックされたノード:', node);
      setMenuPosition({ x: event.clientX, y: event.clientY });
      setClickedNode(node);
    }
  }, [isSelectionMode]);

  const highlightNode = useCallback((node, groupId) => {
    setHighlightedNodeGroups(prevGroups => {
      return prevGroups.map(group => {
        if (group.id === groupId) {
          const nodeIndex = group.nodes.findIndex(n => n.id === node.id);
          if (nodeIndex !== -1) {
            const updatedNodes = [...group.nodes];
            updatedNodes[nodeIndex] = { ...updatedNodes[nodeIndex], isSelected: !updatedNodes[nodeIndex].isSelected };
            return { ...group, nodes: updatedNodes };
          } else {
            return { ...group, nodes: [...group.nodes, { ...node, isSelected: true }] };
          }
        }
        return group;
      });
    });
  }, []);

  const toggleGroupHighlight = useCallback((groupId, isSelected) => {
    setHighlightedNodeGroups(prevGroups => {
      return prevGroups.map(group => {
        if (group.id === groupId) {
          return {
            ...group,
            nodes: group.nodes.map(node => ({ ...node, isSelected }))
          };
        }
        return group;
      });
    });
  }, []);

  const removeHighlightGroup = useCallback((groupId) => {
    setHighlightedNodeGroups(prevGroups => prevGroups.filter(group => group.id !== groupId));
    if (selectedGroupId === groupId) {
      setSelectedGroupId(null);
    }
  }, [selectedGroupId]);

  const getNodeSurroundings = useCallback((node) => {
    const surroundingNodes = new Set([node]);
    const surroundingLinks = new Set();

    directoryStructure.links.forEach(link => {
      if (typeof link.source === 'object' && typeof link.target === 'object') {
        if (link.source.id === node.id || link.target.id === node.id) {
          surroundingLinks.add(link);
          const adjacentNode = link.source.id === node.id ? link.target : link.source;
          surroundingNodes.add(adjacentNode);
        }
      } else {
        console.error('リンクのsourceまたはtargetが予期せぬ形式です:', link);
      }
    });

    setFilteredNodes(Array.from(surroundingNodes));
    setFilteredLinks(Array.from(surroundingLinks));
  }, [directoryStructure]);

  const showEditor = useCallback((node) => {
    setSelectedNodes(prevSelected => {
      if (!prevSelected.some(n => n.id === node.id)) {
        return [...prevSelected, node];
      }
      return prevSelected;
    });
  }, []);

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

  const toggleSelectionMode = () => {
    setIsSelectionMode(!isSelectionMode);
    if (isSelectionMode) {
      setSelectedNodesInPath([]);
      setSelectionPath([]);
    }
    if (fgRef.current) {
      fgRef.current.d3Force('center', null);
      fgRef.current.d3Force('charge', null);
      fgRef.current.d3Force('link', null);
      fgRef.current.d3Force('collide', null);
    }
  };

  const handleOverlayMouseDown = (event) => {
    if (isSelectionMode) {
      const { offsetX, offsetY } = event.nativeEvent;
      setSelectionPath([{ x: offsetX, y: offsetY }]);
      setSelectedNodesInPath([]);
    }
  };

  const handleOverlayMouseMove = (event) => {
    if (isSelectionMode && selectionPath.length > 0) {
      const { offsetX, offsetY } = event.nativeEvent;
      setSelectionPath(prevPath => [...prevPath, { x: offsetX, y: offsetY }]);
    }
  };

  const handleOverlayMouseUp = () => {
    if (isSelectionMode && selectionPath.length > 0) {
      const selectedNodes = filteredNodes.filter(node => {
        const { x, y } = fgRef.current.graph2ScreenCoords(node.x, node.y);
        return isPointInPolygon({ x, y }, selectionPath);
      });
      setSelectedNodesInPath(selectedNodes);
      setSelectionPath([]);
    }
  };

  const isPointInPolygon = (point, polygon) => {
    let inside = false;
    for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
      const xi = polygon[i].x, yi = polygon[i].y;
      const xj = polygon[j].x, yj = polygon[j].y;
      const intersect = ((yi > point.y) !== (yj > point.y))
          && (point.x < (xj - xi) * (point.y - yi) / (yj - yi) + xi);
      if (intersect) inside = !inside;
    }
    return inside;
  };

  const handleSelectionAction = (action) => {
    switch (action) {
      case 'highlight':
        setHighlightedNodeGroups(prevGroups => {
          const lastGroup = prevGroups[prevGroups.length - 1];
          return [
            ...prevGroups.slice(0, -1),
            {
              ...lastGroup,
              nodes: [
                ...lastGroup.nodes,
                ...selectedNodesInPath.map(node => ({ ...node, isSelected: true }))
              ]
            }
          ];
        });
        break;
      case 'surroundings':
        const surroundingNodes = new Set(selectedNodesInPath);
        const surroundingLinks = new Set();
        selectedNodesInPath.forEach(node => {
          directoryStructure.links.forEach(link => {
            if (link.source.id === node.id || link.target.id === node.id) {
              surroundingLinks.add(link);
              const adjacentNode = link.source.id === node.id ? link.target : link.source;
              surroundingNodes.add(adjacentNode);
            }
          });
        });
        setFilteredNodes(Array.from(surroundingNodes));
        setFilteredLinks(Array.from(surroundingLinks));
        break;
      case 'showEditor':
        selectedNodesInPath.forEach(node => showEditor(node));
        break;
      default:
        console.log(`Action ${action} not implemented for selection`);
    }
    setSelectedNodesInPath([]);
    setSelectionPath([]);
  };

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

      if (node.type === 'directory' || selectedNodes.some(n => n.id === node.id) || node.name === 'meta' || highlightedNodeGroups.some(group => group.nodes.some(n => n.id === node.id && n.isSelected)) || selectedNodesInPath.some(n => n.id === node.id)) {
        const baseGlowRadius = node.type === 'directory' ? 8 : 6;
        const time = performance.now() / 1000;
        const glowRadius = baseGlowRadius + Math.sin(time * 1.5) * 2;
        
        if (isFinite(node.x) && isFinite(node.y)) {
          const gradient = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, glowRadius);
          if (highlightedNodeGroups.some(group => group.nodes.some(n => n.id === node.id && n.isSelected))) {
            gradient.addColorStop(0, `rgba(255, 255, 255, ${0.9 + Math.sin(time * 1.5) * 0.1})`);
            gradient.addColorStop(0.5, `rgba(255, 255, 255, ${0.7 + Math.sin(time * 1.5) * 0.1})`);
            gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
          } else if (node.name === 'meta') {
            gradient.addColorStop(0, `rgba(255, 215, 0, ${0.8 + Math.sin(time * 1.5) * 0.2})`);
            gradient.addColorStop(0.5, `rgba(255, 215, 0, ${0.4 + Math.sin(time * 1.5) * 0.1})`);
            gradient.addColorStop(1, 'rgba(255, 215, 0, 0)');
          } else if (node.type === 'directory') {
            gradient.addColorStop(0, `rgba(0, 255, 255, ${0.8 + Math.sin(time * 1.5) * 0.2})`);
            gradient.addColorStop(0.5, `rgba(0, 255, 255, ${0.4 + Math.sin(time * 1.5) * 0.1})`);
            gradient.addColorStop(1, 'rgba(0, 255, 255, 0)');
          } else if (selectedNodesInPath.some(n => n.id === node.id)) {
            gradient.addColorStop(0, `rgba(255, 0, 0, ${0.8 + Math.sin(time * 1.5) * 0.2})`);
            gradient.addColorStop(0.5, `rgba(255, 0, 0, ${0.4 + Math.sin(time * 1.5) * 0.1})`);
            gradient.addColorStop(1, 'rgba(255, 0, 0, 0)');
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
        ctx.strokeStyle = highlightedNodeGroups.some(group => group.nodes.some(n => n.id === node.id && n.isSelected)) ? 'rgba(255, 255, 255, 1)' : 
                          node.name === 'meta' ? 'rgba(255, 215, 0, 0.8)' : 
                          node.type === 'directory' ? 'rgba(0, 255, 255, 0.8)' : 
                          selectedNodesInPath.some(n => n.id === node.id) ? 'rgba(255, 0, 0, 0.8)' :
                          'rgba(255, 255, 255, 0.8)';
        ctx.lineWidth = highlightedNodeGroups.some(group => group.nodes.some(n => n.id === node.id && n.isSelected)) || selectedNodesInPath.some(n => n.id === node.id) ? 3 : 2;
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
    linkWidth: 2,
    linkDirectionalParticles: 2,
    linkDirectionalParticleWidth: 2.5,
    linkDirectionalParticleSpeed: 0.005,
    linkDirectionalParticleColor: () => 'rgba(255, 255, 255, 0.6)',
    linkColor: () => 'rgba(255, 255, 255, 0.1)',
    nodeCanvasObjectMode: () => 'after',
    onNodeClick: handleClick,
    cooldownTicks: 1000,
    cooldownTime: 15000,
    width: 1300,
    height: 600,
    enableNodeDrag: !isSelectionMode,
    enablePanInteraction: !isSelectionMode,
    enableZoomInteraction: !isSelectionMode,
  }), [getNodeColor, handleClick, selectedNodes, filteredNodes, filteredLinks, showFileNames, highlightedNodeGroups, selectedNodesInPath, isSelectionMode]);

  const forceGraph3DConfig = {
    ...forceGraphConfig,
    nodeThreeObject: (node) => {
      const sprite = new SpriteText(node.name);
      sprite.color = getNodeColor(node);
      sprite.textHeight = 8;
      return sprite;
    },
    nodeThreeObjectExtend: true
  };

  const memoizedForceGraphData = useMemo(() => ({
    graphData: { nodes: filteredNodes, links: filteredLinks },
  }), [filteredNodes, filteredLinks]);

  useEffect(() => {
    localStorage.setItem('highlightedNodeGroups', JSON.stringify(highlightedNodeGroups));
  }, [highlightedNodeGroups]);

  const toggle2D3D = () => {
    setIs3D(!is3D);
  };

  if (!selectedSystem) {
    return <div className="flex justify-center items-center h-full text-[#d4d4d4]">{t('システムディレクトリを選択してください')}</div>;
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-full text-[#d4d4d4]">
        <Loader2 className="w-6 h-6 animate-spin mr-2" />
        {t('ディレクトリ構造を読み込み中...')}
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-full text-red-500">
        <AlertTriangle className="w-6 h-6 mr-2" />
        {t('エラー')}: {error}
      </div>
    );
  }

  return (
    <div className="h-full border border-[#3c3c3c] rounded-md overflow-hidden bg-[#1e1e1e] flex flex-col relative">


      <ControlPanel
        onSearch={handleSearch}
        showAll={showAll}
        showFileNames={showFileNames}
        setShowFileNames={setShowFileNames}
        isSelectionMode={isSelectionMode}
        toggleSelectionMode={toggleSelectionMode}
        is3D={is3D}
        toggle2D3D={toggle2D3D}
      />


      <HighlightedGroups
        highlightedNodeGroups={highlightedNodeGroups}
        selectedGroupId={selectedGroupId}
        setSelectedGroupId={setSelectedGroupId}
        addNewHighlightGroup={addNewHighlightGroup}
        editGroupName={editGroupName}
        toggleGroupHighlight={toggleGroupHighlight}
        removeHighlightGroup={removeHighlightGroup}
        highlightNode={highlightNode}
      />
      <RecentChanges changes={changes} fileHistory={fileHistory} />
      <div className="flex-grow flex">
        <div className="w-full flex flex-col">

          {selectedNodes.map((node) => (
            <MockEditor
              key={node.id}
              node={node}
              onClose={() => setSelectedNodes(prev => prev.filter(n => n.id !== node.id))}
              onFileChange={handleFileChange}
            />
          ))}
          <div className="flex-grow relative">
            <ForceGraph
              is3D={is3D}
              fgRef={fgRef}
              forceGraphConfig={forceGraphConfig}
              forceGraph3DConfig={forceGraph3DConfig}
              memoizedForceGraphData={memoizedForceGraphData}
            />

            <GraphOverlay
              isSelectionMode={isSelectionMode}
              overlayRef={overlayRef}
              handleOverlayMouseDown={handleOverlayMouseDown}
              handleOverlayMouseMove={handleOverlayMouseMove}
              handleOverlayMouseUp={handleOverlayMouseUp}
              selectionPath={selectionPath}
            />

            <NodeContextMenu
              clickedNode={clickedNode}
              menuPosition={menuPosition}
              isSelectionMode={isSelectionMode}
              highlightNode={highlightNode}
              getNodeSurroundings={getNodeSurroundings}
              showEditor={showEditor}
              highlightedNodeGroups={highlightedNodeGroups}
              setClickedNode={setClickedNode}
            />

            <SelectionActionMenu
              selectedNodesInPath={selectedNodesInPath}
              handleSelectionAction={handleSelectionAction}
            />
          </div>
        </div>
      </div>

      <FloatingButtons
        setShowAIChat={setShowAIChat}
        setShowTaskManager={setShowTaskManager}
      />

      {showAIChat && (
        <AIChat
          nodes={highlightedNodeGroups.flatMap(group => group.nodes.filter(node => node.isSelected))}
          onClose={() => setShowAIChat(false)}
          showTaskManager={showTaskManager}
          setShowTaskManager={setShowTaskManager}
        />
      )}

      {showTaskManager && (
        <TaskManager
          onClose={() => setShowTaskManager(false)}
        />
      )}
    </div>
  );
});

export default FileStructure;