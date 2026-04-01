const express = require("express");
const Product = require("../models/Product");
const router = express.Router();

const seedProducts = [
  { name: "Ticket Counter", available: "Yes", testing: "Unit tests + UI flow" },
  { name: "FAQ Manager", available: "Yes", testing: "Integration checks" },
  { name: "Feedback Board", available: "Yes", testing: "Form validation" },
  { name: "Random Chat", available: "Yes", testing: "Interaction checks" }
];

router.get("/", async (req, res) => {
  let products = await Product.find();
  if (products.length === 0) {
    products = await Product.insertMany(seedProducts);
  }
  res.json(products);
});

router.post("/", async (req, res) => {
  const product = new Product(req.body);
  await product.save();
  res.json(product);
});

module.exports = router;
