import React, { useState } from "react";
import {
  Users,
  DollarSign,
  Calendar,
  Settings,
  User,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../Redux/Slice";
import Header from "../../Components/Header";

const Dashboard = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logoutUser());
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Header at the top */}
      <Header />

      {/* Content below header */}
      <div className="flex flex-1">
        {/* Sidebar */}
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


        {/* Main Content */}
        <div className="flex-1 p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-xl font-semibold">Dashboard</h1>
            <div className="flex items-center gap-2">
              <button className="bg-indigo-600 text-white px-3 py-1 rounded text-sm">
                + Buddy Punching
              </button>
              <button className="border px-3 py-1 rounded text-sm">
                Manager POV
              </button>
            </div>
          </div>

          <div className="mb-4 text-sm text-gray-600">
            <span className="font-medium">Good to see you, John 👋</span>
            <p>You came 15 minutes early today.</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-white p-4 rounded shadow">
              <h4 className="text-xs text-gray-500 mb-1">
                Total leave allowance
              </h4>
              <p className="text-xl font-bold">34</p>
              <p className="text-xs text-gray-400">Paid 11 | Unpaid 4</p>
            </div>
            <div className="bg-white p-4 rounded shadow">
              <h4 className="text-xs text-gray-500 mb-1">
                Total leave taken
              </h4>
              <p className="text-xl font-bold text-red-600">20</p>
              <p className="text-xs text-gray-400">Paid 62 | Unpaid 76</p>
            </div>
            <div className="bg-white p-4 rounded shadow">
              <h4 className="text-xs text-gray-500 mb-1">
                Total leave available
              </h4>
              <p className="text-xl font-bold text-green-600">87</p>
              <p className="text-xs text-gray-400">Paid 50 | Unpaid 51</p>
            </div>
            <div className="bg-white p-4 rounded shadow">
              <h4 className="text-xs text-gray-500 mb-1">
                Leave request pending
              </h4>
              <p className="text-xl font-bold text-indigo-600">122</p>
              <p className="text-xs text-gray-400">Paid 60 | Unpaid 53</p>
            </div>
          </div>

          {/* Announcements Table */}
          <div className="bg-white p-4 rounded shadow mb-6">
            <h3 className="font-semibold mb-2">Announcements</h3>
            <table className="w-full text-sm">
              <thead>
                <tr className="text-gray-500 border-b">
                  <th className="text-left py-1">Title</th>
                  <th className="text-left py-1">Start date</th>
                  <th className="text-left py-1">End date</th>
                  <th className="text-left py-1">Description</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="py-1">Scrum Master</td>
                  <td>Dec 4, 2019 21:42</td>
                  <td>Dec 7, 2019 23:26</td>
                  <td>Corrected item alignment</td>
                </tr>
                <tr className="border-b">
                  <td className="py-1">Software Tester</td>
                  <td>Dec 30, 2019 05:18</td>
                  <td>Feb 2, 2019 19:28</td>
                  <td>Embedded analytic scripts</td>
                </tr>
                <tr>
                  <td className="py-1">Software Developer</td>
                  <td>Dec 30, 2019 07:52</td>
                  <td>Dec 4, 2019 21:42</td>
                  <td>High resolution imagery option</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Attendance Chart */}
          <div className="bg-white p-4 rounded shadow">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-semibold">Attendance Statistics</h3>
              <select className="border text-sm px-2 py-1 rounded">
                <option>This Year</option>
                <option>This Month</option>
              </select>
            </div>
            <div className="grid grid-cols-12 gap-2 text-center text-xs text-gray-600">
              {[
                "Jan",
                "Feb",
                "Mar",
                "Apr",
                "May",
                "Jun",
                "Jul",
                "Aug",
                "Sep",
                "Oct",
                "Nov",
                "Dec",
              ].map((month, idx) => (
                <div key={idx} className="flex flex-col items-center">
                  <div
                    className={`h-${idx < 5 ? 24 - idx * 4 : 4} bg-indigo-600 w-4 rounded-t`}
                  ></div>
                  <span>{month}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
