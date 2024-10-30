// DroppableArea.js
import React from "react";
import { Rect, Layer, Stage } from "react-konva";

const DroppableArea = ({ onDrop }) => {
  const handleDrop = (e) => {
    const stage = e.target.getStage();
    const pointerPosition = stage.getPointerPosition();

    if (pointerPosition) {
      onDrop(pointerPosition); // Pass the position where the table is dropped
    }
  };

  return (
    <Stage
      width={window.innerWidth * 0.75}
      height={window.innerHeight * 0.8}
      onDragOver={(e) => e.evt.preventDefault()} // Prevent default to allow drop
      onDrop={handleDrop} // Handle drop event
    >
      <Layer>
        <Rect
          x={0}
          y={0}
          width={window.innerWidth * 0.75}
          height={window.innerHeight * 0.8}
          fill="lightgray" // Background color for the droppable area
          opacity={0.5}
        />
      </Layer>
    </Stage>
  );
};

export default DroppableArea;
