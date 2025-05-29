import React from 'react'
import {
  Users,
  DollarSign,
  Calendar,
  Settings,
  User,
} from "lucide-react";

const Sidebar = () => {

    
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
              <div className="flex items-center gap-3 p-2 rounded-lg bg-indigo-100 text-indigo-600 font-semibold">
                <Users size={18} /> <span>Dashboard</span>
              </div>
              <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 transition">
                <Users size={18} /> <span>Attendance</span>
              </div>
              <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 transition">
                <DollarSign size={18} /> <span>Salary</span>
              </div>
              <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 transition">
                <Calendar size={18} /> <span>Calendar</span>
              </div>
              <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 transition">
                <User size={18} /> <span>Profile</span>
              </div>
              <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 transition">
                <Settings size={18} /> <span>Settings</span>
              </div>
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
