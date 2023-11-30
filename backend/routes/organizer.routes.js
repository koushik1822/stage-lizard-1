// routes/artistRoutes.js

const express = require("express");
const {
  organizerSignUpController,
  organizerFindController,
  organizerUpdateController,
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

module.exports = organizerRouter;
