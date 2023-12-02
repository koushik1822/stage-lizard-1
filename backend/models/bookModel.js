const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    eventId: {
      type: String,
      required: true,
    },
    bookedBy: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
const bookModel = mongoose.model("bookings", bookingSchema);

module.exports = bookModel;
