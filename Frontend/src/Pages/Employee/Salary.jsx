// import React, { useState } from "react";
// import Header from "../../Components/Header";
// import Sidebar from "../../Components/Sidebar";

// const Salary = () => {
//   const [month, setmonth] = useState("May 2025");

//   const salaryData = [
//     {
//       month: "May 2025",
//       basePay: "₹40,000",
//       bonus: "₹5,000",
//       deductions: "₹2,000",
//       netPay: "₹43,000",
//       status: "Paid",
//     },
//     {
//       month: "April 2025",
//       basePay: "₹40,000",
//       bonus: "₹3,000",
//       deductions: "₹1,000",
//       netPay: "₹42,000",
//       status: "Paid",
//     },
//   ];

//   return (
//     <div className="min-h-screen flex flex-col">
//       <Header />
//       <div className="flex flex-1 overflow-hidden">
//         <Sidebar />
//         <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-gray-50">
//           {/* Title */}
//           <div className="flex justify-between items-center">
//             <h1 className="text-xl font-semibold">Salary Overview</h1>
//             <select
//               className="border border-gray-300 px-3 py-2 rounded-md text-sm"
//               value={month}
//               onChange={(e) => setmonth(e.target.value)}
//             >
//               {salaryData.map((data, idx) => (
//                 <option key={idx} value={data.month}>
//                   {data.month}
//                 </option>
//               ))}
//             </select>
//           </div>

//           {/* Summary Cards */}
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
//             {salaryData
//               .find((data) => data.month === month) &&
//               (() => {
//                 const current = salaryData.find((data) => data.month === month);
//                 return (
//                   <>
//                     <div className="bg-white p-4 rounded shadow">
//                       <h4 className="text-sm text-gray-500">Base Pay</h4>
//                       <p className="text-xl font-bold">{current.basePay}</p>
//                     </div>
//                     <div className="bg-white p-4 rounded shadow">
//                       <h4 className="text-sm text-gray-500">Bonus</h4>
//                       <p className="text-xl font-bold text-green-600">{current.bonus}</p>
//                     </div>
//                     <div className="bg-white p-4 rounded shadow">
//                       <h4 className="text-sm text-gray-500">Deductions</h4>
//                       <p className="text-xl font-bold text-red-600">{current.deductions}</p>
//                     </div>
//                     <div className="bg-white p-4 rounded shadow">
//                       <h4 className="text-sm text-gray-500">Net Pay</h4>
//                       <p className="text-xl font-bold text-indigo-600">{current.netPay}</p>
//                     </div>
//                   </>
//                 );
//               })()}
//           </div>

//           {/* Salary History Table */}
//           <div className="bg-white p-4 rounded shadow">
//             <h3 className="font-semibold text-lg mb-4 text-gray-800">Salary History</h3>
//             <div className="overflow-x-auto">
//               <table className="min-w-full text-sm text-left text-gray-600">
//                 <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
//                   <tr>
//                     <th className="px-4 py-3">month</th>
//                     <th className="px-4 py-3">Base Pay</th>
//                     <th className="px-4 py-3">Bonus</th>
//                     <th className="px-4 py-3">Deductions</th>
//                     <th className="px-4 py-3">Net Pay</th>
//                     <th className="px-4 py-3">Status</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {salaryData.map((item, idx) => (
//                     <tr
//                       key={idx}
//                       className="border-b hover:bg-gray-50 transition duration-200"
//                     >
//                       <td className="px-4 py-3 font-medium text-gray-800">{item.month}</td>
//                       <td className="px-4 py-3">{item.basePay}</td>
//                       <td className="px-4 py-3">{item.bonus}</td>
//                       <td className="px-4 py-3">{item.deductions}</td>
//                       <td className="px-4 py-3 font-semibold text-indigo-600">
//                         {item.netPay}
//                       </td>
//                       <td className="px-4 py-3">
//                         <span
//                           className={`px-2 py-1 rounded text-xs font-medium ${
//                             item.status === "Paid"
//                               ? "bg-green-100 text-green-700"
//                               : "bg-yellow-100 text-yellow-700"
//                           }`}
//                         >
//                           {item.status}
//                         </span>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </div>

//         </div>
//       </div>
//     </div>
//   );
// };

// export default Salary;




import React, { useState,useEffect } from "react";
import { useSelector } from 'react-redux';
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

const Salary = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYear, setSelectedYear] = useState(""); 
  const [data,setData]=useState([])

  const user = useSelector((state) => state.auth.user);

const user_id=user?.id
console.log(user_id)

useEffect(() => {
  const fetchSalary = async () => {
    if (!selectedMonth || !selectedYear || !user_id) {
      console.warn("Missing month/year/user_id");
      return;
    }

    try {
      const res = await fetch("http://localhost:5500/api/Generate", {
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
console.log("recieve data is",data)

  const toggleOpen = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const months = [
    "01", "02", "03", "04", "05", "06",
    "07", "08", "09", "10", "11", "12",
  ];

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 10 }, (_, i) => currentYear - i);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#f5f7fa] to-[#e4ecf7]">
      <div className="flex-1 p-6 overflow-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Salary</h1>

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
                      {item.salary_breakdown.net_salary}
                    </span>
                    <a
                      href={item.slipUrl}
                      download
                      className="bg-violet-600 text-white text-sm px-4 py-2 rounded-full shadow-md hover:bg-violet-700 transition flex items-center gap-2"
                    >
                      <Download className="w-4 h-4" />
                      Download
                    </a>
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
                        <div>{item.deductions.leave_deduction}</div>
                      </div>

                      <hr className="border-dashed border-gray-400 my-2" />

                      <div className="flex justify-between items-center font-bold text-gray-900 text-base">
                        <div>Total Salary</div>
                        <div>{item.salary_breakdown.net_salary}</div>
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

export default Salary;


