import React from "react";
import Sidebar from "../../Components/HRSidebar";
import Header from "../../Components/Header";
import { FaDownload, FaEnvelope, FaPhone, FaGlobe } from "react-icons/fa";

const PayrollSystem = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <Header />

        {/* Page Content */}
        <div className="p-6 overflow-auto">
          <h2 className="text-2xl font-semibold mb-6">Payroll System</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Left Column - Employee Info */}
            <div className="bg-white p-6 rounded-xl shadow-md col-span-1">
              <div className="flex flex-col items-center">
                <img
                  src="https://i.pravatar.cc/100?img=56"
                  alt="Employee"
                  className="w-24 h-24 rounded-full mb-4"
                />
                <h3 className="text-lg font-semibold">Jhon Doe</h3>
                <p className="text-sm text-gray-500">UX Designer</p>
              </div>

              <div className="mt-6 space-y-3 text-sm">
                <div>
                  <strong>Department:</strong> Frontend
                </div>
                <div>
                  <strong>Salary:</strong>{" "}
                  <span className="text-green-600 font-bold">40,000</span>
                </div>
                <div>
                  <strong>Work Shift:</strong> Regular
                </div>
                <div>
                  <strong>Joining Date:</strong> 12 February 2023
                </div>
                <hr />
                <div className="pt-2">
                  <p className="flex items-center gap-2">
                    <FaEnvelope className="text-gray-500" />{" "}
                    alwissuryatmaja@gmail.com
                  </p>
                  <p className="flex items-center gap-2">
                    <FaPhone className="text-gray-500" /> +9854658741
                  </p>
                  <p className="flex items-center gap-2">
                    <FaGlobe className="text-gray-500" />{" "}
                    <a
                      href="https://bit.ly/3uOJF79"
                      className="text-blue-600 underline"
                      target="_blank"
                      rel="noreferrer"
                    >
                      bit.ly/3uOJF79
                    </a>
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column - Monthly Status */}
            <div className="bg-white p-6 rounded-xl shadow-md col-span-2">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">
                  Monthly Status › April
                </h3>
                <button className="border px-3 py-1 rounded text-sm">
                  📅 Select Month
                </button>
              </div>

              <div className="grid grid-cols-4 gap-4 text-center mt-6">
                <div>
                  <p className="text-lg font-bold">28</p>
                  <p className="text-sm text-gray-500">Working Days</p>
                </div>
                <div>
                  <p className="text-lg font-bold">24</p>
                  <p className="text-sm text-gray-500">Days Present</p>
                </div>
                <div>
                  <p className="text-lg font-bold text-green-600">2</p>
                  <p className="text-sm text-green-600">Paid Leaves</p>
                </div>
                <div>
                  <p className="text-lg font-bold text-red-500">2</p>
                  <p className="text-sm text-red-500">Unpaid Leaves</p>
                </div>
              </div>

              <div className="mt-6 border rounded-lg overflow-hidden">
                <table className="w-full text-sm">
                  <tbody>
                    <tr className="border-b">
                      <td className="p-3 font-semibold">Total Salary</td>
                      <td className="p-3 text-right">40,000</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-3">TDS (10%)</td>
                      <td className="p-3 text-right text-red-600">-4,000</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-3">SPF Fund (5%)</td>
                      <td className="p-3 text-right text-red-600">-2,000</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-3">Unpaid Leave (2 Days)</td>
                      <td className="p-3 text-right text-red-600">-2,200</td>
                    </tr>
                    <tr className="border-b font-bold bg-gray-50">
                      <td className="p-3">Total Paid Salary</td>
                      <td className="p-3 text-right">35,800</td>
                    </tr>
                    <tr className="bg-green-50">
                      <td className="p-3 font-semibold">Salary Status</td>
                      <td className="p-3 text-right text-green-600">Paid</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="mt-4 flex justify-end">
                <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm flex items-center gap-2 shadow-md">
                  <FaDownload /> Download Slip
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PayrollSystem;
