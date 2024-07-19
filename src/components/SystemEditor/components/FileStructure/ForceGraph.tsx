
import React, { forwardRef, useState } from 'react';
import { ForceGraph2D, ForceGraph3D } from 'react-force-graph';

const ForceGraph = forwardRef((props, ref) => {
  const [is3D, setIs3D] = useState(false);

  const toggleDimension = () => {
    setIs3D(!is3D);
  };

  const Graph = is3D ? ForceGraph3D : ForceGraph2D;

  return (
    <div>
      <button onClick={toggleDimension}>
        Switch to {is3D ? '2D' : '3D'}
      </button>
      <Graph ref={ref} {...props} />
    </div>
  );
});

export default ForceGraph;
