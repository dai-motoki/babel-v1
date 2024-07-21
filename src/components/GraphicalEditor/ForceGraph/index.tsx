import React, { useRef, useEffect } from 'react';
import ForceGraph2D from 'react-force-graph-2d';
import ForceGraph3D from 'react-force-graph-3d';
import SpriteText from 'three-spritetext';
import * as d3 from 'd3-force';

interface ForceGraphProps {
  is3D: boolean;
  fgRef: React.RefObject<any>;
  forceGraphConfig: any;
  forceGraph3DConfig: any;
  memoizedForceGraphData: any;
  isLayoutMode: boolean;
  nodePositions: { [key: string]: { x: number, y: number } };
}

const ForceGraph: React.FC<ForceGraphProps> = ({
  is3D,
  fgRef,
  forceGraphConfig,
  forceGraph3DConfig,
  memoizedForceGraphData,
  isLayoutMode,
  nodePositions
}) => {
  const graphRef = useRef();

  useEffect(() => {
    if (graphRef.current) {
      const fg = graphRef.current;
      if (isLayoutMode) {
        fg.d3Force('center', null);
        fg.d3Force('charge', null);
      } else {
        fg.d3Force('center', d3.forceCenter());
        fg.d3Force('charge', d3.forceManyBody());
      }
      fg.d3ReheatSimulation();
    }
  }, [isLayoutMode]);

  const onNodeDragEnd = (node) => {
    if (isLayoutMode) {
      node.fx = node.x;
      node.fy = node.y;
    }
  };

  return (
    <>
      {is3D ? (
        <ForceGraph3D
          ref={graphRef}
          {...forceGraph3DConfig}
          {...memoizedForceGraphData}
          onNodeDragEnd={onNodeDragEnd}
          nodePositionUpdate={(node, x, y) => {
            if (nodePositions[node.id]) {
              node.fx = nodePositions[node.id].x;
              node.fy = nodePositions[node.id].y;
            }
          }}
        />
      ) : (
        <ForceGraph2D
          ref={graphRef}
          {...forceGraphConfig}
          onNodeDragEnd={onNodeDragEnd}
          nodePositionUpdate={(node, x, y) => {
            if (nodePositions[node.id]) {
              node.fx = nodePositions[node.id].x;
              node.fy = nodePositions[node.id].y;
            }
          }}
        />
      )}
    </>
  );
};

export default ForceGraph;