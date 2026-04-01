require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const ticketRoutes = require("./routes/ticketRoutes");
const faqRoutes = require("./routes/faqRoutes");
const feedbackRoutes = require("./routes/feedbackRoutes");
const productRoutes = require("./routes/productRoutes");
const chatbotRoutes = require("./routes/chatbotRoutes");

const serviceCenters = [
  { name: "Delhi Service Hub", city: "New Delhi", address: "Connaught Place, New Delhi", lat: 28.6139, lon: 77.2090, component: "Field Service Technician", slo: "4 hours on-site commitment", image: "https://via.placeholder.com/320x180?text=Delhi+Service+Hub", criteria: ["24/7 booking", "Same-day technician dispatch", "Customer rating 4.7/5"], supportedBrands: ["Dell", "HP", "Lenovo"], supportedComponents: [{ name: "Laptop Repair", price: "₹1500" }, { name: "Mobile Charger", price: "₹400" }, { name: "Mobile Components", price: "₹250-₹1,200" }] },
  { name: "Mumbai Service Hub", city: "Mumbai", address: "Bandra East, Mumbai", lat: 19.0760, lon: 72.8777, component: "Hardware Repair", slo: "4 hours on-site commitment", image: "https://via.placeholder.com/320x180?text=Mumbai+Service+Hub", criteria: ["Parts available locally", "Express repair", "Customer rating 4.6/5"], supportedBrands: ["Apple", "Samsung", "OnePlus"], supportedComponents: [{ name: "Laptop Repair", price: "₹1,400" }, { name: "Charger", price: "₹350" }, { name: "Mobile Charger", price: "₹450" }] },
  { name: "Bengaluru Service Hub", city: "Bengaluru", address: "MG Road, Bengaluru", lat: 12.9716, lon: 77.5946, component: "Software Support", slo: "4 hours on-site commitment", image: "https://via.placeholder.com/320x180?text=Bengaluru+Service+Hub", criteria: ["Software troubleshooting", "Remote diagnostics", "Customer rating 4.8/5"], supportedBrands: ["Lenovo", "HP", "Dell"], supportedComponents: [{ name: "Laptop Repair", price: "₹1,500" }, { name: "Mobile Components", price: "₹300-₹1,000" }, { name: "Charger", price: "₹380" }] },
  { name: "Chennai Service Hub", city: "Chennai", address: "T. Nagar, Chennai", lat: 13.0827, lon: 80.2707, component: "Diagnostics & Replacement", slo: "5 hours on-site commitment", image: "https://via.placeholder.com/320x180?text=Chennai+Service+Hub", criteria: ["Replacement parts ready", "Field diagnostics", "Customer rating 4.5/5"], supportedBrands: ["Samsung", "Xiaomi", "OnePlus"], supportedComponents: [{ name: "Mobile Charger", price: "₹420" }, { name: "Laptop Repair", price: "₹1,550" }, { name: "Mobile Components", price: "₹270-₹1,150" }] },
  { name: "Kolkata Service Hub", city: "Kolkata", address: "Salt Lake, Kolkata", lat: 22.5726, lon: 88.3639, component: "Field Service Technician", slo: "5 hours on-site commitment", image: "https://via.placeholder.com/320x180?text=Kolkata+Service+Hub", criteria: ["City-wide coverage", "Fast on-site arrival", "Customer rating 4.6/5"], supportedBrands: ["Dell", "HP", "Acer"], supportedComponents: [{ name: "Laptop Repair", price: "₹1,600" }, { name: "Charger", price: "₹360" }, { name: "Mobile Components", price: "₹280-₹1,100" }] },
  { name: "Hyderabad Service Hub", city: "Hyderabad", address: "Hitech City, Hyderabad", lat: 17.3850, lon: 78.4867, component: "Electronics Support", slo: "4 hours on-site commitment", image: "https://via.placeholder.com/320x180?text=Hyderabad+Service+Hub", criteria: ["Electronics repairs", "Component swap", "Customer rating 4.7/5"], supportedBrands: ["OnePlus", "Samsung", "Xiaomi"], supportedComponents: [{ name: "Laptop Repair", price: "₹1,450" }, { name: "Mobile Charger", price: "₹430" }, { name: "Mobile Components", price: "₹260-₹1,180" }] },
  { name: "Pune Service Hub", city: "Pune", address: "Viman Nagar, Pune", lat: 18.5204, lon: 73.8567, component: "Repair & Installation", slo: "4 hours on-site commitment", image: "https://via.placeholder.com/320x180?text=Pune+Service+Hub", criteria: ["Installation experts", "Post-install support", "Customer rating 4.6/5"], supportedBrands: ["Lenovo", "Dell", "HP"], supportedComponents: [{ name: "Laptop Repair", price: "₹1,420" }, { name: "Charger", price: "₹340" }, { name: "Mobile Components", price: "₹290-₹1,090" }] },
  { name: "Ahmedabad Service Hub", city: "Ahmedabad", address: "Satellite, Ahmedabad", lat: 23.0225, lon: 72.5714, component: "Field Service Technician", slo: "6 hours on-site commitment", image: "https://via.placeholder.com/320x180?text=Ahmedabad+Service+Hub", criteria: ["Remote support available", "Heavy equipment handling", "Customer rating 4.4/5"], supportedBrands: ["Dell", "HP", "Lenovo"], supportedComponents: [{ name: "Laptop Repair", price: "₹1,650" }, { name: "Mobile Charger", price: "₹470" }, { name: "Mobile Components", price: "₹300-₹1,250" }] },
  { name: "Jaipur Service Hub", city: "Jaipur", address: "Malviya Nagar, Jaipur", lat: 26.9124, lon: 75.7873, component: "Support Specialist", slo: "6 hours on-site commitment", image: "https://via.placeholder.com/320x180?text=Jaipur+Service+Hub", criteria: ["Specialist diagnostics", "Warranty service", "Customer rating 4.5/5"], supportedBrands: ["Apple", "Samsung", "OnePlus"], supportedComponents: [{ name: "Laptop Repair", price: "₹1,600" }, { name: "Charger", price: "₹370" }, { name: "Mobile Components", price: "₹280-₹1,150" }] },
  { name: "Lucknow Service Hub", city: "Lucknow", address: "Hazratganj, Lucknow", lat: 26.8467, lon: 80.9462, component: "Repair & Diagnostics", slo: "6 hours on-site commitment", image: "https://via.placeholder.com/320x180?text=Lucknow+Service+Hub", criteria: ["Comprehensive diagnostics", "In-home repairs", "Customer rating 4.5/5"], supportedBrands: ["Dell", "HP", "Lenovo"], supportedComponents: [{ name: "Laptop Repair", price: "₹1,620" }, { name: "Mobile Charger", price: "₹460" }, { name: "Mobile Components", price: "₹290-₹1,170" }] }
];

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/supportDB")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

app.use("/api/auth", authRoutes);
app.use("/api/tickets", ticketRoutes);
app.use("/api/faqs", faqRoutes);
app.use("/api/feedback", feedbackRoutes);
app.use("/api/products", productRoutes);
app.use("/api/chatbot", chatbotRoutes);
app.get("/api/servicecenters", (req, res) => {
  res.json(serviceCenters);
});

app.listen(5000, () => console.log("Server running on port 5000"));

module.exports = app;
