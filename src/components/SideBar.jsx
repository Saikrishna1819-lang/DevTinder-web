import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { removeTotalFeed } from '../utils/feedSlice';
import { removeUser } from '../utils/userSlice';
import { removeConnections } from '../utils/connectionSlice';
import { BASE_URL } from '../utils/constants';
import { FaUserCircle,FaUsers,FaUserPlus } from 'react-icons/fa';
import { FiCompass } from 'react-icons/fi';
import { BiLogOut } from 'react-icons/bi';
import { MdCancel } from "react-icons/md";
import axios from 'axios';

const SideBar = ({show}) => {
  const user=useSelector(store=> store.user)
  const dispatch=useDispatch();
  const navigate=useNavigate();

    const handleLogout=async()=>{
     
      try{
            await axios.post(BASE_URL+"/logout",{},{withCredentials:true})
            dispatch(removeTotalFeed());
            dispatch(removeUser());
            dispatch(removeConnections());
           
            navigate("/login");
            
      }catch(err){
        console.log(err);
      }
  
    }
    if(!user) return 
  return (

    <div className=' fixed  top-0 left-0  px-5 w-[300px] py-20 h-screen  bg-gray-900 z-50'> 
    <div onClick={show} className='absolute top-5 left-[250px]   text-3xl  text-designColor'><MdCancel /></div>
    <div className='text-white flex flex-col gap-10 text-xl '>
      
        <Link to="/feed" >
        <div onClick={show} className='flex gap-3 items-center px-3 py-2 hover:bg-designColor duration-300 rounded-lg' >
         <FiCompass/>
         <div>Explore</div>
         </div>
        </Link>
      
        <Link to="/profile" >
        <div onClick={show} className='flex gap-3 items-center px-3 py-2 hover:bg-designColor duration-300 rounded-lg' >
         <FaUserCircle/>
         <div>Profile</div>
         </div>
        </Link>
      
          <Link to="/connections" >
          <div onClick={show} className='flex gap-3 items-center px-3 py-2 rounded-lg hover:bg-designColor duration-400'>
          <FaUsers/>
          <div>Connections</div>
          </div>

          </Link>
     
        <Link to="/requests" >
         <div onClick={show} className='flex gap-3 items-center px-3 py-2 hover:bg-designColor duration-300  rounded-lg'>
         <FaUserPlus/>
         <div>Requests</div>
         </div>
        </Link>
      <div onClick={()=>{show(); 
        handleLogout();
      }}   className='flex gap-3 items-center px-3 py-2 hover:bg-designColor duration-300 rounded-lg'>
        <BiLogOut/>
        <button >Logout</button>
        </div>
     
    </div>

    </div>
   
  )
}

export default SideBar;