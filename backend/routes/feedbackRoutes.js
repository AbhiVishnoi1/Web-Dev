const express = require("express");
const Feedback = require("../models/Feedback");
const router = express.Router();

router.post("/", async (req, res) => {
  const feedback = new Feedback(req.body);
  await feedback.save();
  res.json(feedback);
});

router.get("/", async (req, res) => {
  const feedbacks = await Feedback.find();
  res.json(feedbacks);
});

module.exports = router;
