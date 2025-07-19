import React, { useState,useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import {cacheUser} from '../../Redux/Slice'
import { FaDownload, FaEnvelope, FaPhone, FaGlobe, FaCalendarAlt,FaRupeeSign,FaRegClock } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import "chart.js/auto";


const Emprofile = () => {
  const [tab, setTab] = useState("Personal Info");

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
        <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
          <div className="flex flex-col lg:flex-row gap-6 h-[calc(100vh-64px)]">
          <Profile />
            <div className="flex-1 bg-white p-6 rounded-2xl shadow-md flex flex-col">
              <nav className="flex gap-4 border-b pb-3 mb-4 text-sm font-medium">
                {["Personal Info", "Salary Info"].map((t) => (
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
                {tab === "Personal Info" && <InfoTab />}
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
          <p className="text-sm font-medium">{employee.role}</p>
          <p className="text-xs text-gray-400">Department</p>
        </div>
      </div>

      <div className="flex items-start gap-3">
        <div className="p-2 bg-gray-100 rounded-md">
        <FaRupeeSign className="text-gray-500 mt-1" />
        </div>
        <div>
          <p className="text-sm font-medium text-green-600">₹{employee.salary}</p>
          <p className="text-xs text-gray-400">Salary</p>
        </div>
      </div>

      <div className="flex items-start gap-3">
        <div className="p-2 bg-gray-100 rounded-md">
        <FaRegClock  className="text-gray-500 mt-1" />
        </div>
        <div>
          <p className="text-sm font-medium">Regular</p>
          <p className="text-xs text-gray-400">{employee.employmentType}</p>
        </div>
      </div>

      <div className="flex items-start gap-3">
        <div className="p-2 bg-gray-100 rounded-md">
          <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" strokeWidth="2"
               viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round"
               d="M8 7V3m8 4V3m-9 8h10m-10 4h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
        </div>
        <div>
          <p className="text-sm font-medium">{employee.joigningDate}</p>
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
          <p className="text-sm">{employee.email}</p>
        </div>
      </div>

      <div className="flex items-start gap-3">
        <FaPhone className="text-gray-500 mt-1" />
        <div>
          <p className="text-xs text-gray-500">Phone</p>
          <p className="text-sm">{employee.mobile}</p>
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
          <p><span className="font-medium">Bank Account NO:</span> {employee.bankAccount}</p>
          <p><span className="font-medium">Gender:</span> {employee.gender}</p>
          <p><span className="font-medium">IFSC CODE:</span> {employee.IFSC}</p>
        </div>
      </div>

      {/* Contact Info */}
      <div>
        <h4 className="text-md font-semibold mb-2 text-indigo-600">📞 Contact Information</h4>
        <div className="grid sm:grid-cols-2 gap-x-8 gap-y-3 text-sm">
          <p><span className="font-medium">Phone:</span> {employee.mobile || 'N/A'}</p>
          <p><span className="font-medium">Email:</span> {employee.email || 'N/A'}</p>
          <p className="col-span-2"><span className="font-medium">Address:</span> {employee.address || 'N/A'}</p>
        </div>
      </div>

      {/* Job Info */}
      <div>
        <h4 className="text-md font-semibold mb-2 text-indigo-600">💼 Job Details</h4>
        <div className="grid sm:grid-cols-2 gap-x-8 gap-y-3 text-sm">
          <p><span className="font-medium">Employee ID:</span> {employee.user_id}</p>
          <p><span className="font-medium">Designation:</span> {employee.designation}</p>
          <p><span className="font-medium">Attendance Type:</span> {employee.attendanceType}</p>
          <p><span className="font-medium">Joining Date:</span> {employee.joigningDate}</p>
        </div>
      </div>

      {/* Emergency Info */}
      <div>
        <h4 className="text-md font-semibold mb-2 text-indigo-600">🚨 Emergency Contact</h4>
        <div className="grid sm:grid-cols-2 gap-x-8 gap-y-3 text-sm">
          <p><span className="font-medium">Name:</span> {employee.emergencyContactname}</p>
          <p><span className="font-medium">Contact:</span> {employee.emergencyContact}</p>
        </div>
      </div>
    </div>
  );
}

export default Emprofile;
