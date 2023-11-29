// routes/artistRoutes.js

const express = require("express");
const artistRouter = express.Router();

const {
  artistSignUpController,
  artistFindController,
} = require("../controller/artist.controllers.js");

// Define routes
artistRouter.get("/:email", (req, res) => {
  artistFindController(req, res);
});
artistRouter.post("/artist-signup", (req, res) => {
  artistSignUpController(req, res);
});

module.exports = artistRouter;
