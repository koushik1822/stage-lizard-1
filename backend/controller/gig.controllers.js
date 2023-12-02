const {
  gigCreateService,
  gigFindByOrganizerService,
  gigDeleteOrganizerService,
} = require("../services/gig.services");

module.exports.gigCreateController = (req, res) => {
  gigCreateService(req, res);
};

module.exports.gigFindByOrganizerController = (req, res) => {
  gigFindByOrganizerService(req, res);
};

module.exports.gigDeleteOrganizerController = (req, res) => {
  gigDeleteOrganizerService(req, res);
};
