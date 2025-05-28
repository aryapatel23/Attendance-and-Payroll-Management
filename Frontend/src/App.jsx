import React from 'react'
import { BrowserRouter  , Route , Routes } from 'react-router-dom'
import Login from './Pages/Login/Login'
import Home from './Pages/Home/Home'
import Admin from './Pages/Admin/admin'

function App() {

  return (
    <>
    <BrowserRouter>
    <Routes>
    <Route path='/' element={<Login />} />
    <Route path='/home' element={<Home />} />
    <Route path='/admin' element={<Admin />} />
    </Routes>
    </BrowserRouter>      

    </>
  )
}

export default App
