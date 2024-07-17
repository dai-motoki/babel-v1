import { useState, useCallback, useEffect } from 'react';

interface Position {
  x: number;
  y: number;
}

export const useDraggable = (
  ref: React.RefObject<HTMLElement>,
  setPosition: (position: Position) => void,
  threshold: number = 5 // ドラッグと見なす最小移動量
) => {
  const [isDragging, setIsDragging] = useState(false);
  const [startPos, setStartPos] = useState<Position>({ x: 0, y: 0 });
  const [offset, setOffset] = useState<Position>({ x: 0, y: 0 });

  const onMouseDown = useCallback((e: React.MouseEvent) => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setStartPos({ x: e.clientX, y: e.clientY });
      setOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
      setIsDragging(true);
    }
  }, [ref]);

  const onMouseMove = useCallback((e: MouseEvent) => {
    if (isDragging) {
      const dx = e.clientX - startPos.x;
      const dy = e.clientY - startPos.y;
      if (Math.sqrt(dx * dx + dy * dy) > threshold) {
        setPosition({
          x: e.clientX - offset.x,
          y: e.clientY - offset.y,
        });
      }
    }
  }, [isDragging, offset, setPosition, startPos, threshold]);

  const onMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };
  }, [onMouseMove, onMouseUp]);

  return { onMouseDown };
};