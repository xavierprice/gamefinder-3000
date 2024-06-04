const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });
const app = express();
const PORT = 3000;
const fetchGames = require("./fetchGames");

// Parse JSON bodies
app.use(express.json());

// Custom CORS configuration
const corsOptions = {
  origin: process.env.SERVER_IP,
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
  optionsSuccessStatus: 200,
};

// Enable CORS for all routes with specified options
app.use(cors(corsOptions));

// Log requests
app.use((req, res, next) => {
  console.log(`Received a ${req.method} request to ${req.url}`);
  // console.log("Request Headers:", req.headers);
  console.log("Request Body:", req.body);
  next();
});

// Define endpoint to handle the request
app.post("/api/games", async (req, res) => {
  try {
    // Extract parameters from the request body
    const {
      search,
      rating,
      genre,
      platform,
      gameMode,
      releaseDate,
      updatedAt,
    } = req.body;
    // Pass parameters to fetchGames function
    const games = await fetchGames(
      search,
      rating,
      genre,
      platform,
      gameMode,
      releaseDate,
      updatedAt
    );
    // Return response
    res.json(games);
  } catch (error) {
    console.error("Error fetching games:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
