const {
  artistSignUpService,
  artistFindService,
} = require("../services/artist.services");

module.exports.artistSignUpController = (req, res) => {
  artistSignUpService(req, res);
};

//find artist
module.exports.artistFindController = (req, res) => {
  artistFindService(req, res);
};
