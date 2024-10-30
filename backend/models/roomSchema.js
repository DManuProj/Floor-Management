// models/Room.js

const mongoose = require("mongoose");

const TableSchema = new mongoose.Schema({
  id: { type: String, required: true },
  imageType: { type: String, required: true },
  maxCovers: { type: Number, required: true },
  minCovers: { type: Number, required: true },
  online: { type: Boolean, required: true },
  rotation: { type: Number, required: true },
  tableName: { type: String, required: true },
  x: { type: Number, required: true },
  y: { type: Number, required: true },
});

const RoomSchema = new mongoose.Schema({
  roomName: { type: String, required: true },
  tables: [TableSchema], // Embed tables directly within the room
});

// Export the combined Room model
module.exports = mongoose.model("Room", RoomSchema);
