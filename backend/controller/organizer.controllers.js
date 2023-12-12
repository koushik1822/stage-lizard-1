const {
  organizerSignUpService,
  organizerFindService,
  organizerUpdateService,
  bookedArtistService,
} = require("../services/organizer.services");

module.exports.organizerSignUpController = (req, res) => {
  organizerSignUpService(req, res);
};

module.exports.organizerFindController = (req, res) => {
  organizerFindService(req, res);
};
module.exports.organizerUpdateController = (req, res) => {
  organizerUpdateService(req, res);
};

module.exports.organizerBookedArtistController = (req, res) => {
  bookedArtistService(req, res);
};
