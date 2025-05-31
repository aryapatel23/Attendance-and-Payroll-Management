import React, { useState } from "react";
import {
  Users,
  DollarSign,
  Calendar,
  Settings,
  User,
} from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../Redux/Slice";
import Header from "../../Components/Header";
import Sidebar from "../../Components/Sidebar";

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
        <Sidebar />

        {/* Main Content */}
        <div className="flex-1 p-6 space-y-6">
          {/* Page Title */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <h1 className="text-xl font-semibold">Dashboard</h1>
            <div className="flex gap-2">
              <button className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm shadow hover:bg-indigo-700 transition">
                + Buddy Punching
              </button>
              <button className="border px-4 py-2 rounded-md text-sm shadow hover:bg-gray-50 transition">
                Manager POV
              </button>
            </div>
          </div>

          {/* Welcome Message */}
          <div className="text-sm text-gray-700 bg-white p-4 rounded-md shadow">
            <span className="font-medium text-base">Good to see you, John 👋</span>
            <p className="mt-1 text-sm">You came 15 minutes early today.</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                title: "Total leave allowance",
                value: "34",
                note: "Paid 11 | Unpaid 4",
              },
              {
                title: "Total leave taken",
                value: "20",
                valueColor: "text-red-600",
                note: "Paid 62 | Unpaid 76",
              },
              {
                title: "Total leave available",
                value: "87",
                valueColor: "text-green-600",
                note: "Paid 50 | Unpaid 51",
              },
              {
                title: "Leave request pending",
                value: "122",
                valueColor: "text-indigo-600",
                note: "Paid 60 | Unpaid 53",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="bg-white p-5 rounded-lg shadow flex flex-col gap-1"
              >
                <h4 className="text-xs text-gray-500">{item.title}</h4>
                <p className={`text-xl font-bold ${item.valueColor || ""}`}>{
                  item.value
                }</p>
                <p className="text-xs text-gray-400">{item.note}</p>
              </div>
            ))}
          </div>

          {/* Announcements Table */}
          <div className="bg-white p-5 rounded-lg shadow overflow-x-auto">
            <h3 className="font-semibold mb-3">Announcements</h3>
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="text-gray-500 border-b">
                  <th className="text-left py-2 px-2">Title</th>
                  <th className="text-left py-2 px-2">Start date</th>
                  <th className="text-left py-2 px-2">End date</th>
                  <th className="text-left py-2 px-2">Description</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Scrum Master", "Dec 4, 2019 21:42", "Dec 7, 2019 23:26", "Corrected item alignment"],
                  ["Software Tester", "Dec 30, 2019 05:18", "Feb 2, 2019 19:28", "Embedded analytic scripts"],
                  ["Software Developer", "Dec 30, 2019 07:52", "Dec 4, 2019 21:42", "High resolution imagery option"],
                ].map(([title, start, end, desc], idx) => (
                  <tr key={idx} className="border-b">
                    <td className="py-2 px-2 whitespace-nowrap">{title}</td>
                    <td className="py-2 px-2 whitespace-nowrap">{start}</td>
                    <td className="py-2 px-2 whitespace-nowrap">{end}</td>
                    <td className="py-2 px-2 whitespace-nowrap">{desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Attendance Chart */}
          {/* Attendance Chart */}
          <div className="bg-white p-4 rounded shadow">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold">Attendance Statistics</h3>
              <select className="border text-sm px-2 py-1 rounded">
                <option>This Year</option>
                <option>This Month</option>
              </select>
            </div>

            {/* Chart */}
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={[
                  { name: "Jan", Attendance: 22 },
                  { name: "Feb", Attendance: 20 },
                  { name: "Mar", Attendance: 23 },
                  { name: "Apr", Attendance: 19 },
                  { name: "May", Attendance: 24 },
                  { name: "Jun", Attendance: 18 },
                  { name: "Jul", Attendance: 20 },
                  { name: "Aug", Attendance: 21 },
                  { name: "Sep", Attendance: 22 },
                  { name: "Oct", Attendance: 20 },
                  { name: "Nov", Attendance: 23 },
                  { name: "Dec", Attendance: 25 }
                ]}
              >
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="Attendance" fill="#4F46E5" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Dashboard;
