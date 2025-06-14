import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constants'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { addConnectionRequests, removeConnectionRequest } from '../utils/requestSlice'
import Spinner from './Spinner'

const Requests = () => {
    const dispatch=useDispatch();
    const requestData=useSelector(store=> store.requests);
    const handleReviewRequest=async(status,id)=>{
        await axios.post(BASE_URL+"/request/review/"+status+"/"+id,{},{withCredentials:true})
        dispatch(removeConnectionRequest(id))


    }
   
    const requests=async()=>{
        const res=await axios.get(BASE_URL+"/user/received",{withCredentials:true});
       
        dispatch(addConnectionRequests(res?.data?.data))
    }
    useEffect(()=>{
        requests();
    },[])
    
   if (!requestData) return (
    <>
   
    <div>
            <h1 className='text-2xl md:text-3xl lg:text-4xl font-bold text-white text-center mt-10' >Loading .....</h1>
        </div>
         <Spinner/>
        </>
   )
    if(requestData.length==0) return (
        <div>
            <h1 className='text-4xl text-white font-bold text-center mt-20' >No Connection Requests Found</h1>
        </div>
    )
  return (

   
      <div className='w-full min-h-screen  pt-20 text-white'>
        <div className='px-10 flex flex-col items-center md:py-10'> 
           <div className='text-center mb-5 text-4xl font-bold '>Requests</div>
           {requestData.map((requests)=>{
            const {firstName,lastName,about,age,gender,photourl,_id}=requests.fromUserId ;
            return (
                <div  key={_id} className='bg-gray-800 hover:scale-103 duration-300 mb-5 flex flex-col  gap-3 rounded-2xl px-5 py-5 w-full sm:w-[500px] '>
                    <div className='flex items-center gap-10'>
                       <div className='w-[80px]'>
                         <img className='rounded-full w-full object-cover' src={photourl}></img>
                        </div>
                       <div className='flex flex-col gap-2'>
                         <h1 className='text-xl font-bold'>{firstName+" "+lastName}</h1>
                       <div className='flex gap-2'>
                        {gender&& <h2 className='px-2 py-1 bg-gray-600 rounded-full' >{gender}</h2>}
                        {age&&<h3 className='px-2 py-1 bg-gray-600  rounded-full'>{age?age+" years":""}</h3>}
                        </div>
                        </div>
                     </div>
                     <div>
                        <p>{about}</p>
                    </div>
                    <div className='  flex justify-center gap-5'>
                         <button className='bg-blue-500 w-full hover:bg-blue-600 px-4 py-2 rounded-lg ' onClick={()=> handleReviewRequest("accepted",requests._id)}>Accept</button>
      <button className='bg-designColor hover:bg-red-600 px-4 w-full py-2 rounded ' onClick={()=> handleReviewRequest("rejected",requests._id)}>Reject</button>
                    </div>
                </div>
            )
    //         return(
    //              <div key={_id} className='flex items-center justify-between gap-5 bg-gray-800 px-5 py-5 mb-5 rounded-xl'>
    //             <div className='flex gap-5'>
    //                 <div className='w-[75px] shrink-0 sm:w-[75px] '>
    //                 <img className='rounded-full object-cover' src={photourl}></img>
    //             </div>
    //             <div>
    //                 <div className='text-xl font-semibold '>{firstName+" "+lastName}</div>
    //                 <div className='text-gray-300'>{age+" , "+gender}</div>
    //                 <div className='text-gray-200'>{about}</div>

    //             </div>
    //                 </div>
    //              <div className='flex gap-3'>
    //     <button className='bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg ' onClick={()=> handleReviewRequest("accepted",requests._id)}>Accept</button>
    //     <button className='bg-red-500 hover:bg-red-600 px-4 py-2 rounded ' onClick={()=> handleReviewRequest("rejected",requests._id)}>Reject</button>
    // </div>
                
    //         </div>
    //         )

           })}
        </div>
    </div>

  )
}

export default Requests