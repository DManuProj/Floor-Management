// server.js or app.js

const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cors = require("cors");
const routes = require("./routes/roomRoutes");
const dbConnection = require("./db/dbConnection");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to the database
dbConnection();

// Middleware
app.use(cors()); // Use CORS before routes
app.use(bodyParser.json()); // Parse incoming JSON requests
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.use(express.json({ limit: "10mb" }));

// Define routes
app.use("/api", routes); // Prefix your routes with /api

// Start the server
app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
