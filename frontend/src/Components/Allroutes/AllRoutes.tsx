// import React from 'react'
import HomePage from "../Pages/HomePage";
import Course from "../Pages/Course";
import Dashboard from "../Pages/Dashboard";
import Interview from "../Pages/Interview";
import { Route, Routes } from "react-router-dom";

const AllRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/interview" element={<Course />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/interviewpage" element={<Interview />} />
      </Routes>
    </div>
  );
};

export default AllRoutes;
