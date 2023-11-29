// routes/artistRoutes.js

const express = require("express");
const {
  organizerSignUpController,
  organizerFindController,
} = require("../controller/organizer.controllers");
const organizerRouter = express.Router();

// Define routes
organizerRouter.post("/organizer-signup", (req, res) => {
  organizerSignUpController(req, res);
});

organizerRouter.get("/:email", (req, res) => {
  organizerFindController(req, res);
});

module.exports = organizerRouter;
