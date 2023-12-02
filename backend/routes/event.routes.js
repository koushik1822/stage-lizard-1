const express = require("express");
const {
  eventCreateController,
  eventFindController,
  eventDeleteController,
  eventAllFIndController,
  eventSingleFindController,
} = require("../controller/event.controllers");
const eventRouter = express.Router();

eventRouter
  .route("/")
  .post((req, res) => {
    eventCreateController(req, res);
  })
  .get((req, res) => {
    eventAllFIndController(req, res);
  });

eventRouter.get("/:email", (req, res) => {
  eventFindController(req, res);
});

eventRouter.delete("/delete/:id", (req, res) => {
  eventDeleteController(req, res);
});

eventRouter.route("/single-event/:id").get((req, res) => {
  eventSingleFindController(req, res);
});
module.exports = eventRouter;
