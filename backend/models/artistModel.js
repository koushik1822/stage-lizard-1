// models/Artist.js

const mongoose = require("mongoose");

const artistSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    primaryMusicGenre: {
      type: String,
      required: true,
    },
    additionalMusicGenres: {
      type: [String], // Array of strings for multiple genres
    },
    city: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
  },

  { timestamps: true }
);

const artistModel = mongoose.model("Artist", artistSchema);

module.exports = artistModel;
