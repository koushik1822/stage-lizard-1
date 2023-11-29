const artistModel = require("../models/artistModel");

module.exports.artistSignUpService = async (req, res) => {
  const artist = req.body;
  try {
    const foundArtist = await artistModel.findOne({ email: artist.email });
    if (!foundArtist) {
      const createdArtist = await artistModel.create(req.body);
      res.status(200).json(createdArtist);
    }
  } catch (error) {
    console.error(error.message);
  }
};

//get single artist

module.exports.artistFindService = async (req, res) => {
  // console.log(req.params);
  const { email } = req.params;
  try {
    const foundArtist = await artistModel.findOne({ email: email });
   
    if (foundArtist) {
      await res.status(200).json(foundArtist);
    } else {
      res.status(400).json("not found");
    }
  } catch (error) {
    console.log(error);
  }
};
