const {
  createBookingController,
  bookingFindByUserController,
  bookingDeleteByUserController,
} = require("../controller/book.controllers");

const bookRouter = require("express").Router();
bookRouter
  .route("/")
  .post((req, res) => {
    createBookingController(req, res);
  })
  .delete((req, res) => {
    bookingDeleteByUserController(req, res);
  });
bookRouter.route("/:email").get((req, res) => {
  bookingFindByUserController(req, res);
});
module.exports = bookRouter;
