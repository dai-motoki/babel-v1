
import { useCallback, useMemo } from 'react';
import { getNodeColor } from '../../../utils/colors';

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
