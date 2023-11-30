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

module.exports.eventFindService = async (req, res) => {
  console.log(req.params);
  const { email } = req.params;
  try {
    const foundEvent = await eventModel.find({ user: email });
    console.log(foundEvent);
    res.status(200).json(foundEvent);
  } catch (error) {
    console.log(error);
  }
};

module.exports.eventDeleteService = async (req, res) => {
  console.log(req.params);
  const { id } = req.params;
  try {
    const deleted = await eventModel.deleteOne({ _id: id });
    console.log(deleted);
    res.status(200).json(deleted);
  } catch (error) {
    console.log(error);
  }
};
