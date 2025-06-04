import React from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Login from './Pages/Login/Login'
import Home from './Pages/Home/Home'
import HRDashboard from './Pages/Admin/HrDashboard'
import Deshbord from './Pages/Employee/EmployeeHome.jsx'
import Attendance from './Pages/Employee/Attendance.jsx'
import Add from './Pages/Add.jsx'
import Employees from './Pages/Admin/Employees.jsx';
import Salary from './Pages/Employee/Salary.jsx';
import Calendar from './Pages/Employee/Calendar.jsx';
import AddEmployee from './Pages/Admin/AddEmployee.jsx';
import PayrollSystem from './Pages/Admin/Payrollsystem.jsx';

function App() {
  const isAuthenticated = localStorage.getItem('token');
  const role = (localStorage.getItem('role') || '').toLowerCase();
  const token = useSelector((state) => state.auth.token);

  if (token === undefined) {
    return <div>Loading...</div>;
  }

  return (
    <>
    <BrowserRouter>
    <Routes>
    <Route path='/' element={<Login />} />
    {isAuthenticated && role==='employee' && <Route path='/emhome' element={<Deshbord />} /> }
    {isAuthenticated && role==='employee' && <Route path='/emattendance' element={<Attendance />} /> }
    {isAuthenticated && role==='employee' && <Route path='/emsalary' element={<Salary />} /> }
    {isAuthenticated && role==='employee' && <Route path='/emcalendar' element={<Calendar />} /> }
    {isAuthenticated && role==='hr' && <Route path='/hrhome' element={<HRDashboard />} />}
    {isAuthenticated && role==='hr' && <Route path='/hremployees' element={<Employees/>} />}
    {isAuthenticated && role==='hr' && <Route path='/hraddemployee' element={<AddEmployee/>} />}
    {isAuthenticated && role==='hr' && <Route path='/hrpayrollsystem' element={<PayrollSystem/>} />}
    <Route path='/add' element={<Add />} />

    </Routes>
    </BrowserRouter>      

    </>
  )
}

export default App;
