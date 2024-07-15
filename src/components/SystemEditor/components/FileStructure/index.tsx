import React, { useRef, useCallback, useMemo, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import ForceGraph from './ForceGraph';
import MockEditor from './MockEditor';
import SearchBar from './SearchBar';
import RecentChanges from './RecentChanges';
import Button from '../common/Button';
import useFileChanges from '@/hooks/useFileChanges';
import useForceGraph from '@/hooks/useForceGraph';
import { fetchDirectoryStructure } from '@/utils/api';
import { transformApiResponse } from '@/utils/transformApiResponse';
import { getNodeColor } from '@/utils/colors';
import { Highlighter, Network, Edit, MessageCircle } from 'lucide-react';

export const FileStructure = React.memo(({ onNodeClick, selectedSystem }) => {
  const fgRef = useRef();
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
  const [highlightedNodes, setHighlightedNodes] = useState([]);

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

  // ノードがクリックされたときの処理
  const handleClick = useCallback((node, event) => {
    console.log('クリックされたノード:', node);
    setMenuPosition({ x: event.clientX, y: event.clientY });
    setClickedNode(node);
  }, []);

  // ノードをハイライトする関数
  const highlightNode = useCallback((node) => {
    setHighlightedNodes(prevNodes => {
      if (prevNodes.some(n => n.id === node.id)) {
        return prevNodes.filter(n => n.id !== node.id);
      } else {
        return [...prevNodes, node];
      }
    });
  }, []);

  // ノードの周辺を取得する関数
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

  // エディタを表示する関数
  const showEditor = useCallback((node) => {
    setSelectedNodes(prevSelected => {
      if (!prevSelected.some(n => n.id === node.id)) {
        return [...prevSelected, node];
      }
      return prevSelected;
    });
  }, []);

  // 検索処理を行う関数
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

  // 全てのノードとリンクを表示する関数
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

      if (node.type === 'directory' || selectedNodes.some(n => n.id === node.id) || node.name === 'meta' || highlightedNodes.some(n => n.id === node.id)) {
        const baseGlowRadius = node.type === 'directory' ? 8 : 6;
        const time = performance.now() / 1000;
        const glowRadius = baseGlowRadius + Math.sin(time * 1.5) * 2;
        
        if (isFinite(node.x) && isFinite(node.y)) {
          const gradient = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, glowRadius);
          if (highlightedNodes.some(n => n.id === node.id)) {
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
        ctx.strokeStyle = highlightedNodes.some(n => n.id === node.id) ? 'rgba(255, 255, 255, 1)' : node.name === 'meta' ? 'rgba(255, 215, 0, 0.8)' : node.type === 'directory' ? 'rgba(0, 255, 255, 0.8)' : 'rgba(255, 255, 255, 0.8)';
        ctx.lineWidth = highlightedNodes.some(n => n.id === node.id) ? 3 : 2;
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
  }), [getNodeColor, handleClick, selectedNodes, filteredNodes, filteredLinks, showFileNames, highlightedNodes]);

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
      <div className="absolute top-0 right-0 p-2 z-10">
        <div className="bg-[#2a2a2a] bg-opacity-70 rounded p-2 max-w-xs">
          <h4 className="text-[#d4d4d4] font-medium mb-2">{t('ハイライト済みノード')}</h4>
          <ul className="text-[#d4d4d4] text-sm">
            {highlightedNodes.map(node => (
              <li key={node.id}>{node.path || node.name}</li>
            ))}
          </ul>
        </div>
      </div>
      <div className="flex items-center justify-between p-3">
        <h3 className="text-lg font-medium text-[#d4d4d4] font-sans">{t('プロジェクト構造')}</h3>
        <div className="flex space-x-2">
          <SearchBar onSearch={handleSearch} />
          <Button onClick={showAll}>{t('全て表示')}</Button>
          <Button onClick={() => setShowFileNames(!showFileNames)}>
            {showFileNames ? t('ファイル名を非表示') : t('ファイル名を表示')}
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
            <ForceGraph
              ref={fgRef}
              {...forceGraphConfig}
            />
            {clickedNode && (
              <div className="absolute bg-[#2a2a2a] rounded shadow-lg p-2 flex flex-col space-y-2" style={{ left: menuPosition.x, top: menuPosition.y, transform: 'translate(-50%, -100%)' }}>
                <Button onClick={() => { highlightNode(clickedNode); setClickedNode(null); }} className="text-xs flex items-center">
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
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
});

export default FileStructure;