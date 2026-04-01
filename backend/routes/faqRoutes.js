const express = require("express");
const Faq = require("../models/Faq");
const router = express.Router();

router.post("/", async (req, res) => {
  const faq = new Faq(req.body);
  await faq.save();
  res.json(faq);
});

router.get("/", async (req, res) => {
  const faqs = await Faq.find();
  res.json(faqs);
});

module.exports = router;
