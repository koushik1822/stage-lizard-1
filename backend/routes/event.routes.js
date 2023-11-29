const express = require("express");
const { eventCreateController } = require("../controller/event.controllers");
const eventRouter = express.Router();

eventRouter.post("/", (req, res) => {
  eventCreateController(req, res);
});
module.exports = eventRouter;
