import React, { useState, useCallback, useRef, RefObject } from "react";

export type SelectionRect = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export type Props = {
  targetRef: RefObject<HTMLElement>;
  onSelect: (selectionRect: SelectionRect) => void;
};

const SelectionTool = ({ targetRef, onSelect }: Props) => {
  const [isSelecting, setIsSelecting] = useState(false);
  const [selectionRect, setSelectionRect] = useState<SelectionRect>({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const overlayRef = useRef<HTMLDivElement>(null);
  const selectionRef = useRef<HTMLDivElement>(null);

  const startSelection = useCallback((e: React.MouseEvent) => {
    if (!targetRef.current) return;

    const panelRect = targetRef.current.getBoundingClientRect();
    const x = e.clientX - panelRect.left;
    const y = e.clientY - panelRect.top;

    // Only start selection if the click is inside the ArtifactPanel
    if (x >= 0 && x <= panelRect.width && y >= 0 && y <= panelRect.height) {
      setIsSelecting(true);
      setStartPos({ x, y });
    }
  }, []);

  const updateSelection = useCallback(
    (e: React.MouseEvent) => {
      if (!isSelecting || !targetRef.current) return;

      const panelRect = targetRef.current.getBoundingClientRect();
      const currentX = Math.min(
        Math.max(e.clientX - panelRect.left, 0),
        panelRect.width
      );
      const currentY = Math.min(
        Math.max(e.clientY - panelRect.top, 0),
        panelRect.height
      );

      setSelectionRect({
        x: Math.min(currentX, startPos.x),
        y: Math.min(currentY, startPos.y),
        width: Math.abs(currentX - startPos.x),
        height: Math.abs(currentY - startPos.y),
      });
    },
    [isSelecting, startPos]
  );

  const endSelection = useCallback(() => {
    setIsSelecting(false);
    if (selectionRect.width > 10 && selectionRect.height > 10) {
      onSelect(selectionRect);
    }
  }, [selectionRect]);

  return (
    <div
      ref={overlayRef}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.05)",
        cursor: "crosshair",
        zIndex: 999,
      }}
      onMouseDown={startSelection}
      onMouseMove={updateSelection}
      onMouseUp={endSelection}
    >
      {isSelecting && (
        <div
          ref={selectionRef}
          className="border-2 border-red-600"
          style={{
            position: "absolute",
            left: selectionRect.x,
            top: selectionRect.y,
            width: selectionRect.width,
            height: selectionRect.height,
            pointerEvents: "none",
          }}
        />
      )}
    </div>
  );
};

export default SelectionTool;
