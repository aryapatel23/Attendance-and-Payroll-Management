import React, { useState,useEffect } from "react";
import { FaDownload, FaEnvelope, FaPhone, FaGlobe, FaCalendarAlt,FaRupeeSign,FaRegClock } from "react-icons/fa";
import "chart.js/auto";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import {cacheUser} from '../../Redux/Slice'


const PayrollPage = () => {
  const [tab, setTab] = useState("usersalaryinfo");

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
        <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
          <div className="flex flex-col lg:flex-row gap-6 h-[calc(100vh-64px)]">
            <Profile />
            <div className="flex-1 bg-white p-6 rounded-2xl shadow-md flex flex-col">
              <nav className="flex gap-4 border-b pb-3 mb-4 text-sm font-medium">
                {["usersalaryinfo"].map((t) => (
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
                {tab === "usersalaryinfo" && <InfoTab />} 
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
const FetchEmployee = async()=>{
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

  const [employee, setEmployee] = useState(null);
  const [message,setMessage]=useState("Loading...")
  useEffect(()=>{
if(!id){
  console.log("Failed to fetch the user")
}else{
 
    const fetchsalaryinfo = async ()=>{
      try{
        const response= await fetch(`http://localhost:5500/api/usersalaryinfo/${id}`)
         if(!response.ok){
            setMessage("Salary data is not found for this user please add the user info.")
            throw new Error("Failed to fetch employees");
           
      }

                const data=await response.json()
                setEmployee(data)
                console.log("Salaryinfo data is",data)
      }catch(error){
        console.log("Error fo fetching user",error)
      }
    }
    fetchsalaryinfo()
}
  },[id])

 if (!employee) return <p>{message}</p>;

  return (
    <div className="space-y-6 text-gray-700">
      <h3 className="text-xl font-semibold border-b pb-2">User {employee.user_id} Salary Info</h3>

      {/* Personal Info */}
      <div>
        <h4 className="text-md font-semibold mb-2 text-indigo-600">👤 Personal Details</h4>
        <div className="grid sm:grid-cols-2 gap-x-8 gap-y-3 text-sm">
          <p><span className="font-medium">Full Name:</span> {employee.employee_name}</p>
          <p><span className="font-medium">Employee ID:</span> {employee.employee_id}</p>
           <p><span className="font-medium">Base Salary:</span> {employee.base_salary}</p>
           <p><span className="font-medium">Joining Date:</span> {employee.joining_date}</p>
        </div>
      </div>

      {/* Bouns Info */}
      <div>
        <h4 className="text-md font-semibold mb-2 text-indigo-600">💰 Bouns</h4>
        <div className="grid sm:grid-cols-2 gap-x-8 gap-y-3 text-sm">
          <p><span className="font-medium">Bouns:</span> {employee.bonus}</p>
          <p><span className="font-medium">HRA:</span> {employee.hra}</p>
        </div>
      </div>

      {/* Deductions Info */}
      <div>
        <h4 className="text-md font-semibold mb-2 text-indigo-600">➖ Deductions</h4>
        <div className="grid sm:grid-cols-2 gap-x-8 gap-y-3 text-sm">
          <p><span className="font-medium">Tax Percent:</span>{employee.tax_percent} </p>
          <p><span className="font-medium">PF Percent:</span> {employee.pf_percent}</p>
        </div>
      </div>

      {/* Last Updates*/}
      <div>
        <h4 className="text-md font-semibold mb-2 text-indigo-600">🔄 Updates</h4>
        <div className="grid sm:grid-cols-2 gap-x-8 gap-y-3 text-sm">
          {/* <p><span className="font-medium">Last update:</span> {new Date(employee.last_update).toISOString().split("T")[0]} </p> */}
          <p><span className="font-medium">Updated By:</span> {employee.updated_by}</p>
        </div>
      </div>
    </div>
  );
}

const SalaryMOdal=({ mode = "add", employeeId, defaultData = {}, onClose})=>{
  const [formData,setFormData]=useState({
    employee_id: "",
    employee_name: "",
    base_salary: "",
    hra: "",
    bonus: "",
    tax_percent: "",
    pf_percent: "",
    joining_date: "",
    updated_by: "Rajesh",
  });

  const [message,setMessage]=useState("");

  useEffect(()=>{
if(mode==="update" && defaultData){
  setFormData({...defaultData})
}else{
  setFormData((prev)=>({...prev,employee_id:employeeId}))
}
  },[defaultData,mode,employeeId]);

  const handelchange=()=>{
    setFormData({...formData,[e.target.name]:e.target.value})
  };

const handleSubmit = async (e) => {
    e.preventDefault();

    const url =
      mode === "add"
        ? "http://localhost:5500/api/usersalaryinfo/add"
        : "http://localhost:5500/api/usersalaryinfo/update";

    const method = mode === "add" ? "POST" : "PUT";

    try {
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) throw new Error(result.message);

      setMessage(result.message);
      setTimeout(() => {
        onClose(); // Close modal after success
      }, 1000);
    } catch (err) {
      setMessage(err.message);
    }
  };
}

export default PayrollPage;
