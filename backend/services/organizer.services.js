const { default: mongoose } = require("mongoose");
const bookModel = require("../models/bookModel");
const eventModel = require("../models/eventModel");
const organizerModel = require("../models/organizerModel");
//organizer signup
module.exports.organizerSignUpService = async (req, res) => {
  const organizer = req.body;

  try {
    const foundOrganizer = await organizerModel.findOne({
      email: organizer.email,
    });
    if (!foundOrganizer) {
      const createdOrganizer = await organizerModel.create(req.body);
      res.status(200).json(createdOrganizer);
    }
  } catch (error) {
    console.error(error.message);
  }
};

//organizer find

module.exports.organizerFindService = async (req, res) => {
  // console.log(req.params);
  const { email } = req.params;
  try {
    const foundOrganizer = await organizerModel.findOne({ email: email });

    if (foundOrganizer) {
      await res.status(200).json(foundOrganizer);
    } else {
      res.json("not found");
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports.organizerUpdateService = async (req, res) => {
  const { email } = req.params;
  const body = req.body;

  try {
    const result = await organizerModel.updateOne(
      { email: email },
      { $set: body }
    );
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
  }
};

module.exports.bookedArtistService = async (req, res) => {
  const { email } = req.params;

  try {
    const event = await eventModel.find({ user: email }).distinct("_id").lean();
    // const booking = await bookModel.find().distinct("eventId");
    const eventIds = event.map((eventId) => eventId.toString());

    // const commonIds = await event.find({ _id: { $in: booking } });
    // const commonIds = eventIds.filter((eventId) => booking.includes(eventId));
    const booking = await bookModel.find({ eventId: { $in: eventIds } });
    const uniqueEventIdsInBooking = [
      ...new Set(booking.map((item) => item.eventId)),
    ];

    // Retrieve event details for the unique eventIds
    const eventDetails = await eventModel
      .find({ _id: { $in: uniqueEventIdsInBooking } })
      .lean();

    // Combine booking and eventDetails to show which event is booked and by whom
    const bookingsWithEventDetails = booking.map((bookingItem) => {
      const correspondingEvent = eventDetails.find(
        (eventItem) => eventItem._id.toString() === bookingItem.eventId
      );

      return {
        booking: bookingItem,
        eventDetails: correspondingEvent,
      };
    });

    if (bookingsWithEventDetails.length > 0) {
      res.json(bookingsWithEventDetails);
    } else {
      res.json("no booking");
    }
  } catch (error) {
    console.log(error);
  }
};
