const gigModel = require("../models/gigModel");

module.exports.gigCreateService = async (req, res) => {
  const gig = req.body;

  console.log(gig);
  try {
    const createdGig = await gigModel.insertMany(gig);
    if (createdGig) {
      res.status(200).json(createdGig);
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports.gigFindByOrganizerService = async (req, res) => {
  // console.log(req.params);
  const { email } = req.params;
  try {
    const foundGigs = await gigModel.find({ email: email });
    console.log(foundGigs);
    if (foundGigs) {
      res.status(200).json(foundGigs);
  } else {
      res.json("no gigs found");
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports.gigDeleteOrganizerService = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedGig = await gigModel.findByIdAndDelete(id);
    console.log(deletedGig);
    if (deletedGig) {
      res.status(200).json("successfully deleted");
    } else {
      res.json("could not delete");
    }
  } catch (error) {
    console.log(error);
  }
};
