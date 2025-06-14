
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { FiMenu } from "react-icons/fi";


import SideBar from './SideBar';

const Navbar = ({show}) => {

  const user=useSelector(store=> store.user);
  return (
   <>
   <div className=' w-full   border-b-1 h-20 shadow border-b-black z-40  sticky top-0 bg-[#232429]   text-white justify-between items-center px-5 py-5  flex'>
     <div className='flex gap-3 items-center '>
      {user&&<div onClick={show} className=' text-3xl text-designColor bg-black w-10 h-10 inline-flex items-center justify-center  rounded-full'>
         <FiMenu />
         
    </div>}
     <Link to="/feed" className='text-2xl text-designColor font-bold'>DevTinder</Link>
     </div>
   
   
  {user&& <div className='flex gap-3 items-center'>
    <div className='text-lg font-semibold'>{user.firstName}</div>
    <div className='w-10'>
      
      <img  className='w-full rounded-full object-center'
            alt="profile"
            src={user.photourl?user.photourl:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQuhYaQUXZv9Fgs3YsocuEf1Vi4ydnXf7HLU9FY0liq7-NFo1nC7CIRw2jlAou1kICG5rk&usqp=CAU"} />
    </div>
   </div>}
  {!user&& <div>
     <Link to="/" className='text-white px-6 font-semibold text-lg py-2 bg-designColor  rounded-full '>Back</Link>
   </div>}
   </div>
 
  
 
  

   </>
  )
}

export default Navbar;