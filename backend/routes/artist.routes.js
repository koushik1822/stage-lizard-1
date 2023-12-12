// routes/artistRoutes.js

const express = require("express");
const artistRouter = express.Router();

const {
  artistSignUpController,
  artistFindController,
  artistUpdateController,
} = require("../controller/artist.controllers.js");

// Define routes
artistRouter
  .route("/:email")
  .get((req, res) => {
    artistFindController(req, res);
  })
  .put((req, res) => {
    artistUpdateController(req, res);
  });
artistRouter.post("/artist-signup", (req, res) => {
  artistSignUpController(req, res);
});

module.exports = artistRouter;
