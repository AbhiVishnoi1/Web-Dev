const express = require("express");
const router = express.Router();

const serviceCenters = [
  { name: "Delhi Service Hub", city: "New Delhi", lat: 28.6139, lon: 77.2090, component: "Field Service Technician", slo: "4 hours on-site commitment", image: "https://via.placeholder.com/320x180?text=Delhi+Service+Hub", criteria: ["24/7 booking", "Same-day technician dispatch", "Customer rating 4.7/5"] },
  { name: "Mumbai Service Hub", city: "Mumbai", lat: 19.0760, lon: 72.8777, component: "Hardware Repair", slo: "4 hours on-site commitment", image: "https://via.placeholder.com/320x180?text=Mumbai+Service+Hub", criteria: ["Parts available locally", "Express repair", "Customer rating 4.6/5"] },
  { name: "Bengaluru Service Hub", city: "Bengaluru", lat: 12.9716, lon: 77.5946, component: "Software Support", slo: "4 hours on-site commitment", image: "https://via.placeholder.com/320x180?text=Bengaluru+Service+Hub", criteria: ["Software troubleshooting", "Remote diagnostics", "Customer rating 4.8/5"] },
  { name: "Chennai Service Hub", city: "Chennai", lat: 13.0827, lon: 80.2707, component: "Diagnostics & Replacement", slo: "5 hours on-site commitment", image: "https://via.placeholder.com/320x180?text=Chennai+Service+Hub", criteria: ["Replacement parts ready", "Field diagnostics", "Customer rating 4.5/5"] },
  { name: "Kolkata Service Hub", city: "Kolkata", lat: 22.5726, lon: 88.3639, component: "Field Service Technician", slo: "5 hours on-site commitment", image: "https://via.placeholder.com/320x180?text=Kolkata+Service+Hub", criteria: ["City-wide coverage", "Fast on-site arrival", "Customer rating 4.6/5"] },
  { name: "Hyderabad Service Hub", city: "Hyderabad", lat: 17.3850, lon: 78.4867, component: "Electronics Support", slo: "4 hours on-site commitment", image: "https://via.placeholder.com/320x180?text=Hyderabad+Service+Hub", criteria: ["Electronics repairs", "Component swap", "Customer rating 4.7/5"] },
  { name: "Pune Service Hub", city: "Pune", lat: 18.5204, lon: 73.8567, component: "Repair & Installation", slo: "4 hours on-site commitment", image: "https://via.placeholder.com/320x180?text=Pune+Service+Hub", criteria: ["Installation experts", "Post-install support", "Customer rating 4.6/5"] },
  { name: "Ahmedabad Service Hub", city: "Ahmedabad", lat: 23.0225, lon: 72.5714, component: "Field Service Technician", slo: "6 hours on-site commitment", image: "https://via.placeholder.com/320x180?text=Ahmedabad+Service+Hub", criteria: ["Remote support available", "Heavy equipment handling", "Customer rating 4.4/5"] },
  { name: "Jaipur Service Hub", city: "Jaipur", lat: 26.9124, lon: 75.7873, component: "Support Specialist", slo: "6 hours on-site commitment", image: "https://via.placeholder.com/320x180?text=Jaipur+Service+Hub", criteria: ["Specialist diagnostics", "Warranty service", "Customer rating 4.5/5"] },
  { name: "Lucknow Service Hub", city: "Lucknow", lat: 26.8467, lon: 80.9462, component: "Repair & Diagnostics", slo: "6 hours on-site commitment", image: "https://via.placeholder.com/320x180?text=Lucknow+Service+Hub", criteria: ["Comprehensive diagnostics", "In-home repairs", "Customer rating 4.5/5"] }
];

router.get("/", async (req, res) => {
  console.log('SERVICE ROUTES GET / hit');
  res.json(serviceCenters);
});

module.exports = router;
