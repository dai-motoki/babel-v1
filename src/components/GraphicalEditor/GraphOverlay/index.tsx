
import React from 'react';

interface GraphOverlayProps {
  isSelectionMode: boolean;
  overlayRef: React.RefObject<HTMLDivElement>;
  handleOverlayMouseDown: (event: React.MouseEvent) => void;
  handleOverlayMouseMove: (event: React.MouseEvent) => void;
  handleOverlayMouseUp: () => void;
  selectionPath: { x: number; y: number }[];
}

const GraphOverlay: React.FC<GraphOverlayProps> = ({
  isSelectionMode,
  overlayRef,
  handleOverlayMouseDown,
  handleOverlayMouseMove,
  handleOverlayMouseUp,
  selectionPath
}) => {
  if (!isSelectionMode) return null;

  return (
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
  );
};

export default GraphOverlay;
