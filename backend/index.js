// server.js

const express = require("express");
const app = express();
const port = 8080;
const cors = require("cors");
const dbConnect = require("./utils/dbConnect");
require("dotenv").config();
dbConnect();
// Middleware to enable CORS
app.use(cors);
// Middleware to parse JSON in the request body
app.use(express.json());

// Simple route
app.get("/", (req, res) => {
  res.send("Hello, Express!");
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

module.exports = app;
