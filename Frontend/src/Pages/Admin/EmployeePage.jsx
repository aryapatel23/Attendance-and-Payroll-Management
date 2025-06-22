import { FaDownload, FaEnvelope, FaPhone, FaGlobe, FaCalendarAlt,FaRupeeSign,FaRegClock } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";

import "chart.js/auto";

const months = ["April 2025", "May 2025","June2025","July2025","Augest2025"];




const EmployeeDashboard = () => {


  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
        <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
          <div className="flex flex-col lg:flex-row gap-6 h-[calc(100vh-64px)]">
            <Profile />
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

export default EmployeeDashboard;