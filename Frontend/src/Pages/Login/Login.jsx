// import react from 'react';
// import { useState } from 'react';

// const Login =()=>{
// const [id, setId] = useState('');
// const [username, setUsername] = useState('');
// const [password, setPassword] = useState('');
//     return(
//         <>
//             <div className='flex flex-row  justify-between items-center h-screen '>
//                 <div className='flex flex-col justify-center items-center w-2/5 h-full'>
//                <div className='flex justify-start pl-3 pt-3 w-full'>
//                  <img src="https://res.cloudinary.com/doqzxuxb1/image/upload/v1748249798/Attendance%20And%20Payroll%20Managment/eanj5h57izb4wsvgkzhc.png" alt="" />
//                </div>
//              <div className='w-4/5 h-full flex justify-center items-center'>
//                 <div className='flex flex-col justify-center w-4/5'>
//                     <h1 className='text-3xl font-bold'>Sign-in</h1>
//                     <form className='flex flex-col mt-4 w-4/4'>
//                         <input type="text" placeholder='id*' className='border border-gray-300 p-2 mb-2 rounded' name='id' value={id}   onChange={(e) => setId(e.target.value)} />

//                         <input type="password" placeholder='Username*' className='border border-gray-300 p-2 mb-2 rounded' name='Username' value={username} onChange={(e)=>setUsername(e.target.value)} />

//                         <input type="password" placeholder='Password*' className='border border-gray-300 p-2 mb-2 rounded' name='password' value={password} onChange={(e)=>setPassword(e.target.value)}/>

//                         <button type="submit" className='bg-blue-500 text-white p-2 rounded'>Login</button>

//                     </form>
//                 </div>               
//              </div>
//              <span className='mb-5'>Terms and Condition • Privacy Policy</span>
//                 </div>

//               <div className=' bg-gray-100 h-full w-3/5 flex justify-center items-center'>
//              <img src="https://res.cloudinary.com/doqzxuxb1/image/upload/v1748238957/Attendance%20And%20Payroll%20Managment/y45ltl4yfgxsksuetayk.png" alt="Login page" className='' />
//           </div>
//           <div>
            
//           </div>
//             </div>


//         </>
//     )
// };
// export default Login;


import React, { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [id, setId] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

        const navigate = useNavigate(); 



  const handelLogin = async (e) => {
    e.preventDefault();
    const userData = { username, password,id };
    try{
          const response = await fetch("http://localhost:4500/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });
        const data = await response.json();
       
      if (!response.ok) {
        alert(data.message || "Login failed");
        return;
      }else{
        alert("Login successful By using Jwt Token");
        if(data.user.role=="employee"){
          navigate("/home");
        }else if(data.user.role=="hr"){
           navigate("/admin");
         
        }
      }
    }
    catch (error) {
      console.error("Error during login:", error);
      alert("An error occurred while logging in. Please try again.");
    }
  }


  
  return (
<div className="flex flex-col md:flex-row h-screen">
  {/* Left Side (Logo + Form + Footer) */}
  <div className="flex flex-col w-full md:w-2/5 h-full">

    {/* LOGO */}
    <div className="order-1 md:order-1 flex justify-start pl-3 pt-3 w-full">
      <img src="https://res.cloudinary.com/doqzxuxb1/image/upload/v1748249798/Attendance%20And%20Payroll%20Managment/eanj5h57izb4wsvgkzhc.png" alt="Logo" />
    </div>

    {/* IMAGE (on mobile, placed after logo) */}
    <div className="order-2 md:hidden flex justify-center items-center">
      <img src="https://res.cloudinary.com/doqzxuxb1/image/upload/v1748238957/Attendance%20And%20Payroll%20Managment/y45ltl4yfgxsksuetayk.png" alt="Login Image" />
    </div>

    {/* FORM */}
    <div className="order-3 md:order-2 flex justify-center items-center flex-1">
      <div className="w-9/12 md:w-3/5">
        <h1 className="text-3xl font-bold">Sign-in</h1>
        <form className="flex flex-col mt-4" onSubmit={handelLogin}>
          <input
            type="text"
            placeholder="id*"
            className="border border-gray-300 p-2 mb-2 rounded w-full"
            value={id}
            onChange={(e) => setId(e.target.value)}
          />
          <input
            type="text"
            placeholder="Username*"
            className="border border-gray-300 p-2 mb-2 rounded w-full"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password*"
            className="border border-gray-300 p-2 mb-2 rounded w-full"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" className="bg-blue-500 text-white p-2 rounded">
            Login
          </button>
        </form>
      </div>
    </div>

    {/* FOOTER */}
    <div className="order-4 md:order-3 mb-8 text-center text-sm">
      Terms and Conditions • Privacy Policy
    </div>
  </div>

  {/* RIGHT SIDE IMAGE (desktop only) */}
  <div className="hidden md:flex md:order-2 w-3/5 h-full justify-center items-center bg-gray-100">
    <img src="https://res.cloudinary.com/doqzxuxb1/image/upload/v1748238957/Attendance%20And%20Payroll%20Managment/y45ltl4yfgxsksuetayk.png" alt="Login Image" />
  </div>
</div>

  );
};

export default Login;

