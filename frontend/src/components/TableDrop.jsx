import React from "react";
import { Image, Layer, Stage, Group, Rect } from "react-konva";
import useImage from "use-image";
import { image1, image2 } from "../assets";

const DraggableTable = ({ onDragEnd }) => {
  const initialPosition1 = { x: 10, y: 10 };
  const initialPosition2 = { x: 120, y: 10 };

  const [tableImage1] = useImage(image1); // First table image
  const [tableImage2] = useImage(image2); // Second table image

  const handleDragStart = (e) => {
    e.target.setAttrs({
      shadowOffset: { x: 5, y: 5 },
      scaleX: 1.1,
      scaleY: 1.1,
    });
  };

  const handleDragEnd = (e, tableId, imageType) => {
    onDragEnd(e, tableId, imageType); // Pass image type
    e.target.position(
      tableId === "table1" ? initialPosition1 : initialPosition2
    );
    e.target.setAttrs({
      shadowOffset: { x: 0, y: 0 },
      scaleX: 1,
      scaleY: 1,
    });
  };

  return (
    <Stage width={212} height={130}>
      <Layer>
        <Rect
          x={-5}
          y={-8}
          width={215} // Set to the same width as the stage
          height={130} // Set to the same height as the stage
          fill="lightgrey" // Change to your desired background color
        />
        <Group
          x={initialPosition1.x}
          y={initialPosition1.y}
          draggable
          onDragStart={handleDragStart}
          onDragEnd={(e) => handleDragEnd(e, "table1", "image1")}
        >
          {tableImage1 && (
            <Image image={tableImage1} width={100} height={100} />
          )}
        </Group>

        <Group
          x={initialPosition2.x}
          y={initialPosition2.y}
          draggable
          onDragStart={handleDragStart}
          onDragEnd={(e) => handleDragEnd(e, "table2", "image2")}
        >
          {tableImage2 && (
            <Image image={tableImage2} width={100} height={100} />
          )}
        </Group>
      </Layer>
    </Stage>
  );
};

export default DraggableTable;
