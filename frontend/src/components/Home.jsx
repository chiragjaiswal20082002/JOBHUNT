// import React from 'react'
import CategoryCarousel from './CategoryCarousel'
import Footer from './Footer'
import Herosection from './Herosection'
import LatestJobs from './LatestJobs'
import Navbar from './shared/Navbar'
import useGetAllJobs from "../hooks/useGetAllJobs"
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

const Home = () => {
  const {user}=useSelector(store=>store.auth);
  const navigate=useNavigate();
    useEffect(()=>{
      if(user?.role==='recruiter')
        {
          navigate("/admin/companies");
        }

      },[user,navigate]);

      useGetAllJobs();

  return (
    <div>
      <Navbar/>
      <HeroSection/>
      <CategoryCarousel/>
      <LatestJobs/>
      <Footer/>
    </div>
  )
}

export default Home
