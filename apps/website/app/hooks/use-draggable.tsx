import { useCallback, useEffect, useRef, useState } from 'react';

export const useDraggable = <T1 extends HTMLElement, T2 extends HTMLElement = HTMLElement>({
  controlStyle,
  viewport = false,
  rectLimits,
  axis,
}: {
  controlStyle?: boolean;
  viewport?: boolean;
  rectLimits?: { top: number; right: number; bottom: number; left: number };
  axis?: 'x' | 'y';
} = {}) => {
  const targetRef = useRef<T1 | null>(null);
  const handleRef = useRef<T2 | null>(null);
  const [dragging, setDragging] = useState(false);
  const [prev, setPrev] = useState({ x: 0, y: 0 });
  const [delta, setDelta] = useState({ x: 0, y: 0 });
  const initial = useRef({ x: 0, y: 0 });
  const limits = useRef<{ minX: number; maxX: number; minY: number; maxY: number } | null>(null);

  const handle = handleRef.current || targetRef.current;

  const setDragStartListeners = (node: T1 | T2) => {
    node.addEventListener('mousedown', startDragging);
    node.addEventListener('touchstart', startDragging);
  };
  const unsetDragStartListeners = (node: T1 | T2) => {
    node.removeEventListener('mousedown', startDragging);
    node.removeEventListener('touchstart', startDragging);
  };

  const setTarget = useCallback((node: T1 | null) => {
    if (!node) {
      if (handle) {
        unsetDragStartListeners(handle);
      }
      targetRef.current = null;
      return;
    }

    if (handle) {
      unsetDragStartListeners(handle);
    }

    targetRef.current = node;
    const newHandle = handleRef.current || targetRef.current;

    setDragStartListeners(newHandle);
  }, []);

  const setHandle = useCallback((node: T2 | null) => {
    if (!node) {
      return;
    }

    if (handle) {
      unsetDragStartListeners(handle);
    }

    handleRef.current = node;
    const newHandle = handleRef.current || targetRef.current;

    setDragStartListeners(newHandle);
  }, []);

  const startDragging = useCallback(
    (event: MouseEvent | TouchEvent) => {
      event.preventDefault();
      event.stopPropagation();

      if (!targetRef.current) return;

      setDragging(true);

      const source = 'touches' in event ? event.touches?.[0] : event;
      const { clientX, clientY } = source;

      initial.current = { x: clientX, y: clientY };

      if (controlStyle) {
        targetRef.current.style.willChange = 'transform';
      }

      if (viewport || rectLimits) {
        const { left, top, width, height } = targetRef.current.getBoundingClientRect();

        if (viewport) {
          limits.current = {
            minX: -left + delta.x,
            maxX: window.innerWidth - width - left + delta.x,
            minY: -top + delta.y,
            maxY: window.innerHeight - height - top + delta.y,
          };
        } else if (rectLimits) {
          limits.current = {
            minX: rectLimits.left - left + delta.x,
            maxX: rectLimits.right - width - left + delta.x,
            minY: rectLimits.top - top + delta.y,
            maxY: rectLimits.bottom - height - top + delta.y,
          };
        }
      }
    },
    [controlStyle, delta.x, delta.y, rectLimits, viewport]
  );

  const reposition = useCallback(
    (event: MouseEvent | TouchEvent) => {
      const source =
        event instanceof TouchEvent
          ? (event.changedTouches && event.changedTouches[0]) || (event.touches && event.touches[0])
          : event;
      const { clientX, clientY } = source;
      const x = clientX - initial.current.x + prev.x;
      const y = clientY - initial.current.y + prev.y;

      const newDelta = calcDelta({
        x,
        y,
        limits: limits.current,
      });
      setDelta(newDelta);

      return newDelta;
    },
    [prev.x, prev.y]
  );

  const stopDragging = useCallback(
    (event: MouseEvent | TouchEvent) => {
      event.preventDefault();

      setDragging(false);

      const newDelta = reposition(event);
      setPrev(newDelta);

      if (controlStyle && targetRef.current) {
        targetRef.current.style.willChange = '';
      }
    },
    [controlStyle, reposition]
  );

  useEffect(() => {
    const setListeners = () => {
      document.addEventListener('mousemove', reposition, { passive: true });
      document.addEventListener('touchmove', reposition, { passive: true });

      document.addEventListener('mouseup', stopDragging);
      document.addEventListener('touchend', stopDragging);
    };
    const removeListeners = () => {
      document.removeEventListener('mousemove', reposition);
      document.removeEventListener('mouseup', stopDragging);

      document.removeEventListener('touchmove', reposition);
      document.removeEventListener('touchend', stopDragging);
    };

    if (dragging) {
      setListeners();
    } else {
      removeListeners();
    }

    return removeListeners;
  }, [dragging]);

  useEffect(() => {
    if (controlStyle && targetRef.current) {
      if (axis === 'x') {
        targetRef.current.style.transform = `translateX(${delta.x}px)`;
      } else if (axis === 'y') {
        targetRef.current.style.transform = `translateY(${delta.y}px)`;
      } else {
        targetRef.current.style.transform = `translate(${delta.x}px, ${delta.y}px)`;
      }
    }
  }, [delta.x, delta.y]);

  const getTargetProps = useCallback(
    () => ({
      'aria-grabbed': dragging || null,
    }),
    [dragging]
  );

  const resetState = useCallback(() => {
    setDelta({ x: 0, y: 0 });
    setPrev({ x: 0, y: 0 });
  }, [setDelta, setPrev]);

  return { setTarget, setHandle, getTargetProps, dragging, delta, resetState };
};

function calcDelta({
  x,
  y,
  limits,
}: {
  x: number;
  y: number;
  limits: { minX: number; maxX: number; minY: number; maxY: number } | null;
}) {
  if (!limits) {
    return { x, y };
  }

  const { minX, maxX, minY, maxY } = limits;

  return {
    x: Math.min(Math.max(x, minX), maxX),
    y: Math.min(Math.max(y, minY), maxY),
  };
}
