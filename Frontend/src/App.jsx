import React from 'react'
import { BrowserRouter  , Route , Routes } from 'react-router-dom'
import Login from './Pages/Login/Login'
import Home from './Pages/Home/Home'
import HRDashboard from './Pages/Admin/HrDashboard'

function App() {

  return (
    <>
    <BrowserRouter>
    <Routes>
    <Route path='/' element={<Login />} />
    <Route path='/home' element={<Home />} />
    <Route path='/hr' element={<HRDashboard />} />
    </Routes>
    </BrowserRouter>      

    </>
  )
}

export default App
