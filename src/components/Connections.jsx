import axios from 'axios'
import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constants'
import {  useDispatch, useSelector } from 'react-redux'
import { addConnections } from '../utils/connectionSlice'

const Connections = () => {
    const dispatch=useDispatch();
    const showConnections=useSelector(store=> store.connections);
    console.log(showConnections);
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
    <div className='w-full h-screen flex justify-center mt-20'>
        <div className='w-6/12'>
           <div className='text-center mb-5 text-2xl font-bold '>Connections</div>
           {showConnections.map((connection)=>{
            return(
                 <div  className='flex items-center gap-5 bg-base-300 px-5 py-5 mb-5 rounded-xl'>
                <div className='w-[75px] '>
                    <img className='rounded-full object-cover' src={connection.photourl}></img>
                </div>
                <div>
                    <div className='text-xl font-semibold '>{connection.firstName+" "+connection.lastName}</div>
                    <div className='text-gray-300'>{connection.age+" , "+connection.gender}</div>
                    <div className='text-gray-200'>{connection.about}</div>

                </div>
            </div>
            )
           })}
        </div>
    </div>
  )
}

export default Connections