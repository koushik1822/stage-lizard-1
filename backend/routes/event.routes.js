const express = require("express");
const {
  eventCreateController,
  eventFindController,
  eventDeleteController,
  eventAllFIndController,
  eventSingleFindController,
  eventMultipleFindController,
  getEventsByDifferenceController,
  eventEditController,
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
eventRouter.put("/edit/:id", (req, res) => {
  eventEditController(req, res);
});

eventRouter.route("/single-event/:id").get((req, res) => {
  eventSingleFindController(req, res);
});
eventRouter.route("/multiple-event/:city").get((req, res) => {
  eventMultipleFindController(req, res);
});
eventRouter.route("/event-difference/:difference").get((req, res) => {
  getEventsByDifferenceController(req, res);
});

module.exports = eventRouter;
