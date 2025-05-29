import React from 'react'
import {
  Users,
  DollarSign,
  Calendar,
  Settings,
  User,
} from "lucide-react";
import { Navigate, useNavigate } from 'react-router-dom';

const Sidebar = () => {
    const navigate = useNavigate();
    
      const handleLogout = () => {
        dispatch(logoutUser());
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        navigate("/");
      };
      
  return (
    <div className="w-64 bg-white text-gray-800 flex flex-col justify-between  shadow-sm  md:flex">
          {/* Profile Section */}
          <div className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <img
                src="https://i.pravatar.cc/100"
                alt="Profile"
                className="w-14 h-14 rounded-full border"
              />
              <div>
                <h2 className="text-sm font-semibold">John</h2>
                <p className="text-xs text-gray-500">Front-end Developer</p>
              </div>
            </div>

            {/* Navigation Menu */}
           <nav className="space-y-3">
          <button
            onClick={() => navigate('/emhome')}
            className="flex items-center gap-3 p-2 rounded-lg bg-indigo-100 text-indigo-600 font-semibold w-full text-left"
          >
            <Users size={18} /> <span>Dashboard</span>
          </button>
          <button
            onClick={() => navigate('/emattendance')}
            className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 transition w-full text-left"
          >
            <Users size={18} /> <span>Attendance</span>
          </button>
          <button
            onClick={() => Navigate('/salary')}
            className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 transition w-full text-left"
          >
            <DollarSign size={18} /> <span>Salary</span>
          </button>
         

              <button 
              onClick={() => Navigate('/salary')}
              className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 transition w-full text-left">
                <Calendar size={18} /> <span>Calendar</span>
              </button>
              <button 
              onClick={() => Navigate('/salary')}
              className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 transition w-full text-left">
                <User size={18} /> <span>Profile</span>
              </button>
              <button
              onClick={() => Navigate('/salary')}
              className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 transition w-full text-left">
                <Settings size={18} /> <span>Settings</span>
              </button>
            </nav>
          </div>

          {/* Logout Button */}
          <div className="p-6">
            <button
              onClick={handleLogout}
              className="w-full bg-red-500 hover:bg-red-600 text-white font-medium py-2 rounded-lg"
            >
              Log out
            </button>
          </div>
        </div>


  )
}

export default Sidebar
