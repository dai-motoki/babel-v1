
import React, { forwardRef, useState, useCallback } from 'react';
import { ForceGraph2D, ForceGraph3D } from 'react-force-graph';

const ForceGraph = forwardRef((props, ref) => {
  const [is3D, setIs3D] = useState(false);

  const toggleDimension = useCallback(() => {
    setIs3D((prevIs3D) => !prevIs3D);
  }, []);

  const Graph = is3D ? ForceGraph3D : ForceGraph2D;

  return (
    <div>
      <button
        onClick={toggleDimension}
        aria-label={`Switch to ${is3D ? '2D' : '3D'} view`}
      >
        Switch to {is3D ? '2D' : '3D'}
      </button>
      <Graph
        ref={ref}
        {...props}
      />
    </div>
  );
});

ForceGraph.displayName = 'ForceGraph';

// PropTypes validation (if needed)
// ForceGraph.propTypes = {
//   // Add prop types here
// };

export default ForceGraph;
