const {
  createBookingService,
  bookingFindByUserService,
  bookingDeleteByUserService,
} = require("../services/booking.services");

module.exports.createBookingController = (req, res) => {
  createBookingService(req, res);
};

module.exports.bookingFindByUserController = (req, res) => {
  bookingFindByUserService(req, res);
};

module.exports.bookingDeleteByUserController = (req, res) => {
  bookingDeleteByUserService(req, res);
};
