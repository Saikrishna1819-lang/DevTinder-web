import axios from 'axios'
import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constants'
import {  useDispatch, useSelector } from 'react-redux'
import { addConnections } from '../utils/connectionSlice'
import { Link } from 'react-router-dom'

const Connections = () => {
    const dispatch=useDispatch();
    const showConnections=useSelector(store=> store.connections);
   
    const fetchConnections=async()=>{
        const connections=await axios.get(BASE_URL+"/user/connections",{withCredentials:true})
        
        dispatch(addConnections(connections?.data?.data));
        

    }
    useEffect(()=>{
        fetchConnections();
    },[])
    if(!showConnections) return (
        <div>
            <h1 className='text-2xl font-bold text-center mt-20' >Loading.......</h1>
        </div>
    )
    if(showConnections.length==0) return (
        <div>
            <h1 className='text-2xl font-bold text-center mt-20' >No Connections  Found</h1>
        </div>
    )
  return (
    <div className='w-full min-h-screen pt-20 py-10 flex justify-center '>
        <div className="w-full sm:w-[600px] sm:px-16 md:w-[600px] px-10">
           <div className='text-center mb-5 text-4xl font-bold text-white '>Connections</div>
           {showConnections.map((connection)=>{
            return(
                 <div key={connection._id}  className='flex hover:scale-105 duration-300 shadow-2xl items-center justify-between gap-5 bg-gray-800 px-5 py-5 mb-5 text-white rounded-xl'>
               <div className='flex items-center gap-5'>
                 <div className='w-[75px] '>
                    <img className='rounded-full object-cover' src={connection.photourl}></img>
                </div>
                <div>
                    <div className='text-xl font-semibold '>{connection.firstName+" "+connection.lastName}</div>
                    <div className='text-gray-300'>{connection.age?connection.age:""+" , "+connection.gender?connection.gender:""}</div>
                    <div className='text-gray-200'>{connection.about}</div>
                </div>
                </div>
                <div>
                    <Link to={"/chat/"+connection._id}><button className='bg-designColor hover:bg-pink-600 px-4 py-2 rounded-lg '>chat</button></Link>
                </div>
            </div>
            )
           })}
        </div>
    </div>
  )
}

export default Connections