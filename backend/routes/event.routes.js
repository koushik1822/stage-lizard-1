const express = require("express");
const {
  eventCreateController,
  eventFindController,
  eventDeleteController,
} = require("../controller/event.controllers");
const eventRouter = express.Router();

eventRouter.post("/", (req, res) => {
  eventCreateController(req, res);
});
module.exports = eventRouter;

eventRouter.get("/:email", (req, res) => {
  eventFindController(req, res);
});

eventRouter.delete("/delete/:id", (req, res) => {
  eventDeleteController(req, res);
});
