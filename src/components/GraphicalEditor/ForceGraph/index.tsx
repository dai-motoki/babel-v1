
import React from 'react';
import ForceGraph2D from 'react-force-graph-2d';
import ForceGraph3D from 'react-force-graph-3d';
import SpriteText from 'three-spritetext';

interface ForceGraphProps {
  is3D: boolean;
  fgRef: React.RefObject<any>;
  forceGraphConfig: any;
  forceGraph3DConfig: any;
  memoizedForceGraphData: any;
}

const ForceGraph: React.FC<ForceGraphProps> = ({
  is3D,
  fgRef,
  forceGraphConfig,
  forceGraph3DConfig,
  memoizedForceGraphData
}) => {
  return (
    <>
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
    </>
  );
};

export default ForceGraph;
