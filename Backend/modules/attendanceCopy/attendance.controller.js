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
  console.log("Request body:", req.body);
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
const timeforhours =new Date(new Date().getTime() );
console.log("Current time:", now.toISOString());
const hours = timeforhours.getHours();
console.log("Current hours:", hours);
const minutes = timeforhours.getMinutes();
console.log("Current minutes:", minutes);

if (hours < 9 || hours >= 18) {
  return res.status(403).json({ message: "⏰ Not within office hours!" });
}

const totalMinutes = hours * 60 + minutes;

const timeData = {
  user_id: id,
  username,
  location,
  time: now,
  date: now.toISOString().split("T")[0],
};
if (totalMinutes <= 615) {
  // before or at 10:15 (9:00 = 540, 10:15 = 615)
  await db.collection("Attendance").insertOne({
    ...timeData,
    status: "Present",
  });
} else if (totalMinutes > 615 && totalMinutes <= 645) {
  // 10:15 to 10:45 (615 < time <= 645)
  await db.collection("Attendance").insertOne({
    ...timeData,
    status: "Late",
  });
} else {
  // after 10:45
  await db.collection("Attendance").insertOne({
    ...timeData,
    status: "Late Absent",
  });
}
    

//  console.log("current time is",now.toISOString().split("T")[1])
  res.json({ message: "✅ Attendance marked!" });
};

// ✅ GET /all-attendance
exports.getAllAttendance = async (req, res) => {
  try {
    const db = getDB();

    const today = new Date().toISOString().split("T")[0]; // "2025-06-15"
    const todayDate = new Date(today); // midnight
    const tomorrowDate = new Date(today);

    tomorrowDate.setDate(todayDate.getDate() + 1); // next day;
    const attendance = await db
      .collection("Attendance")
      .find({
        date: {
          $gte: today, // greater than or equal to today
          $lt: tomorrowDate.toISOString().split("T")[0], // less than tomorrow
        },
      })
      .sort({ time: -1 })
      .toArray();

    res.status(200).json({ attendance });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching attendance in db', error });
  }
};
  