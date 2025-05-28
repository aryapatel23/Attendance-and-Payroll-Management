import React, { useState } from "react";
import { Menu, Users, PlusSquare, Calendar, DollarSign, Settings, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {logoutUser} from "../../Redux/Slice"

const Dashboard = () => {
  const [menuOpen, setMenuOpen] = useState(false);
      const dispatch = useDispatch();
      const navigate = useNavigate(); 
         const handleLogout = () => {
        dispatch(logoutUser());  // Dispatch Redux logout action
        localStorage.removeItem("token"); // Clear token from storage
        localStorage.removeItem("role"); // Clear role from storage
        navigate("/"); // Redirect to Login Page
      };

  const employees = [
    {
      date: "13/01",
      name: "Aisha Doe",
      role: "HR Manager",
      type: "Full-Time",
      status: "Present",
      checkIn: "09:00 AM",
      checkOut: "05:00 PM",
    },
    {
      date: "13/01",
      name: "Chukwuemeka",
      role: "Software Engineer",
      type: "Part-Time",
      status: "Absent",
      checkIn: "-",
      checkOut: "-",
    },
    {
      date: "13/01",
      name: "Suleiman",
      role: "Marketing Executive",
      type: "Full-Time",
      status: "Late",
      checkIn: "10:15 AM",
      checkOut: "05:00 PM",
    },
    {
      date: "13/01",
      name: "Olamide",
      role: "Financial Analyst",
      type: "Full-Time",
      status: "Present",
      checkIn: "09:00 AM",
      checkOut: "06:00 PM",
    },
    {
      date: "13/01",
      name: "Jide",
      role: "Project Manager",
      type: "Full-Time",
      status: "Present",
      checkIn: "09:00 AM",
      checkOut: "05:00 PM",
    },
    {
      date: "13/01",
      name: "Femi",
      role: "Sales Manager",
      type: "Full-Time",
      status: "Present",
      checkIn: "09:00 AM",
      checkOut: "07:00 PM",
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "Present": return "bg-green-100 text-green-600";
      case "Late": return "bg-yellow-100 text-yellow-600";
      case "Absent": return "bg-red-100 text-red-600";
      default: return "bg-gray-100 text-gray-600";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
      {/* Sidebar */}
      <div className={`fixed md:static top-0 left-0 w-full md:w-64 bg-white shadow-md md:h-auto z-20 ${menuOpen ? "block" : "hidden md:block"}`}>
        <div className="p-4 border-b flex items-center justify-between md:justify-start">
          <h1 className="text-xl font-bold text-indigo-600">Circle Soft</h1>
          <button onClick={() => setMenuOpen(false)} className="md:hidden">
            ✖
          </button>
        </div>
        <div className="p-4 border-b flex flex-col items-center md:items-start">
          <img src="https://i.pravatar.cc/100" alt="HR" className="w-16 h-16 rounded-full" />
          <h2 className="mt-2 text-sm font-medium">Gavano</h2>
          <p className="text-xs text-gray-500">HR Manager</p>
        </div>
        <nav className="p-4 space-y-4">
          <div className="flex items-center space-x-2 text-indigo-600 font-medium">
            <Users size={16} /> <span>Dashboard</span>
          </div>
          <div className="flex items-center space-x-2 text-gray-700">
            <Users size={16} /> <span>Employees</span>
          </div>
          <div className="flex items-center space-x-2 text-gray-700">
            <PlusSquare size={16} /> <span>Add Employee</span>
          </div>
          <div className="flex items-center space-x-2 text-gray-700">
            <DollarSign size={16} /> <span>Payroll System</span>
          </div>
          <div className="flex items-center space-x-2 text-gray-700">
            <Calendar size={16} /> <span>Calendar</span>
          </div>
          <div className="flex items-center space-x-2 text-gray-700">
            <User size={16} /> <span>Profile</span>
          </div>
          <div className="flex items-center space-x-2 text-gray-700">
            <Settings size={16} /> <span>Setting</span>
          </div>
                     <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold p-2 rounded transition duration-200"
                onClick={handleLogout}
              >
                Log out
              </button>
        </nav>
      </div>

      {/* Content */}
      <div className="flex-1 p-4 ">
        <div className="flex justify-between items-center mb-4">
          <button onClick={() => setMenuOpen(true)} className="md:hidden text-gray-700">
            <Menu size={24} />
          </button>
          <input
            type="text"
            placeholder="Search..."
            className="border rounded p-2 w-full md:w-1/3"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white shadow rounded p-4">
            <h3 className="text-sm text-gray-500">Total Employees</h3>
            <p className="text-2xl font-semibold">100</p>
          </div>
          <div className="bg-white shadow rounded p-4">
            <h3 className="text-sm text-gray-500">Present Employees</h3>
            <p className="text-2xl font-semibold text-green-600">90</p>
          </div>
          <div className="bg-white shadow rounded p-4">
            <h3 className="text-sm text-gray-500">Employees on Leave</h3>
            <p className="text-2xl font-semibold text-red-600">10</p>
          </div>
        </div>

        <div className="bg-white shadow rounded p-4">
          <h2 className="text-lg font-semibold mb-4">Employees Status</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="text-left text-gray-500 border-b">
                  <th className="p-2">Date</th>
                  <th className="p-2">Employee</th>
                  <th className="p-2">Role</th>
                  <th className="p-2">Employment Type</th>
                  <th className="p-2">Status</th>
                  <th className="p-2">Check In</th>
                  <th className="p-2">Check Out</th>
                </tr>
              </thead>
              <tbody>
                {employees.map((emp, idx) => (
                  <tr key={idx} className="border-b hover:bg-gray-50">
                    <td className="p-2">{emp.date}</td>
                    <td className="p-2">{emp.name}</td>
                    <td className="p-2">{emp.role}</td>
                    <td className="p-2">
                      <span className="px-2 py-1 text-xs rounded bg-indigo-100 text-indigo-600">
                        {emp.type}
                      </span>
                    </td>
                    <td className="p-2">
                      <span className={`px-2 py-1 text-xs rounded ${getStatusColor(emp.status)}`}>
                        {emp.status}
                      </span>
                    </td>
                    <td className="p-2">{emp.checkIn}</td>
                    <td className="p-2">{emp.checkOut}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
