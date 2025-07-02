import React, { useState,useEffect } from "react";
import { FaDownload, FaEnvelope, FaPhone, FaGlobe, FaCalendarAlt,FaRupeeSign,FaRegClock } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import {cacheUser} from '../../Redux/Slice'
import jsPDF from 'jspdf'
import {
  ChevronDown,
  ChevronUp,
  Download,
  IndianRupee,
  Banknote,
  Gift,
  Minus,
} from "lucide-react";
import { Transition } from "@headlessui/react";

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
                {tab === "salary" && <Salary/>}
              </div>
            </div>
          </div>
        </div>
    </div>
  );
};

const Profile = () =>{
  const {id}=useParams();      
  console.log(id)
  const dispatch = useDispatch();
  const usersdata = useSelector((state) => state.auth.usersdata);
  console.log(usersdata)
  const [employee,setEmployee]=useState(null)
console.log("1. Profile rendered");
useEffect(()=>{
if (usersdata[id]){
  console.log("Loaded from cache",usersdata)
    console.log("2. Profile useEffect triggered");
  setEmployee(usersdata[id])
}else{
const FetchEmployee= async()=>{
  try{
  
    
    const response= await fetch(`https://attendance-and-payroll-management.onrender.com/api/users/${id}`);
    
      if(!response.ok){
            throw new Error("Failed to fetch employees");
      }
       const data=await response.json()
       setEmployee(data.user)
       dispatch(cacheUser({ id, userData: data.user }));
       console.log('Fetching the data from api')
         
  }catch(error){
  console.error("Error fetching employees:", error);
  }
}
FetchEmployee();
};
},[id,dispatch,cacheUser])

 if (!employee) return <p>Loading...</p>;
console.log(employee)

  return (
 <div className="bg-white w-full lg:w-1/5 rounded-2xl shadow-md p-6 text-sm text-gray-700 space-y-6">
  {/* Profile Header */}
  <div className="flex flex-col items-center text-center">
      <img src="https://i.pravatar.cc/100?img=56" alt="Employee" className="w-24 h-24 rounded-full mb-4 shadow" />
      <h3 className="text-lg font-semibold">{employee.username}</h3>
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

)};

function InfoTab() {
  const { id } = useParams();
  const userFromStore = useSelector((state) => state.auth.usersdata[id]);
  const [employee, setEmployee] = useState(null);
console.log("3. InfoTab rendered");
  useEffect(() => {
    if (userFromStore) {
      setEmployee(userFromStore);
      console.log("Fatching data from cach in info tab")
        console.log("4. InfoTab useEffect triggered (cache check)");
    }
  }, [userFromStore]);

  if (!employee) return <p>Loading...</p>;

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
          <p><span className="font-medium">Phone:</span> {employee.phone || 'N/A'}</p>
          <p><span className="font-medium">Email:</span> {employee.email || 'N/A'}</p>
          <p className="col-span-2"><span className="font-medium">Address:</span> {employee.address || 'N/A'}</p>
        </div>
      </div>

      {/* Job Info */}
      <div>
        <h4 className="text-md font-semibold mb-2 text-indigo-600">💼 Job Details</h4>
        <div className="grid sm:grid-cols-2 gap-x-8 gap-y-3 text-sm">
          <p><span className="font-medium">Employee ID:</span> {employee.user_id}</p>
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

const Salary = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYear, setSelectedYear] = useState(""); 
  const [data,setData]=useState([])

  const user = useSelector((state) => state.auth.user);

const {id}=useParams()
const user_id=id

useEffect(() => {
  const fetchSalary = async () => {
    if (!selectedMonth || !selectedYear || !user_id) {
      console.warn("Missing month/year/user_id");
      return;
    }

    try {
      const res = await fetch("https://attendance-and-payroll-management.onrender.com/api/Generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          month: `${selectedYear}-${selectedMonth}`,
          user_id,
        }),
      });

      const result = await res.json();
      if (result) {
        setData([result]); // ✅ wrap as array
      } else {
        setData([]);
      }
    } catch (err) {
      console.error("Error fetching salary data:", err);
    }
  };

  fetchSalary();
}, [selectedMonth, selectedYear, user_id]);


  const toggleOpen = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const months = [
    "01", "02", "03", "04", "05", "06",
    "07", "08", "09", "10", "11", "12",
  ];

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 10 }, (_, i) => currentYear - i);

  const downloadPDF = (item) => {
  const doc = new jsPDF();

  doc.setFontSize(16);
  doc.text(`Salary Slip ${item.month}`, 80, 15);

  doc.setFontSize(12);
  doc.text(`Employee ID: ${item.employee_id}`, 10, 30);
  doc.text(`Employee Name: ${item.employee_name}`, 10, 40);


  doc.text(`Basic Salary: ₹${item.basic_salary}`, 10, 80);
  doc.text(`Gross Salary: ₹${item.salary_breakdown.gross_salary}`, 10, 90);
  doc.text(`Net Salary: ₹${item.salary_breakdown.net_salary.toFixed(2)}`, 10, 100);



  doc.save(`SalarySlip-${item.month}.pdf`);
};

  return (
    <div className="min-h-screen flex flex-col ">
      <div className="flex-1 p-6 overflow-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Salary info</h1>

        {/* Filter Section */}
        <div className="flex flex-wrap gap-4 mb-6">
          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="px-4 py-2 rounded-lg border border-gray-300 bg-white shadow-sm focus:ring-2 focus:ring-violet-500"
          >
            <option value="">Select Month</option>
            {months.map((month) => (
              <option key={month} value={month}>
                {month}
              </option>
            ))}
          </select>

          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="px-4 py-2 rounded-lg border border-gray-300 bg-white shadow-sm focus:ring-2 focus:ring-violet-500"
          >
            <option value="">Select Year</option>
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
        {console.log('Selected month and year is',selectedMonth,selectedYear)}

        {/* Salary Slips */}
        <div className="space-y-6">
          {data.length > 0 ? (
            data.map((item, index) => (
              <div
                key={index}
                className="bg-white/80 backdrop-blur-md rounded-3xl shadow-xl transition hover:shadow-2xl border border-gray-200"
              >
                <div
                  className="flex justify-between items-center px-6 py-5 cursor-pointer"
                  onClick={() => toggleOpen(index)}
                >
                  <div className="flex items-center space-x-4">
                    <div className="bg-violet-100 p-3 rounded-xl shadow-sm">
                      <Banknote className="w-6 h-6 text-violet-600" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-lg font-semibold text-gray-900">
                        {item.month}
                      </span>
                      <span className="text-sm text-gray-500">
                        Salary Statement
                      </span>
                    </div>
                  </div>
              
                  <div className="flex items-center space-x-4">
                    <span className="text-xl font-bold text-gray-800">
                      {(Number(item.salary_breakdown?.net_salary) || 0).toFixed(2)}
                    </span>
                 <button
  onClick={() => downloadPDF(item)}
  className="bg-violet-600 text-white text-sm px-4 py-2 rounded-full shadow-md hover:bg-violet-700 transition flex items-center gap-2"
>
  <Download className="w-4 h-4" />
  Download
</button>
                    {openIndex === index ? (
                      <ChevronUp className="w-5 h-5 text-gray-600" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-600" />
                    )}
                  </div>
                </div>

                <Transition
                  show={openIndex === index}
                  enter="transition-all duration-300 ease-out"
                  enterFrom="max-h-0 opacity-0"
                  enterTo="max-h-screen opacity-100"
                  leave="transition-all duration-200 ease-in"
                  leaveFrom="max-h-screen opacity-100"
                  leaveTo="max-h-0 opacity-0"
                >
                  <div className="bg-gray-50 px-6 pb-6 pt-2 rounded-b-3xl">
                    <div className="space-y-4 text-gray-700 text-sm">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2 font-medium">
                          <Banknote className="text-green-600 w-4 h-4" />
                          Gross Salary
                        </div>
                        <div className="text-right font-medium">₹{item.basic_salary}</div>
                      </div>

                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <IndianRupee className="text-purple-600 w-4 h-4" />
                          PF (5%)
                        </div>
                        <div>{item.deductions.pf_amount}</div>
                      </div>

                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <Minus className="text-red-500 w-4 h-4" />
                          Tax Slab (10%)
                        </div>
                        <div>{item.deductions.tax_amount}</div>
                      </div>

                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <Gift className="text-blue-500 w-4 h-4" />
                          Leave Deductions
                        </div>
                        <div>{(Number(item.deductions?.leave_deduction) || 0).toFixed(2)}</div>
                      </div>

                      <hr className="border-dashed border-gray-400 my-2" />

                      <div className="flex justify-between items-center font-bold text-gray-900 text-base">
                        <div>Total Salary</div>
                        <div>{(Number(item.salary_breakdown?.net_salary) || 0).toFixed(2)}</div>
                      </div>
                    </div>
                  </div>
                </Transition>
              </div>
            ))
          ) : (
            <div className="text-center text-gray-500 text-sm">
              No salary slip found for the selected period.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmployeeDashboard;
