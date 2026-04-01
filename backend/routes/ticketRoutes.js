const express = require("express");
const Ticket = require("../models/Ticket");
const router = express.Router();

router.post("/", async (req, res) => {
  const ticket = new Ticket(req.body);
  await ticket.save();
  res.json(ticket);
});

router.get("/", async (req, res) => {
  const tickets = await Ticket.find();
  res.json(tickets);
});

module.exports = router;
