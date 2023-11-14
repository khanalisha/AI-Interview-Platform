import React, { useState } from "react";
// import "../index.css";
import { useNavigate } from "react-router-dom";
const Dashboard = () => {
    const navigate = useNavigate();
    // localStorage.removeItem('name')

    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [showToast, setShowToast] = useState(false);
  
    const handleGetStartedClick = () => {
      if (email.trim() === "" || name.trim() === "") {
        setShowToast(true);
      } else {
        // Save name and email in local storage
        localStorage.setItem("name", name);
        localStorage.setItem("email", email);
        navigate("/interview");
      }
    };
  return (
    <div className="p-8 text-center bg-[#119DA4]">
       
        <h1 className="text-[#1F2041] md:text-5xl sm:text-4xl text-3xl font-bold md:py-6">ACE YOUR INTERVIEWS</h1>
        <p className='text-[#292F36] md:text-2xl sm:text-xl text-lg font-bold '>Practice your technical interview and get valuable feedback immediatly!</p>
            <div className="mt-9 flex items-center justify-center ">
      <div className="max-w-md mx-auto p-8 bg-[#A0DDE6] shadow-md rounded-lg box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)">
        <h1 className="text-3xl font-semibold mb-4">
        Enroll here for success!
        </h1>
        <div className="mb-6">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
            type="email"
            id="email"
            placeholder="Enter your email here.."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="name">
            Name
          </label>
          <input
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
            type="text"
            id="name"
            placeholder="Enter your name here.."
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <button
          className="bg-[#119DA4] text-red py-2 px-4 rounded-md hover:bg-[#A0DDE6] focus:outline-none focus:ring focus:border-blue-300 border border-bg[#119DA4]  btn shadow-[0_9px_0_rgb(0,0,0)] hover:shadow-[0_4px_0px_rgb(0,0,0)] text-black bg-white ease-out hover:translate-y-1 transition-all rounded"
          onClick={handleGetStartedClick}
        >
          Get Started
        </button>
        {showToast && (
          <div className="text-[#e4113b] mt-2">
            Please fill all boxes before clicking Get Started.
          </div>
        )}
      </div>
    </div>
    </div>
  )
}

export default Dashboard