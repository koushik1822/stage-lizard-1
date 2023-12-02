const {
  eventCreateService,
  eventFindService,
  eventDeleteService,
  eventAllFindService,
  eventSingleFindService,
} = require("../services/event.services");

module.exports.eventCreateController = (req, res) => {
  eventCreateService(req, res);
};

module.exports.eventFindController = (req, res) => {
  eventFindService(req, res);
};

module.exports.eventAllFIndController = (req, res) => {
  eventAllFindService(req, res);
};

module.exports.eventDeleteController = (req, res) => {
  eventDeleteService(req, res);
};

module.exports.eventSingleFindController = (req, res) => {
  eventSingleFindService(req, res);
};
