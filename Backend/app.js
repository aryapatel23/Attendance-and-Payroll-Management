const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const authRoutes = require('./modules/auth/authRoutes');
const userRoutes = require('./modules/user/userRoutes');
const attendanceRoutes = require("./modules/attendanceCopy/attendance.routes");
const payrollroutes =require('./modules/payroll/payrollroutes')
const calendar =require('./modules/calendar/holidayRoutes')

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use((req, res, next) => {
  console.log(`[📥 ${new Date().toLocaleString()}] ${req.method} ${req.url}`);
  next();
});

app.use('/api', authRoutes);
app.use('/api', userRoutes);
app.use('/api', attendanceRoutes);
app.use('/api',payrollroutes)
app.use('/api',calendar)

module.exports = app;
