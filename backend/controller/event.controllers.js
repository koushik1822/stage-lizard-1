const { eventCreateService } = require("../services/event.services");

module.exports.eventCreateController = (req, res) => {
  eventCreateService(req, res);
};
