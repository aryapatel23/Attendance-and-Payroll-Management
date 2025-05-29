import React from 'react'
import { BrowserRouter  , Route , Routes } from 'react-router-dom'
import { useSelector } from "react-redux";


import Login from './Pages/Login/Login'
import Home from './Pages/Home/Home'
import HRDashboard from './Pages/Admin/HrDashboard'
import Deshbord from './Pages/Employee/Home.jsx'
import Attendance from './Pages/Employee/Attendance.jsx'
import Add from './Pages/Add.jsx'

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
    {/* <Route path='/' element={<Login />} />
    {isAuthenticated && role==='employee' && <Route path='/home' element={<Home />} /> }
    {isAuthenticated && role==='hr' && <Route path='/hr' element={<HRDashboard />} />}
    <Route path='/add' element={<Add />} /> */}
    <Route path='/emhome' element={<Deshbord/>}/>
    <Route path='/emattendance' element={<Attendance/>}/>
    </Routes>
    </BrowserRouter>      

    </>
  )
}

export default App
