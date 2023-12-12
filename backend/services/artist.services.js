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
  // console.log(email);
  try {
    const foundArtist = await artistModel.findOne({ email: email });
    // console.log(foundArtist);
    if (foundArtist) {
      console.log(foundArtist);
      res.status(200).json(foundArtist);
    } else {
      res.status(400).json("not found");
    }
  } catch (error) {
    console.log(error);
  }
};

//update artist

module.exports.artistUpdateService = async (req, res) => {
  const { email } = req.params;
  const body = req.body;

  try {
    const result = await artistModel.updateOne(
      { email: email },
      { $set: body }
    );
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
  }
};
