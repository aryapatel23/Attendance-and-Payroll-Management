const { getDB } = require("../../config/db");

// ✅ GET /attendance/:userId
exports.getTodayAttendance = async (req, res) => {
  const db = getDB();
  const user_id = String(req.params.userId);
  const today = new Date().toISOString().split("T")[0];

  try {
    const data = await db.collection("Attendance").findOne({ user_id, date: today });
    return res.status(200).json({ status: data ? data.status : "Absent" });
  } catch (err) {
    console.error("❌ Error:", err);
    res.status(500).json({ error: "DB error" });
  }
};

// ✅ POST /mark-attendance
exports.markAttendance = async (req, res) => {
  const db = getDB();
  const { username, location, id } = req.body;
  const user = await db.collection("users").findOne({ user_id: id, username });
  if (!user) return res.status(404).json({ message: "User not found" });

  const office = { lat: 23.022505, lng: 72.5713621 };
  const distance = (loc1, loc2) => {
    const R = 6371, toRad = deg => (deg * Math.PI) / 180;
    const dLat = toRad(loc1.lat - loc2.lat);
    const dLon = toRad(loc1.lng - loc2.lng);
    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(toRad(loc1.lat)) *
        Math.cos(toRad(loc2.lat)) *
        Math.sin(dLon / 2) ** 2;
    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  };

  if (distance(location, office) > 0.5)
    return res.status(403).json({ message: "⛔ Not at office!" });

  const now = new Date(new Date().getTime() + 5.5 * 3600 * 1000);
  await db.collection("Attendance").insertOne({
    user_id: id,
    username,
    location,
    time: now,
    date: now.toISOString().split("T")[0],
    status: "Present",
  });

  res.json({ message: "✅ Attendance marked!" });
};

// ✅ GET /all-attendance
exports.getAllAttendance = async (req, res) => {
  const db = getDB();
  const records = await db.collection("Attendance").find().toArray();
  res.json(records);
};
