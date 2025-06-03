import React from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Login from './Pages/Login/Login';
import Home from './Pages/Home/Home';
import HRDashboard from './Pages/Admin/HrDashboard';
import Dashbord from './Pages/Employee/EmployeeHome.jsx';
import Attendance from './Pages/Employee/Attendance.jsx';
import Add from './Pages/Add.jsx';
import Salary from './Pages/Employee/Salary.jsx';
import Calendar from './Pages/Employee/Calendar.jsx';
import Sidebar from './Components/Sidebar';

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
        <Route path='/' element={<Login />} />

        {/* HR Role Routes */}
        {isAuthenticated && role === 'hr' && (
          <>
            <Route path='/hrhome' element={<HRDashboard />} />
            <Route path='/add' element={<Add />} />
          </>
        )}

        {/* Employee Role Routes inside layout with Sidebar */}
        {isAuthenticated && role === 'employee' && (
          <Route
            path='/*'
            element={
              <div className="flex">
                <Sidebar />
                <div className="flex-1">
                  <Routes>
                    <Route path='/home' element={<Home />} />
                    <Route path='/emhome' element={<Dashbord />} />
                    <Route path='/emsalary' element={<Salary />} />
                    <Route path='/emattendance' element={<Attendance />} />
                    <Route path='/emcalendar' element={<Calendar />} />
                    <Route path='/emprofile' element={<Calendar />} /> {/* Change to Profile.jsx if needed */}
                  </Routes>
                </div>
              </div>
            }
          />
        )}

        {/* Catch-all: redirect unauthorized users */}
        <Route path='*' element={<Navigate to='/' />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
