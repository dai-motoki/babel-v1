import React, { useRef, useCallback, useMemo, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import ForceGraph2D from 'react-force-graph-2d';
import ForceGraph3D from 'react-force-graph-3d';
import * as THREE from 'three';
import SpriteText from 'three-spritetext';
import MockEditor from './MockEditor';
import SearchBar from './SearchBar';
import RecentChanges from './RecentChanges';
import Button from '../common/Button';
import useFileChanges from '@/hooks/useFileChanges';
import useForceGraph from '@/hooks/useForceGraph';
import { fetchDirectoryStructure } from '@/utils/api';
import { transformApiResponse } from '@/utils/transformApiResponse';
import { getNodeColor } from '@/utils/colors';
import { Copy, Trash, Highlighter, Network, Edit, MessageCircle, MousePointer, ListTodo, Plus, Box } from 'lucide-react';
import AIChat from './AIChat';
import Draggable from 'react-draggable';

export const FileStructure = React.memo(({ onNodeClick, selectedSystem }) => {
  const fgRef = useRef();
  const overlayRef = useRef();
  const { t } = useTranslation();
  const [selectedNodes, setSelectedNodes] = useState([]);
  const [directoryStructure, setDirectoryStructure] = useState({ nodes: [], links: [] });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { changes, handleFileChange } = useFileChanges();
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

  const editGroupName = useCallback((groupId: number, newName: string) => {
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
    width: 2000,
    height: 1000,
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
    return <div className="flex justify-center items-center h-full text-[#d4d4d4]">{t('ディレクトリ構造を読み込み中...')}</div>;
  }

  if (error) {
    return <div className="flex justify-center items-center h-full text-red-500">{t('エラー')}: {error}</div>;
  }

  return (
    <div className="h-full border border-[#3c3c3c] rounded-md overflow-hidden bg-[#1e1e1e] flex flex-col relative">
      <div className="absolute top-0 left-0 p-2 z-10">
        <div className="bg-[#2a2a2a] bg-opacity-70 rounded p-2 max-w-xs">
          <RecentChanges changes={changes} />
        </div>
      </div>

      <Draggable bounds="parent">
        <div className="absolute bottom-1/4 left-0 p-2 z-10 cursor-move">
          <div className="bg-[#2a2a2a] bg-opacity-70 rounded p-2 max-w-xs max-h-[50vh] overflow-y-auto">
            <div className="flex border-b border-gray-600">
              {highlightedNodeGroups.map((group: any) => (
                <button
                  key={group.id}
                  className={`px-3 py-2 ${selectedGroupId === group.id ? 'text-blue-500 border-b-2 border-blue-500' : 'text-[#d4d4d4]'}`}
                  onClick={() => setSelectedGroupId(group.id)}
                >
                  <Network className="w-4 h-4" />
                </button>
              ))}
              <button
                className="px-3 py-2 text-[#d4d4d4]"
                onClick={addNewHighlightGroup}
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
            {highlightedNodeGroups.map((group: any) => (
              <div key={group.id} className={`mt-2 ${selectedGroupId === group.id ? '' : 'hidden'}`}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={group.nodes.every((node: any) => node.isSelected)}
                      onChange={(e) => toggleGroupHighlight(group.id, e.target.checked)}
                      className="mr-2"
                    />
                    <input
                      type="text"
                      value={group.name}
                      onChange={(e) => editGroupName(group.id, e.target.value)}
                      className="bg-transparent text-[#d4d4d4] text-sm border-b border-gray-600 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <button
                    onClick={() => removeHighlightGroup(group.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash className="w-4 h-4" />
                  </button>
                </div>
                <ul className="text-[#d4d4d4] text-sm max-h-40 overflow-y-auto">
                  {group.nodes.map((node: any) => (
                    <li key={node.id} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={node.isSelected}
                        onChange={() => highlightNode(node, group.id)}
                        className="mr-2"
                      />
                      <span>{node.id || node.name}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </Draggable>

      <div className="flex items-center justify-between p-3">
        <h3 className="text-lg font-medium text-[#d4d4d4] font-sans">{t('プロジェクト構造')}</h3>
        <div className="flex space-x-2">
          <SearchBar onSearch={handleSearch} />
          <Button onClick={showAll}>{t('全て表示')}</Button>
          <Button onClick={() => setShowFileNames(!showFileNames)}>
            {showFileNames ? t('ファイル名を非表示') : t('ファイル名を表示')}
          </Button>
          <Button onClick={toggleSelectionMode} className={isSelectionMode ? 'bg-blue-500' : ''}>
            <MousePointer className="w-4 h-4 mr-2" />
            {isSelectionMode ? t('選択モード: ON') : t('選択モード: OFF')}
          </Button>
          <Button onClick={toggle2D3D} aria-label={is3D ? "2Dビューに切り替え" : "3Dビューに切り替え"}>
            <Box className="w-4 h-4 mr-2" />
            {is3D ? "2D" : "3D"}
          </Button>
        </div>
      </div>
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
            {is3D ? (
      <ForceGraph3D
      ref={fgRef}
      {...forceGraph3DConfig}
                {...memoizedForceGraphData}
              />
            ) : (
              <ForceGraph2D
                ref={fgRef}
                {...forceGraphConfig}
              />
            )}

            {isSelectionMode && (
              <>
                <div
                  ref={overlayRef}
                  className="absolute inset-0 bg-black bg-opacity-30 cursor-crosshair"
                  onMouseDown={handleOverlayMouseDown}
                  onMouseMove={handleOverlayMouseMove}
                  onMouseUp={handleOverlayMouseUp}
                />
                {selectionPath.length > 0 && (
                  <div className="absolute inset-0 pointer-events-none">
                    <svg width="100%" height="100%">
                      <filter id="glow">
                        <feGaussianBlur stdDeviation="5" result="coloredBlur"/>
                        <feMerge>
                          <feMergeNode in="coloredBlur"/>
                          <feMergeNode in="SourceGraphic"/>
                        </feMerge>
                      </filter>
                      <path
                        d={`M ${selectionPath.map(p => `${p.x},${p.y}`).join(' L ')}`}
                        fill="none"
                        stroke="url(#goldenGradient)"
                        strokeWidth="4"
                        filter="url(#glow)"
                      />
                      <linearGradient id="goldenGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#FFE4B5" stopOpacity="0.3"/>
                        <stop offset="50%" stopColor="#FFDAB9" stopOpacity="0.5"/>
                        <stop offset="100%" stopColor="#FFE4B5" stopOpacity="0.3"/>
                      </linearGradient>
                    </svg>
                  </div>
                )}
              </>
            )}

            {clickedNode && !isSelectionMode && (
              <div className="absolute bg-[#2a2a2a] rounded shadow-lg p-2 flex flex-col space-y-2" style={{ left: menuPosition.x, top: menuPosition.y, transform: 'translate(-50%, -100%)' }}>
                <Button onClick={() => { highlightNode(clickedNode, highlightedNodeGroups[highlightedNodeGroups.length - 1].id); setClickedNode(null); }} className="text-xs flex items-center">
                  <Highlighter className="w-3 h-3 mr-2 text-yellow-200 opacity-50" />
                  <span>{t('ハイライト')}</span>
                </Button>
                <Button onClick={() => { getNodeSurroundings(clickedNode); setClickedNode(null); }} className="text-xs flex items-center">
                  <Network className="w-3 h-3 mr-2 text-blue-200 opacity-50" />
                  <span>{t('周辺取得')}</span>
                </Button>
                <Button onClick={() => { showEditor(clickedNode); setClickedNode(null); }} className="text-xs flex items-center">
                  <Edit className="w-3 h-3 mr-2 text-green-200 opacity-50" />
                  <span>{t('エディタ表示')}</span>
                </Button>
                <Button onClick={() => { console.log('会話ボタンがクリックされました'); setClickedNode(null); }} className="text-xs flex items-center">
                  <MessageCircle className="w-3 h-3 mr-2 text-red-200 opacity-50" />
                  <span>{t('会話する')}</span>
                </Button>
                <Button onClick={() => { console.log('コピーボタンがクリックされました'); setClickedNode(null); }} className="text-xs flex items-center">
                  <Copy className="w-3 h-3 mr-2 text-purple-200 opacity-50" />
                  <span>{t('コピー')}</span>
                </Button>
                <Button onClick={() => { console.log('削除ボタンがクリックされました'); setClickedNode(null); }} className="text-xs flex items-center">
                  <Trash className="w-3 h-3 mr-2 text-red-500 opacity-50" />
                  <span>{t('削除')}</span>
                </Button>
              </div>
            )}
            {selectedNodesInPath.length > 0 && (
              <div className="absolute bg-[#2a2a2a] rounded shadow-lg p-2 flex flex-col space-y-2" style={{ right: 10, top: 10 }}>
                <Button onClick={() => handleSelectionAction('highlight')} className="text-xs flex items-center">
                  <Highlighter className="w-3 h-3 mr-2 text-yellow-200 opacity-50" />
                  <span>{t('選択をハイライト')}</span>
                </Button>
                <Button onClick={() => handleSelectionAction('surroundings')} className="text-xs flex items-center">
                  <Network className="w-3 h-3 mr-2 text-blue-200 opacity-50" />
                  <span>{t('選択の周辺を表示')}</span>
                </Button>
                <Button onClick={() => handleSelectionAction('showEditor')} className="text-xs flex items-center">
                  <Edit className="w-3 h-3 mr-2 text-green-200 opacity-50" />
                  <span>{t('選択をエディタで開く')}</span>
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="fixed bottom-4 right-4 flex flex-col space-y-2 z-50">
        <Button
          onClick={() => setShowAIChat(!showAIChat)}
          className="bg-[#3c3c3c] text-[#d4d4d4] rounded-full p-2 hover:bg-[#4c4c4c] transition-all duration-200"
        >
          <MessageCircle className="w-6 h-6" />
        </Button>
        <Button
          onClick={() => setShowTaskManager(!showTaskManager)}
          className="bg-[#3c3c3c] text-[#d4d4d4] rounded-full p-2 hover:bg-[#4c4c4c] transition-all duration-200"
        >
          <ListTodo className="w-6 h-6" />
        </Button>
      </div>
      {showAIChat && (
        <AIChat
        nodes={highlightedNodeGroups.flatMap(group => group.nodes.filter(node => node.isSelected))}
        onClose={() => setShowAIChat(false)}
        showTaskManager={showTaskManager}
        setShowTaskManager={setShowTaskManager}
      />
      )}
    </div>
  );
});

export default FileStructure;