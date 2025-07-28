const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const authRoutes = require('./modules/auth/authRoutes');
const userRoutes = require('./modules/user/userRoutes');
const attendanceRoutes = require("./modules/attendanceCopy/attendance.routes");
const payrollroutes = require('./modules/payroll/payrollroutes');
const calendar = require('./modules/calendar/holidayRoutes');
const mailroutes = require('./modules/mail/mailroutes');

const app = express();

// ✅ Configure CORS for React frontend
app.use(cors({
  origin: 'http://localhost:5173', // Allow only your React dev server
  credentials: true,              // Allow cookies/authorization headers
}));

// ✅ Body parser & cookies
app.use(express.json());
app.use(cookieParser());

// ✅ Request logger (good for debugging)
app.use((req, res, next) => {
  console.log(`[📥 ${new Date().toLocaleString()}] ${req.method} ${req.url}`);
  next();
});

// ✅ Mount API routes
app.use('/api', authRoutes);
app.use('/api', userRoutes);
app.use('/api', attendanceRoutes);
app.use('/api', payrollroutes);
app.use('/api', calendar);
app.use('/api', mailroutes);

module.exports = app;
