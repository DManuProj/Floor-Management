import React, { useEffect, useState } from "react";
import { Box, Tabs, Tab, Typography, Button } from "@mui/material";
import {
  Stage,
  Layer,
  Group,
  Image as KonvaImage,
  Rect,
  Text,
} from "react-konva";
import DraggableTable from "../components/TableDrop";
import useImage from "use-image";
import {
  image1,
  image2,
  duplicateIcon,
  deleteIcon,
  rotateIcon,
} from "../assets"; // Ensure icons are imported
import Divider from "@mui/material/Divider";
import TableForm from "../components/TableForm";
import toast, { Toaster } from "react-hot-toast";
import AdvancedSettings from "../components/AdvancedFeature";
import axios from "axios";
import LoadingBackdrop from "../components/LoadingBackdrop";
import StatsBox from "../components/StatsBox";

const TableLayout = () => {
  const [rooms, setRooms] = useState(["Main Room"]);
  const [selectedRoomIndex, setSelectedRoomIndex] = useState(0);
  const [tables, setTables] = useState([[]]);
  const [tableCount, setTableCount] = useState(0);
  const [selectedTableId, setSelectedTableId] = useState(null);
  const [loading, setLoading] = useState(false);

  const [tableImage1] = useImage(image1); // Table images
  const [tableImage2] = useImage(image2);
  const [rotateIconImg] = useImage(rotateIcon); // Action icons
  const [duplicateIconImg] = useImage(duplicateIcon);
  const [deleteIconImg] = useImage(deleteIcon);

  const handleTabChange = (event, newValue) => {
    setSelectedRoomIndex(newValue);
  };

  // const getRoomData = async () => {
  //   try {
  //     const resultroom = await axios.get(
  //       "http://localhost:5000/api/get-room-tables"
  //     );

  //     console.log(resultroom.data.data);
  //     setRoomData(resultroom.data.data);
  //   } catch (error) {
  //     console.log(error.stack);
  //   }

  const handleAddRoom = () => {
    const newRoomName = `Room ${rooms.length + 1}`;
    setRooms([...rooms, newRoomName]);
    setTables([...tables, []]);
    setSelectedRoomIndex(rooms.length);
  };

  const handleDragEnd = (e, tableId, imageType) => {
    const stage = e.target.getStage();
    const pointerPosition = stage.getPointerPosition();
    const workAreaX = window.innerWidth * 0.2;
    const workAreaWidth = window.innerWidth * 0.75;
    const workAreaHeight = window.innerHeight * 0.8;

    if (
      pointerPosition.x >= workAreaX &&
      pointerPosition.x <= workAreaX + workAreaWidth &&
      pointerPosition.y >= 0 &&
      pointerPosition.y <= workAreaHeight
    ) {
      const newTable = {
        x: pointerPosition.x - workAreaX,
        y: pointerPosition.y,
        id: `TB-${String(tableCount + 1).padStart(2, "0")}`,
        imageType: imageType,
        tableName: "",
        minCovers: 1,
        maxCovers: 1,
        online: true,
      };

      const updatedTables = [...tables];
      updatedTables[selectedRoomIndex].push(newTable);
      setTables(updatedTables);
      setTableCount(tableCount + 1);
    }
  };

  const handleTableSelect = (tableId) => {
    setSelectedTableId(tableId === selectedTableId ? null : tableId); // Toggle selection
  };

  const handleRotate = (index) => {
    const updatedTables = [...tables];
    const selectedTable = updatedTables[selectedRoomIndex][index];
    selectedTable.rotation = (selectedTable.rotation || 0) + 90;
    setTables(updatedTables);
  };

  const handleDuplicate = (index) => {
    const updatedTables = [...tables];
    const selectedTable = updatedTables[selectedRoomIndex][index];
    const newTable = {
      ...selectedTable,
      id: `TB-${String(tableCount + 1).padStart(2, "0")}`,
      x: selectedTable.x + 20,
      y: selectedTable.y + 20,
    };
    updatedTables[selectedRoomIndex].push(newTable);
    setTables(updatedTables);
    setTableCount(tableCount + 1);
  };

  const handleDelete = (index) => {
    const updatedTables = [...tables];
    updatedTables[selectedRoomIndex].splice(index, 1);
    setTables(updatedTables);
    setSelectedTableId(null);
  };

  const handleTableDragEnd = (roomIndex, index, e) => {
    const updatedTables = [...tables];
    updatedTables[roomIndex][index] = {
      ...updatedTables[roomIndex][index],
      x: e.target.x(),
      y: e.target.y(),
    };
    setTables(updatedTables);
  };
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleSaveRoom = async () => {
    const roomData = {
      roomName: rooms[selectedRoomIndex],
      tables: tables[selectedRoomIndex].map((table) => ({
        id: table.id,
        x: table.x,
        y: table.y,
        rotation: table.rotation || 0,
        tableName: table.tableName,
        minCovers: table.minCovers,
        maxCovers: table.maxCovers,
        online: table.online,
        imageType: table.imageType,
      })),
    };

    setLoading(true);
    console.log(roomData);

    try {
      const result = await axios.post(
        "http://localhost:5000/api/save-room",
        roomData
      );
      console.log("Room saved successfully:", result.data);
      toast.success("Room saved successfully");
    } catch (error) {
      console.error("Error saving room data:", error);
      toast.error("Failed to save room. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box display="flex" height="100vh" padding={2}>
      {/* Sidebar */}
      <Box
        width="25%"
        paddingTop={2}
        bgcolor="#f9f9f9"
        display="flex"
        flexDirection="column"
      >
        {/* table tab */}
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="red"
          textColor="inherit"
          aria-label="basic tabs example"
          sx={{
            color: "black",
          }}
        >
          <Tab
            sx={{
              textTransform: "none",
              color: "black",
              borderBottom: 2,
              borderColor: "red",
              "&.Mui-selected": {
                borderBottom: 2,
                borderColor: "red",
              },
            }}
            label="Table Options"
          />
          <Tab label="" disabled />
        </Tabs>
        <Box sx={{ textAlign: "center" }} mt={5} height={100}>
          <Typography variant="h7" sx={{ fontWeight: "bold" }}>
            Table Options
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Drag and drop your tables
          </Typography>
        </Box>

        <DraggableTable onDragEnd={handleDragEnd} />

        <Box sx={{ textAlign: "center" }}>
          <Divider
            sx={{ marginTop: "1rem", marginBottom: "1.5rem" }}
            variant="fullWidth"
          />
          <Typography
            variant="h7"
            sx={{ fontWeight: "bold", marginBottom: "1.5rem" }}
          >
            Table Options
          </Typography>
          <TableForm
            selectedTable={tables[selectedRoomIndex].find(
              (table) => table.id === selectedTableId
            )}
            updateTableDetails={(updatedTableData) => {
              const updatedTables = [...tables];
              const tableIndex = updatedTables[selectedRoomIndex].findIndex(
                (table) => table.id === selectedTableId
              );
              if (tableIndex !== -1) {
                updatedTables[selectedRoomIndex][tableIndex] = {
                  ...updatedTables[selectedRoomIndex][tableIndex],
                  ...updatedTableData,
                };
                setTables(updatedTables);
              }
            }}
          />
        </Box>
        <AdvancedSettings />
      </Box>

      {/* Main Workspace */}
      <Box flexGrow={1} padding={2} display="flex" flexDirection="column">
        {/* Room Tabs */}
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Tabs
            value={selectedRoomIndex}
            onChange={handleTabChange}
            aria-label="Room Tabs"
            indicatorColor="red"
            textColor="inherit"
          >
            {rooms.map((room, index) => (
              <Tab
                sx={{
                  textTransform: "none",
                  color: "black",
                  borderBottom: 2,
                  borderColor: "red",
                  "&.Mui-selected": {
                    borderBottom: 2,
                    borderColor: "red",
                  },
                }}
                key={index}
                label={room}
              />
            ))}
          </Tabs>
          <Box display="flex" gap={2}>
            <Button
              variant="contained"
              onClick={handleAddRoom}
              sx={{
                background: "linear-gradient(to top right, #8B0000, #FF0000)",
                color: "white",
                textTransform: "none",
              }}
            >
              + Add Room
            </Button>
            <Button
              sx={{ textTransform: "none" }}
              variant="outlined"
              onClick={handleSaveRoom}
            >
              Save Room
            </Button>
          </Box>
        </Box>

        {/* Droppable Area */}
        <Box flexGrow={1} border="1px dashed #ccc" marginTop={2}>
          <Stage
            width={window.innerWidth * 0.75}
            height={window.innerHeight * 0.8}
          >
            <Layer>
              {tables[selectedRoomIndex].map((table, index) => (
                <Group
                  key={table.id}
                  x={table.x}
                  y={table.y}
                  draggable
                  onDragEnd={(e) =>
                    handleTableDragEnd(selectedRoomIndex, index, e)
                  }
                  onClick={() => handleTableSelect(table.id)}
                >
                  {selectedTableId === table.id && (
                    <>
                      {/* Red Dotted Outline */}
                      <Rect
                        x={-50}
                        y={-50}
                        width={100}
                        height={100}
                        stroke="red"
                        dash={[4, 4]}
                      />
                      {/* Action Icons */}

                      <Group y={-90} x={10}>
                        <Rect
                          x={-11.5}
                          y={-9}
                          width={120} // width based on icon size and spacing
                          height={35} //  height based on icon size
                          fill="white"
                          cornerRadius={8}
                          shadowBlur={10}
                          shadowColor="rgba(0, 0, 0, 0.2)"
                          shadowOffset={{ x: 2, y: 2 }}
                          stroke="#ccc"
                        />

                        <KonvaImage
                          image={rotateIconImg}
                          width={15}
                          height={15}
                          x={2}
                          onClick={() => handleRotate(index)}
                        />
                        <KonvaImage
                          image={duplicateIconImg}
                          width={15}
                          height={15}
                          x={30}
                          onClick={() => handleDuplicate(index)}
                        />
                        <Rect
                          x={60} // Position the separator line between duplicateIcon and deleteIcon
                          y={-5} // Center it vertically within the container
                          width={1} // Small width to create a line
                          height={29}
                          fill="#ccc" // Color of the separator line
                        />
                        <KonvaImage
                          image={deleteIconImg}
                          width={15}
                          height={15}
                          x={80}
                          onClick={() => handleDelete(index)}
                        />
                      </Group>
                    </>
                  )}
                  {/* Table Image */}
                  <KonvaImage
                    image={
                      table.imageType === "image1" ? tableImage1 : tableImage2
                    }
                    width={100}
                    height={100}
                    rotation={table.rotation || 0}
                    offsetX={50} // Center rotation horizontally
                    offsetY={50} // Center rotation vertically
                  />
                </Group>
              ))}
            </Layer>
          </Stage>
          <StatsBox />
        </Box>
      </Box>

      <Toaster position="bottom-right" reverseOrder={false} />
      <LoadingBackdrop open={loading} />
    </Box>
  );
};

export default TableLayout;
