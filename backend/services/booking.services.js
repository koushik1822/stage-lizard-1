const bookModel = require("../models/bookModel");
const eventModel = require("../models/eventModel");

module.exports.createBookingService = async (req, res) => {
  const { bookedBy, eventId } = req.body;
  try {
    const foundBooking = await bookModel.find({
      eventId: eventId,
      bookedBy: bookedBy,
    });
    console.log(foundBooking);
    if (foundBooking.length > 0) {
      res.status(200).json("you already booked");
    } else {
      const createBooking = await bookModel.create(req.body);
      res.status(200).json(createBooking);
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports.bookingFindByUserService = async (req, res) => {
  const { email } = req.params;
  try {
    const bookedEventsDetails = await bookModel.find({ bookedBy: email });
    const bookedEvents = await bookModel
      .find({ bookedBy: email })
      .distinct("eventId");
    const matchingEvents = await eventModel.find({
      _id: { $in: bookedEvents },
    });
    if (matchingEvents.length > 0 && bookedEventsDetails.length > 0) {
      res.status(200).json([bookedEventsDetails, matchingEvents]);
    } else {
      res.status(200).json("no booking found");
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports.bookingDeleteByUserService = async (req, res) => {
  const { user, id } = req.query;
  console.log(user, id);
  try {
    const deletedBooking = await bookModel.deleteOne({
      eventId: id,
      bookedBy: user,
    });
    if (deletedBooking.deletedCount > 0) {
      res.status(200).json(deletedBooking);
    } else {
      res.status(200).json("not deleted");
    }
  } catch (error) {
    console.log(error);
  }
};
