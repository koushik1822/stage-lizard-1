const {
  organizerSignUpService,
  organizerFindService,
} = require("../services/organizer.services");

module.exports.organizerSignUpController = (req, res) => {
  organizerSignUpService(req, res);
};

module.exports.organizerFindController = (req, res) => {
  organizerFindService(req, res);
};
