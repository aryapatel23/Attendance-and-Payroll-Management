import React from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Login from './Pages/Login/Login';
import Home from './Pages/Home/Home';
import HRDashboard from './Pages/Admin/HrDashboard';
import Deshbord from './Pages/Employee/Home.jsx';
import Attendance from './Pages/Employee/Attendance.jsx';
import Add from './Pages/Add.jsx';
import Salary from './Pages/Employee/Salary.jsx';
import Calendar from './Pages/Employee/Calendar.jsx';
import Employees from './Pages/Admin/Employees.jsx';

function App() {
  const isAuthenticated = localStorage.getItem('token');
  const role = (localStorage.getItem('role') || '').toLowerCase();
  const token = useSelector((state) => state.auth.token);

  if (token === undefined) {
    return <div>Loading...</div>;
  }

  return (
    <BrowserRouter>
      <Routes>
        {/* Public Route */}
        <Route path="/" element={<Login />} />

        {/* Role: HR */}
        {isAuthenticated && role === 'hr' && (
          <>
            <Route path="/hrhome" element={<HRDashboard />} />
            <Route path="/hremployees" element={<Employees />} />
            <Route path="/add" element={<Add />} />
          </>
        )}

        {/* Role: Employee */}
        {isAuthenticated && role === 'employee' && (
          <>
            <Route path="/home" element={<Home />} />
            <Route path="/emhome" element={<Deshbord />} />
            <Route path="/emattendance" element={<Attendance />} />
            <Route path="/emsalary" element={<Salary />} />
            <Route path="/emcalendar" element={<Calendar />} />
          </>
        )}

        {/* Fallback for unmatched routes */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
