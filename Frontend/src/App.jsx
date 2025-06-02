import React from 'react'
import { BrowserRouter  , Route , Routes } from 'react-router-dom'
import { useSelector } from "react-redux";
import { Navigate } from 'react-router-dom';


import Login from './Pages/Login/Login'
import Home from './Pages/Home/Home'
import HRDashboard from './Pages/Admin/HrDashboard'
import Dashbord from './Pages/Employee/EmployeeHome.jsx'
import Attendance from './Pages/Employee/Attendance.jsx'
import Add from './Pages/Add.jsx'
import Salary from './Pages/Employee/Salary.jsx';
import Calendar from './Pages/Employee/Calendar.jsx';
import Sidebar from './Components/Sidebar'
function App() {

    const isAuthenticated = localStorage.getItem("token");
  const role = (localStorage.getItem("role") || "").toLowerCase(); // 'student' or 'teacher'
  const token = useSelector((state) => state.auth.token);

    if (token === undefined) {
    return <div>Loading...</div>;
  }

  return (
    <>
    <BrowserRouter>
    <Routes>
    <Route path='/' element={<Login />} />
    {isAuthenticated && role==='employee' && 
    (  <Route
            path="/*"
            element={
              <div className="flex">
                {/* <Sidebar /> */}
                <div className="flex-1">
                  <Routes>
                    <Route path="/emhome" element={<Dashbord />} />
                    <Route path="/emsalary" element={<Salary />} />
                    <Route path="/emattendance" element={<Attendance />} />
                    <Route path="/emcalendar" element={<Calendar />} />
                     <Route path="/emprofile" element={<Calendar />} />
                  </Routes>
                </div>
        
              </div>
            }
          />)}
    {isAuthenticated && role==='hr' && <Route path='/hr' element={<HRDashboard />} />}
    <Route path='/add' element={<Add />} />
    {/* <Route path='/emhome' element={<Deshbord/>}/>
    <Route path='/emattendance' element={<Attendance/>}/>
    <Route path='/emsalary' element={<Salary/>}/>
    <Route path='/emcalendar' element={<Calendar/>}/> */}
    </Routes>
    </BrowserRouter>      

    </>
  )
}

export default App
