const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  {
    questions: {
      type: [],
      required: true,
    },
    eventName: {
      type: String,
      required: true,
    },
    eventDate: {
      type: String,
      required: true,
    },
    eventStartTime:{
      type:String,
      required:true
    },
    eventEndTime:{
      type:String,
      required:true
    },
    applicationDeadline: {
      type: String,
      required: true,
    },
    eventDescription: {
      type: String,
      required: true,
    },
    cityLocation: {
      type: String,
      required: true,
    },
    user: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
const eventModel = mongoose.model("events", eventSchema);
module.exports = eventModel;
