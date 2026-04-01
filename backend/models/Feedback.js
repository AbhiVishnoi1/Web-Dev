const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema({
  message: String
});

module.exports = mongoose.model("Feedback", feedbackSchema);
