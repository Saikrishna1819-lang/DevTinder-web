import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constants'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { addConnectionRequests } from '../utils/requestSlice'

const Requests = () => {
    const dispatch=useDispatch();
    const requestData=useSelector(store=> store.requests);
   console.log(requestData)
    const requests=async()=>{
        const res=await axios.get(BASE_URL+"/user/connections",{withCredentials:true});
        dispatch(addConnectionRequests(res?.data?.data))
    }
    useEffect(()=>{
        requests();
    },[])
    
   if (!requestData) return <h1 className='text-2xl font-bold'>Loading...</h1>;
    if(requestData.length==0) return <h1 className='text-2xl font-bold'>No Connection Requests Found</h1>
  return (

   
      <div className='w-full h-screen flex justify-center mt-20'>
        <div className='mx-5 sm:mx-0'>
           <div className='text-center mb-5 text-2xl font-bold '>Requests</div>
           {requestData.map((connection)=>{
            return(
                 <div  className='flex items-center justify-between gap-5 bg-base-300 px-5 py-5 mb-5 rounded-xl'>
                <div className='flex gap-5'>
                    <div className='w-[75px] shrink-0 sm:w-[75px] '>
                    <img className='rounded-full object-cover' src={connection.photourl}></img>
                </div>
                <div>
                    <div className='text-xl font-semibold '>{connection.firstName+" "+connection.lastName}</div>
                    <div className='text-gray-300'>{connection.age+" , "+connection.gender}</div>
                    <div className='text-gray-200'>{connection.about}</div>

                </div>
                    </div>
                 <div className='flex gap-3'>
        <button className='bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg '>Accept</button>
        <button className='bg-red-500 hover:bg-red-600 px-4 py-2 rounded '>Reject</button>
    </div>
                
            </div>
            )
           })}
        </div>
    </div>

  )
}

export default Requests