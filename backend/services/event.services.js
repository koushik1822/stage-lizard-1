const eventModel = require("../models/eventModel");
var moment = require("moment"); // require
moment().format();
//post event
module.exports.eventCreateService = async (req, res) => {
  const event = req.body;
  console.log(event);
  try {
    const createdEvent = await eventModel.create(event);
    res.status(200).json(createdEvent);
  } catch (error) {
    console.log(error);
  }
};
//get event
module.exports.eventFindService = async (req, res) => {
  const { email } = req.params;
  try {
    const foundEvent = await eventModel.find({ user: email });
    // console.log(foundEvent);
    res.status(200).json(foundEvent);
  } catch (error) {
    console.log(error);
  }
};

module.exports.eventAllFindService = async (req, res) => {
  const allEvent = await eventModel.find({});

  if (allEvent) {
    res.status(200).json(allEvent);
  }
};

module.exports.eventSingleFindService = async (req, res) => {
  const { id } = req.params;
  try {
    const foundEvent = await eventModel.findById(id);
    if (foundEvent) {
      res.status(200).json(foundEvent);
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports.eventDeleteService = async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await eventModel.deleteOne({ _id: id });
    // console.log(deleted);
    res.status(200).json(deleted);
  } catch (error) {
    console.log(error);
  }
};
module.exports.eventEditService = async (req, res) => {
  const { id } = req.params;
  const body = req.body;

  try {
    const update = await eventModel.findByIdAndUpdate(
      id,
      body
      // { new: true }
    );
    if (update?.eventName) {
      res.json("edited");
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports.eventMultipleFindService = async (req, res) => {
  const { city } = req.params;
  try {
    const events = await eventModel.find();
    // console.log(events);
    const eventsMatched = await events.filter((item) =>
      item?.cityLocation?.toLowerCase().includes(city.toLowerCase())
    );
    if (eventsMatched.length > 0) {
      res.json(eventsMatched);
    } else {
      res.json("no events found on that location");
    }
    // console.log(eventsMatched);
  } catch (error) {
    console.log(error);
  }
};

module.exports.getEventsByDifferenceService = async (req, res) => {
  const today = new Date().toISOString().slice(0, 10);
  const { difference } = req.params;
  try {
    console.log(difference);
    if (difference == 7) {
      const events = await eventModel.find();
      const matchedDifference = events.filter((event) => {
        const date1 = moment(event.eventDate);
        const date2 = moment(today);
        const difference = date1.diff(date2, "days");
        if (difference <= 7 && difference >= 0) return event;
      });
      res.json(matchedDifference);
    }
    if (difference == 30) {
      const events = await eventModel.find();
      const matchedDifference = events.filter((event) => {
        const date1 = moment(event.eventDate);
        const date2 = moment(today);
        const difference = date1.diff(date2, "days");
        if (difference <= 30 && difference >= 0) return event;
      });
      res.json(matchedDifference);
    }
    if (difference == "all") {
      const events = await eventModel.find();
      res.json(events);
    }
  } catch (error) {}
};
