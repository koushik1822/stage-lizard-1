const {
  eventCreateService,
  eventFindService,
  eventDeleteService,
} = require("../services/event.services");

module.exports.eventCreateController = (req, res) => {
  eventCreateService(req, res);
};

module.exports.eventFindController = (req, res) => {
  eventFindService(req, res);
};

module.exports.eventDeleteController = (req, res) => {
  eventDeleteService(req, res);
};
