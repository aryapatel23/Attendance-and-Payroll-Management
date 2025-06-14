import React, { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { loginUser } from './Redux/Slice.jsx';

import Login from './Pages/Login/Login';
import Home from './Pages/Home/Home';
import HRDashboard from './Pages/Admin/HrDashboard';
import Deshbord from './Pages/Employee/EmployeeHome.jsx';
import Attendance from './Pages/Employee/Attendance.jsx';
import Add from './Pages/Add.jsx';
import Employees from './Pages/Admin/Employees.jsx';
import Salary from './Pages/Employee/Salary.jsx';
import Calendar from './Pages/Employee/Calendar.jsx';
import AddEmployee from './Pages/Admin/AddEmployee.jsx';
import PayrollSystem from './Pages/Admin/Payrollsystem.jsx';
import HRCalendar from './Pages/Admin/HRCalendar.jsx';
import AttendanceNew from './Components/attendance.jsx';

function App() {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const user = useSelector((state) => state.auth.user);
  const role = user?.role?.toLowerCase();
  const isAuthenticated = !!token;

  // Hydrate Redux on first load
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem("token");
    if (user && token) {
      dispatch(loginUser({ user, token }));
    }
  }, [dispatch]);

  // Optional: loading fallback
  // if (token === undefined) return <div>Loading...</div>;
  // console.log(token, "token in app.jsx");

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />
        `{isAuthenticated && role === 'employee' && (
          <>
            <Route path='/emhome' element={<Deshbord />} />
            <Route path='/emattendance' element={<Attendance />} />
            <Route path='/emsalary' element={<Salary />} />
            <Route path='/emcalendar' element={<Calendar />} />
            <Route path='/attendance' element={<AttendanceNew />} />
          </>
        )}
        {isAuthenticated && role === 'hr' && (
          <>
            <Route path='/hrhome' element={<HRDashboard />} />
            <Route path='/hremployees' element={<Employees />} />
            <Route path='/hraddemployee' element={<AddEmployee />} />
            <Route path='/hrpayrollsystem' element={<PayrollSystem />} />
            <Route path='/hrcalendar' element={<HRCalendar />} />
          </>
        )}
        <Route path='/add' element={<Add />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

