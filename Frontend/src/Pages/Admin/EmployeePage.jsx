import React, { useState,useEffect } from "react";
import { FaDownload, FaEnvelope, FaPhone, FaGlobe, FaCalendarAlt,FaRupeeSign,FaRegClock } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";
import { useParams } from "react-router-dom";

const months = ["April 2025", "May 2025"];

const rawAttendance = {
  "April 2025": [
    ["2025-04-01", "Present", "09:00", "18:00"],
    ["2025-04-02", "Present", "09:05", "18:05"],
    ["2025-04-03", "Leave", "-", "-"],
    ["2025-04-04", "Present", "09:10", "18:10"],
  ],
  "May 2025": [
    ["2025-05-01", "Present", "09:00", "18:00"],
    ["2025-05-02", "Absent", "-", "-"],
    ["2025-05-03", "Present", "09:15", "18:15"],
  ],
};

const salaryData = {
  "April 2025": { total: 40000, tds: 4000, spf: 2000, unpaidLeave: 2200, paid: 35800, status: "Paid" },
  "May 2025": { total: 42000, tds: 4200, spf: 2100, unpaidLeave: 0, paid: 35700, status: "Pending" },
};

const EmployeeDashboard = () => {
  const [tab, setTab] = useState("userinfo");
  const [attMonth, setAttMonth] = useState(months[0]);
  const [salMonth, setSalMonth] = useState(months[0]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
        <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
          <div className="flex flex-col lg:flex-row gap-6 h-[calc(100vh-64px)]">
            <Profile />
            <div className="flex-1 bg-white p-6 rounded-2xl shadow-md flex flex-col">
              <nav className="flex gap-4 border-b pb-3 mb-4 text-sm font-medium">
                {["userinfo", "attendance", "salary"].map((t) => (
                  <button
                    key={t}
                    className={`capitalize px-4 py-2 rounded-lg transition ${
                      tab === t ? "bg-indigo-100 text-indigo-600" : "hover:bg-gray-100"
                    }`}
                    onClick={() => setTab(t)}
                  >
                    {t.replace("info", " Info")}
                  </button>
                ))}
              </nav>

              <div className="flex-1 overflow-y-auto">
                {tab === "userinfo" && <InfoTab />}
                {tab === "attendance" && (
                  <AttendanceTab month={attMonth} setMonth={setAttMonth} />
                )}
                {tab === "salary" && <SalaryTab month={salMonth} setMonth={setSalMonth} />}
              </div>
            </div>
          </div>
        </div>
    </div>
  );
};

const Profile = () => (
 <div className="bg-white w-full lg:w-1/5 rounded-2xl shadow-md p-6 text-sm text-gray-700 space-y-6">
  {/* Profile Header */}
  <div className="flex flex-col items-center text-center">
      <img src="https://i.pravatar.cc/100?img=56" alt="Employee" className="w-24 h-24 rounded-full mb-4 shadow" />
      <h3 className="text-lg font-semibold">Jhon Doe</h3>
      <p className="text-sm text-gray-500">UX Designer</p>
    </div>

  {/* Info Section */}
  <div>
    <h4 className="text-xs font-semibold text-gray-500 mb-3">Info</h4>
    <div className="space-y-4">
      <div className="flex items-start gap-3">
        <div className="p-2 bg-gray-100 rounded-md">
        <FaEnvelope className="text-gray-500 mt-1" />
        </div>
        <div>
          <p className="text-sm font-medium">Admin & HRM</p>
          <p className="text-xs text-gray-400">Department</p>
        </div>
      </div>

      <div className="flex items-start gap-3">
        <div className="p-2 bg-gray-100 rounded-md">
        <FaRupeeSign className="text-gray-500 mt-1" />
        </div>
        <div>
          <p className="text-sm font-medium text-green-600">₹40,000</p>
          <p className="text-xs text-gray-400">Salary</p>
        </div>
      </div>

      <div className="flex items-start gap-3">
        <div className="p-2 bg-gray-100 rounded-md">
        <FaRegClock  className="text-gray-500 mt-1" />
        </div>
        <div>
          <p className="text-sm font-medium">Regular</p>
          <p className="text-xs text-gray-400">Work Shift</p>
        </div>
      </div>

      <div className="flex items-start gap-3">
        <div className="p-2 bg-gray-100 rounded-md">
          <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" strokeWidth="2"
               viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round"
               d="M8 7V3m8 4V3m-9 8h10m-10 4h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
        </div>
        <div>
          <p className="text-sm font-medium">12 February 2023</p>
          <p className="text-xs text-gray-400">Joining Date</p>
        </div>
      </div>
    </div>
  </div>

  {/* Contact Section */}
  <div>
    <h4 className="text-xs font-semibold text-gray-500 mb-3">Contact</h4>
    <div className="space-y-3">
      <div className="flex items-start gap-3">
        <FaEnvelope className="text-gray-500 mt-1" />
        <div>
          <p className="text-xs text-gray-500">Email</p>
          <p className="text-sm">alwissuryatmaja@gmail.com</p>
        </div>
      </div>

      <div className="flex items-start gap-3">
        <FaPhone className="text-gray-500 mt-1" />
        <div>
          <p className="text-xs text-gray-500">Phone</p>
          <p className="text-sm">+6282283386756</p>
        </div>
      </div>

      <div className="flex items-start gap-3">
        <FaGlobe className="text-gray-500 mt-1" />
        <div>
          <p className="text-xs text-gray-500">Website</p>
          <a href="https://bit.ly/3uOJF79" className="text-sm text-blue-600 underline">
            https://bit.ly/3uOJF79
          </a>
        </div>
      </div>
    </div>
  </div>
</div>

);

function InfoTab() {      
const {id}=useParams();
console.log(id)
  const [employee,setEmployee]=useState({})

useEffect(()=>{
 const FetchEmployee= async()=>{
  try{
  
    
    const response= await fetch(`http://localhost:5500/api/users/${id}`);
      if(!response.ok){
            throw new Error("Failed to fetch employees");
      }
       const data=await response.json()
       setEmployee(data.user)
         
  }catch(error){
  console.error("Error fetching employees:", error);
  }
 };
FetchEmployee();
  
},[id])
console.log(employee)
  return (
<div className="space-y-6 text-gray-700">
  <h3 className="text-xl font-semibold border-b pb-2">Personal & Official Information</h3>

  {/* Personal Info */}
  <div>
    <h4 className="text-md font-semibold mb-2 text-indigo-600">👤 Personal Details</h4>
    <div className="grid sm:grid-cols-2 gap-x-8 gap-y-3 text-sm">
      <p><span className="font-medium">Full Name:</span> {employee.username}</p>
      <p><span className="font-medium">Date of Birth:</span> 20 May 1997</p>
      <p><span className="font-medium">Gender:</span> Male</p>
      <p><span className="font-medium">Blood Group:</span> B+</p>
      <p><span className="font-medium">Marital Status:</span> Single</p>
      
    </div>
  </div>

  {/* Contact Info */}
  <div>
    <h4 className="text-md font-semibold mb-2 text-indigo-600">📞 Contact Information</h4>
    <div className="grid sm:grid-cols-2 gap-x-8 gap-y-3 text-sm">
      <p><span className="font-medium">Phone:</span> {employee.mobile}</p>
      <p><span className="font-medium">Email:</span> {employee.email}</p>
      <p className="col-span-2"><span className="font-medium">Address:</span>{employee.address}</p>
      
    </div>
  </div>

  {/* Job Info */}
  <div>
    <h4 className="text-md font-semibold mb-2 text-indigo-600">💼 Job Details</h4>
    <div className="grid sm:grid-cols-2 gap-x-8 gap-y-3 text-sm">
      <p><span className="font-medium">Employee ID:</span>{employee.user_id}</p>
      <p><span className="font-medium">Department:</span> Frontend</p>
      <p><span className="font-medium">Designation:</span> {employee.employee_role}</p>
      <p><span className="font-medium">Joining Date:</span> 12 Feb 2023</p>
    </div>
  </div>

  {/* Emergency Info */}
  <div>
    <h4 className="text-md font-semibold mb-2 text-indigo-600">🚨 Emergency Contact</h4>
    <div className="grid sm:grid-cols-2 gap-x-8 gap-y-3 text-sm">
      <p><span className="font-medium">Name:</span> Rahul Doe</p>
      <p><span className="font-medium">Contact:</span> +91 9999999999</p>
    </div>
  </div>
</div>

  );
}

function AttendanceTab({ month, setMonth }) {
  const data = rawAttendance[month] || [];
  const total = data.length;
  const present = data.filter((r) => r[1] === "Present").length;
  const leave = data.filter((r) => r[1] === "Leave").length;
  const absent = data.filter((r) => r[1] === "Absent").length;

  const chartData = {
    labels: ["Present", "Leave", "Absent"],
    datasets: [{ label: "Days", data: [present, leave, absent], backgroundColor: ["#22c55e","#f97316","#ef4444"] }],
  };

  return (
    <div className="space-y-4 text-gray-700">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Attendance - {month}</h3>
        <select
          value={month}
          onChange={(e) => setMonth(e.target.value)}
          className="border px-2 py-1 rounded flex items-center"
        >
          {months.map((m) => (
            <option key={m}>{m}</option>
          ))}
        </select>
      </div>

      <Bar data={chartData} />

      <table className="w-full text-sm border rounded-lg overflow-hidden">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3">Date</th>
            <th className="p-3">Status</th>
            <th className="p-3">Check-In</th>
            <th className="p-3">Check-Out</th>
          </tr>
        </thead>
        <tbody>
          {data.map((r, i) => (
            <tr key={i} className="border-b">
              <td className="p-3">{r[0]}</td>
              <td className={`p-3 ${r[1] === "Leave" ? "text-orange-600" : r[1] === "Absent" ? "text-red-600" : "text-green-600"}`}>
                {r[1]}
              </td>
              <td className="p-3">{r[2]}</td>
              <td className="p-3">{r[3]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function SalaryTab({ month, setMonth }) {
  const s = salaryData[month] || {};
  return (
    <div className="text-gray-700 space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Salary Details - {month}</h3>
        <select value={month} onChange={(e) => setMonth(e.target.value)} className="border px-2 py-1 rounded">
          {months.map((m) => (
            <option key={m}>{m}</option>
          ))}
        </select>
      </div>

      <table className="w-full text-sm border rounded-xl overflow-hidden mb-4">
        <tbody>
          <tr className="border-b"><td className="p-3 font-medium">Total Salary</td><td className="p-3 text-right">₹{s.total}</td></tr>
          <tr className="border-b text-red-600"><td className="p-3">TDS (10%)</td><td className="p-3 text-right">- ₹{s.tds}</td></tr>
          <tr className="border-b text-red-600"><td className="p-3">SPF Fund (5%)</td><td className="p-3 text-right">- ₹{s.spf}</td></tr>
          <tr className="border-b text-red-600"><td className="p-3">Unpaid Leave</td><td className="p-3 text-right">- ₹{s.unpaidLeave}</td></tr>
          <tr className="border-b font-bold bg-gray-50"><td className="p-3">Total Paid</td><td className="p-3 text-right">₹{s.paid}</td></tr>
          <tr className="bg-green-50 font-semibold"><td className="p-3">Status</td><td className="p-3 text-right">{s.status}</td></tr>
        </tbody>
      </table>

      <div className="flex justify-end">
        <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm flex items-center gap-2 hover:bg-indigo-700">
          <FaDownload /> Download Slip
        </button>
      </div>
    </div>
  );
}

export default EmployeeDashboard;
