import React from 'react';
import Header from '../../Components/Header'; // Adjust path if needed
import Sidebar from '../../Components/Sidebar'; // Adjust path if needed
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import { Fingerprint } from 'lucide-react';

const data = [
  { name: 'Jan', Attendance: 24 },
  { name: 'Feb', Attendance: 27 },
  { name: 'Mar', Attendance: 17 },
  { name: 'Apr', Attendance: 20 },
  { name: 'May', Attendance: 23 },
  { name: 'Jun', Attendance: 0 },
  { name: 'Jul', Attendance: 0 },
  { name: 'Aug', Attendance: 0 },
  { name: 'Sep', Attendance: 0 },
  { name: 'Oct', Attendance: 0 },
  { name: 'Nov', Attendance: 0 },
  { name: 'Dec', Attendance: 0 },
];

const MainContent = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Header at the top */}
      <Header />

      {/* Content below header */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <Sidebar/>


        {/* Page Content */}
        <main className="flex-1 p-6 overflow-y-auto">
          {/* Page Title */}
          <h1 className="text-2xl font-semibold text-gray-800 mb-6">Attendance</h1>

          {/* Biometric Card */}
          <div className="bg-white rounded-2xl shadow-md p-6 flex justify-around items-center mb-8">
            <Fingerprint size={180}  className="text-purple-600"/>
            <div className="flex flex-col items-start">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                Give me your Biometric for today's attendance
              </h2>
              <button className="px-4 py-2 bg-white border border-gray-200 shadow-sm rounded-md text-purple-600 font-medium hover:shadow-md transition">
                Let's do it &rarr;
              </button>
            </div>
          </div>

          {/* Attendance Statistics */}
          <div className="bg-white rounded-2xl shadow-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-800">Attendance Statistics</h2>
              <div className="flex items-center gap-2">
                <span className="text-sm text-purple-600 font-semibold">Attendance</span>
                <select className="text-sm border border-gray-300 rounded-md px-2 py-1 focus:outline-none">
                  <option>This Year</option>
                  <option>This Month</option>
                </select>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={data}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="Attendance" fill="#7c3aed" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </main>
      </div>
    </div>
  );
};

export default MainContent;
