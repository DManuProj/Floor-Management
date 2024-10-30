const Room = require("../models/roomSchema");

const getAllTables = async (req, res) => {
  try {
    const rooms = await Room.find();

    let totalTables = 0;
    let totalMinCovers = 0;
    let totalMaxCovers = 0;
    let onlineTableCount = 0;
    let offlineTableCount = 0;

    // Loop through each room to get  totals
    rooms.forEach((room) => {
      totalTables += room.tables.length;
      totalMinCovers += room.tables.reduce(
        (sum, table) => sum + table.minCovers,
        0
      );
      totalMaxCovers += room.tables.reduce(
        (sum, table) => sum + table.maxCovers,
        0
      );
      onlineTableCount += room.tables.filter((table) => table.online).length;
      offlineTableCount += room.tables.filter((table) => !table.online).length;
    });

    // Send the aggregated result
    res.status(200).json({
      success: true,
      data: {
        totalTables,
        totalMinCovers,
        totalMaxCovers,
        onlineTableCount,
        offlineTableCount,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

const getAllTablesDetailes = async (req, res) => {
  try {
    const rooms = await Room.find();

    // Format response to list each room's tables individually
    const roomTablesDetails = rooms.map((room) => ({
      roomName: room.roomName,
      tables: room.tables.map((table) => ({
        tableId: table.id,
        tableName: table.tableName,
        imageType: table.imageType,
        maxCovers: table.maxCovers,
        minCovers: table.minCovers,
        online: table.online,
        rotation: table.rotation,
        position: { x: table.x, y: table.y },
      })),
    }));

    res.status(200).json({
      success: true,
      data: roomTablesDetails,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

const createRoom = async (req, res) => {
  const { roomName, tables } = req.body;

  // Validate input
  if (!roomName || !Array.isArray(tables) || tables.length === 0) {
    return res
      .status(400)
      .json({ message: "Room name and at least one table are required." });
  }

  try {
    // Create a new room instance
    const newRoom = new Room({
      roomName,
      tables,
    });

    // Save the room to the database
    const savedRoom = await newRoom.save();

    res.status(201).json({
      success: true,
      message: "Data saved successfully",
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Something went wrong while saving the room." });
  }
};

module.exports = {
  getAllTables,
  createRoom,
  getAllTablesDetailes,
};
