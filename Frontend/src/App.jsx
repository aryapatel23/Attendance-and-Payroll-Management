import React from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Login from './Pages/Login/Login'
import Home from './Pages/Home/Home'
import HRDashboard from './Pages/Admin/HrDashboard'
import Deshbord from './Pages/Employe/Home.jsx'
import Add from './Pages/Add.jsx'

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
    {isAuthenticated && role==='employee' && <Route path='/home' element={<Home />} /> }
    {isAuthenticated && role==='hr' && <Route path='/hr' element={<HRDashboard />} />}
    <Route path='/add' element={<Add />} />
    <Route path='/emhome' element={<Deshbord/>}/>
    </Routes>
    </BrowserRouter>      

    </>
  )
}

export default App;
