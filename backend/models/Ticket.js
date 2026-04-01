const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema({
  title: String,
  description: String
});

module.exports = mongoose.model("Ticket", ticketSchema);
