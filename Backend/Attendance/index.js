const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { connectDB, getDB } = require("./db");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

// ✅ Simple attendance route
app.post("/mark-attendance", async (req, res) => {
const db = getDB();

const {  username, location } = req.body;

const user = await db.collection("users").findOne({ username });

if (!user) {
  return res.status(404).json({ message: "User not found in db"  });
}

  // Example fixed office location
  const officeLocation = { lat: 23.0225, lng: 72.5714 };

  // Distance function (in km)
  function distance(loc1, loc2) {
    const toRad = deg => (deg * Math.PI) / 180;
    const R = 6371;
    const dLat = toRad(loc1.lat - loc2.lat);
    const dLon = toRad(loc1.lng - loc2.lng);
    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(toRad(loc1.lat)) * Math.cos(toRad(loc2.lat)) *
      Math.sin(dLon / 2) ** 2;
    return R * (2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)));
  }

  if (distance(location, officeLocation) > 0.5) {
    return res.status(403).json({ message: "⛔ You are not at office location!" });
  }
  
  const dateUTC=new Date()
  const dateIST = new Date(dateUTC.getTime() + 5.5 * 60 * 60 * 1000); // Convert to IST

  await db.collection("Attendance").insertOne({
    username,
    location,
    time: dateIST,
    status: "Present"
  });

  res.json({ message: "✅ Attendance marked!" });
});

// ✅ View all attendance (admin)
app.get("/all-attendance", async (req, res) => {
  const db = getDB();
  const records = await db.collection("Attendance").find().toArray();
  res.json(records);
});

// 🔌 Connect and Start
connectDB().then(() => {
  app.listen(process.env.PORT || 5000, () => {
    console.log("🚀 Server running on port", process.env.PORT || 5000);
  });
}).catch(err => {
  console.error("❌ Failed to connect to MongoDB", err);
});
