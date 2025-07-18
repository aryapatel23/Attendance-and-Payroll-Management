import React, { useState,useEffect } from "react";



const EmployeeDashboard = () => {
  const [tab, setTab] = useState("userinfo");

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
                {/* {tab === "attendance" && (
                  <Attendance/>
                )}
                {tab === "salary" && <Salary/>} */}
              </div>
            </div>
          </div>
        </div>
    </div>
  );
};


export default EmployeeDashboard;
