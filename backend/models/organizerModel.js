// models/organizerModel.js

const mongoose = require("mongoose");

const organizerSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
});

const organizerModel = mongoose.model("Organizer", organizerSchema);

module.exports = organizerModel;
