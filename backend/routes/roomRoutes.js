// routes/roomRoutes.js

const express = require("express");
const router = express.Router();
const roomController = require("../controller/roomController.js");

// GET all rooms
router.get("/get-all-tables", roomController.getAllTables);
router.get("/get-room-tables", roomController.getAllTablesDetailes);

// POST a new room
router.post("/save-room", roomController.createRoom);

module.exports = router;
