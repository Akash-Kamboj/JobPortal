import React, { useEffect } from "react";
import Navbar from "./Navbar";
import Header from "./components/Header";
import Categories from "./components/Categories";
import LatestJobs from "./components/LatestJobs";
import Footer from "./components/Footer";
import UserGetAllJobs from "../hook/UserGetAllJobs"; // ✅ Ensure correct import path
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const {user} = useSelector((store)=>store.auth)
  const navigate = useNavigate();
  useEffect(()=>{
    if(user?.role === "Recruiter"){
      navigate("/admin/companies") 
    }
  })

  
  return (
    <div>
      <UserGetAllJobs /> {/* ✅ Correct usage as a component */}
      <Navbar />
      <Header />
      <Categories />
      <LatestJobs />
      <Footer />
    </div>
  );
}
