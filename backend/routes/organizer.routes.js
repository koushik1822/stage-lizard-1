// routes/artistRoutes.js

const express = require("express");
const {
  organizerSignUpController,
  organizerFindController,
  organizerUpdateController,
  organizerBookedArtistController,
} = require("../controller/organizer.controllers");
const organizerRouter = express.Router();

// Define routes
organizerRouter.post("/organizer-signup", (req, res) => {
  organizerSignUpController(req, res);
});

organizerRouter
  .get("/:email", (req, res) => {
    organizerFindController(req, res);
  })
  .put("/:email", (req, res) => {
    organizerUpdateController(req, res);
  });
organizerRouter.route("/booked-artist/:email").get((req, res) => {
  organizerBookedArtistController(req, res);
});
module.exports = organizerRouter;
