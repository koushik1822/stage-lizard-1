const questionModel = require("../models/questionsModel");

module.exports.getAllQuestionService = async (req, res) => {
  try {
    const allQuestion = await questionModel.find({});
    res.status(200).json(allQuestion);
  } catch (error) {
    console.log(error);
  }
};
