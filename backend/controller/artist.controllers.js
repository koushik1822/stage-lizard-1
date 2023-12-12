const {
  artistSignUpService,
  artistFindService,
  artistUpdateService,
} = require("../services/artist.services");

module.exports.artistSignUpController = (req, res) => {
  artistSignUpService(req, res);
};

//find artist
module.exports.artistFindController = (req, res) => {
  artistFindService(req, res);
};
module.exports.artistUpdateController = (req, res) => {
  artistUpdateService(req, res);
};
