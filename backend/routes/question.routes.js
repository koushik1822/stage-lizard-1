const {
  getAllQuestionController,
} = require("../controller/question.controllers");

const questionRouter = require("express").Router();
questionRouter.get("/", (req, res) => {
  getAllQuestionController(req, res);
});
module.exports = questionRouter;
