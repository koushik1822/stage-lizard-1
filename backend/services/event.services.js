const eventModel = require("../models/eventModel");

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
