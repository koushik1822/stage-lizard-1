// models/Artist.js

const mongoose = require("mongoose");
const questionSchema = new mongoose.Schema({});
const questionModel = mongoose.model("questions", questionSchema);

module.exports = questionModel;
