import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter , Route , Router } from 'react-router-dom'
import Login from './Pages/Login/Login'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      
      
     <Login/>
    </>
  )
}

export default App
