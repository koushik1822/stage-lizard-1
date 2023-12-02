// routes/artistRoutes.js

const express = require("express");
const {
  gigCreateController,
  gigFindByOrganizerController,
  gigDeleteOrganizerController,
} = require("../controller/gig.controllers");
const gigRouter = express.Router();

gigRouter.route("/").post((req, res) => {
  gigCreateController(req, res);
});
gigRouter.route("/:email").get((req, res) => {
  gigFindByOrganizerController(req, res);
});
gigRouter.route("/delete/:id").delete((req, res) => {
  gigDeleteOrganizerController(req, res);
});
module.exports = gigRouter;
