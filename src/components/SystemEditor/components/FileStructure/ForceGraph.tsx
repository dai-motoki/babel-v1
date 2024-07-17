
import React, { forwardRef } from 'react';
import { ForceGraph2D } from 'react-force-graph';

const ForceGraph = forwardRef((props, ref) => {
  return <ForceGraph2D ref={ref} {...props} />;
});

export default ForceGraph;
