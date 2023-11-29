const organizerModel = require("../models/organizerModel");
//organizer signup
module.exports.organizerSignUpService = async (req, res) => {
  const organizer = req.body;
  console.log(organizer);
  try {
    const foundOrganizer = await organizerModel.findOne({
      email: organizer.email,
    });
    if (!foundOrganizer) {
      const createdOrganizer = await organizerModel.create(req.body);
      res.status(200).json(createdOrganizer);
    }
  } catch (error) {
    console.error(error.message);
  }
};

//organizer find

module.exports.organizerFindService = async (req, res) => {
  // console.log(req.params);
  const { email } = req.params;
  try {
    const foundOrganizer = await organizerModel.findOne({ email: email });

    if (foundOrganizer) {
      await res.status(200).json(foundOrganizer);
    } else {
      //   res.status(404).json("not found");
    }
  } catch (error) {
    console.log(error);
  }
};
