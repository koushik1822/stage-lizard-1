const mongoose = require("mongoose");

const gigSchema = new mongoose.Schema({
  gig: {
    type: [],
  },
  email: {
    type: String,
    required: true,
  },
});

const gigModel = mongoose.model("gigs", gigSchema);

module.exports = gigModel;
