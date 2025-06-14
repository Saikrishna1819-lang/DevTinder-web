import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import { Outlet, useNavigate } from 'react-router-dom'
import Footer from './Footer'
import { BASE_URL } from '../utils/constants'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { addUser } from '../utils/userSlice'
import SideBar from './SideBar'

const Body = () => {
  const userData=useSelector(store=> store.user);
  const[showSideBar,SetShowSideBar]=useState(false)

  const handleSideBar=()=>{
    SetShowSideBar(prev=> !prev)
  }

  const dispatch=useDispatch();
  const navigate=useNavigate();
  const fetchUser=async()=>{
   if (userData && Object.keys(userData).length > 0) return;
    try{

      const res=await axios.get(BASE_URL+"/profile/view",{withCredentials:true})
      dispatch(addUser(res.data));


    }catch(err){
     if(err.response&&err.response.status===401)
     {
       navigate("/login")
     }
      console.log(err)
    }
  }

 
   useEffect(()=>{
   
  
      fetchUser();
    

     

  },[])
 

  return (
    <div className='w-full min-h-screen  relative  opacity-95'>
    <Navbar show={handleSideBar} />
   {showSideBar&& <SideBar show={handleSideBar} />}
    <Outlet/>
    {/* <Footer/> */}
    </div>
  )
}

export default Body
