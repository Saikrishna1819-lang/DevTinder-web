import axios from 'axios'
import React from 'react'
import { BASE_URL } from '../utils/constants'
import { useDispatch } from 'react-redux'

import { removeFeed } from '../utils/feedSlice'

const UserCard = ({user}) => {
    const dispatch=useDispatch();

    const handleFeed=async(status,userid)=>{
        try{
            await axios.post(BASE_URL+"/request/send/"+status+"/"+userid,{},{withCredentials:true});
    
        
        dispatch(removeFeed(userid))
        }catch(error)
        {
             console.error("Error sending request:", error);
             alert("Failed to send request");
        }
         


    }
    
    if(!user) return 
   const {firstName,lastName,age,gender,about,photourl}=user;
  return  (
    
     <div className="bg-base-300 w-[230px]  rounded-lg">
            <div className="w-full">
                <img className="w-full  rounded-t-lg" src={photourl}  alt="profile-photo"></img>
            </div>
            <div className="p-5 flex flex-col gap-2 w-full">
                <div className="font-medium text-lg break-words">{firstName+" "+lastName}</div>
                <div>
                    <div>{age}</div>
                    <div>{gender}</div>
                </div>
                <div className='break-words'>{about}</div>
                
                <div className="flex gap-5">
                    <button className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded" onClick={()=> handleFeed("ignored",user._id)}>Ignore</button>
                    <button className="bg-pink-500 hover:bg-pink-600 px-4 py-2 rounded" onClick={()=> handleFeed("interested",user._id)}>Interested</button>
                </div>
            </div>
        </div>
  )
}

export default UserCard