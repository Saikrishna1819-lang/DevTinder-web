import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constants'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { addConnectionRequests, removeConnectionRequest } from '../utils/requestSlice'

const Requests = () => {
    const dispatch=useDispatch();
    const requestData=useSelector(store=> store.requests);
    const handleReviewRequest=async(status,id)=>{
        await axios.post(BASE_URL+"/request/review/"+status+"/"+id,{},{withCredentials:true})
        dispatch(removeConnectionRequest(id))


    }
   
    const requests=async()=>{
        const res=await axios.get(BASE_URL+"/user/received",{withCredentials:true});
        console.log(res);
        dispatch(addConnectionRequests(res?.data?.data))
    }
    useEffect(()=>{
        requests();
    },[])
    
   if (!requestData) return (
    <div>
            <h1 className='text-2xl font-bold text-center mt-20' >Loading .....</h1>
        </div>
   )
    if(requestData.length==0) return (
        <div>
            <h1 className='text-2xl font-bold text-center mt-20' >No Connection Requests Found</h1>
        </div>
    )
  return (

   
      <div className='w-full h-screen flex justify-center mt-20'>
        <div className='mx-5 sm:mx-0'> 
           <div className='text-center mb-5 text-2xl font-bold '>Requests</div>
           {requestData.map((requests)=>{
            const {firstName,lastName,about,age,gender,photourl,_id}=requests.fromUserId ;
            return(
                 <div key={_id} className='flex items-center justify-between gap-5 bg-base-300 px-5 py-5 mb-5 rounded-xl'>
                <div className='flex gap-5'>
                    <div className='w-[75px] shrink-0 sm:w-[75px] '>
                    <img className='rounded-full object-cover' src={photourl}></img>
                </div>
                <div>
                    <div className='text-xl font-semibold '>{firstName+" "+lastName}</div>
                    <div className='text-gray-300'>{age+" , "+gender}</div>
                    <div className='text-gray-200'>{about}</div>

                </div>
                    </div>
                 <div className='flex gap-3'>
        <button className='bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg ' onClick={()=> handleReviewRequest("accepted",requests._id)}>Accept</button>
        <button className='bg-red-500 hover:bg-red-600 px-4 py-2 rounded ' onClick={()=> handleReviewRequest("rejected",requests._id)}>Reject</button>
    </div>
                
            </div>
            )
           })}
        </div>
    </div>

  )
}

export default Requests