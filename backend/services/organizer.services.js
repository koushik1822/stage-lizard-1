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
    console.log(foundOrganizer);
    if (foundOrganizer) {
      await res.status(200).json(foundOrganizer);
    } else {
      res.json("not found");
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports.organizerUpdateService = async (req, res) => {
  const { email } = req.params;
  const body = req.body;

  try {
    const result = await organizerModel.updateOne(
      { email: email },
      { $set: body }
    );
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
  }
};
