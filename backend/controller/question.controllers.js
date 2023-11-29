const { getAllQuestionService } = require("../services/question.services");

module.exports.getAllQuestionController = (req, res) => {
  getAllQuestionService(req, res);
};
