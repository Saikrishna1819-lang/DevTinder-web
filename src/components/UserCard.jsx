import axios from 'axios'
import React from 'react'
import { BASE_URL } from '../utils/constants'
import { useDispatch } from 'react-redux'

import { removeFeed } from '../utils/feedSlice'

const UserCard = ({user}) => {
  console.log(user)
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
   const {firstName,lastName,age,gender,about,photourl,skills}=user;

 
  return  (


     <div className="w-[320px]  bg-[#1e1e1e] rounded-2xl overflow-hidden shadow-lg transition-transform transform hover:scale-[1.03] duration-300 hover:shadow-2xl border border-gray-700">
      <img
        className="w-full h-64 object-cover"
        src={photourl}
        alt="profile"
      />
      <div className="p-4 flex flex-col gap-3 text-white">
        <h2 className="text-2xl font-bold">{firstName} {lastName}</h2>
        <div className="flex gap-3 text-sm text-gray-300">
         {gender&& <span className="bg-gray-700 px-2 py-1 rounded-full">{gender}</span>}
          {age&&<span className="bg-gray-700 px-2 py-1 rounded-full">{age} years</span>}
        </div>
       {about&& <p className="text-gray-400 text-sm line-clamp-3">{about}</p>}
        {skills.length>0&&<div className='text-lg font-semibold'>Skills</div>}
       {skills.length>0&&<div className='flex flex-wrap gap-3 '>
       
        {skills.map((skill)=>{
          return <div className="px-3 py-1 rounded-full border  border-designColor">{skill}</div>
        })}
        </div>
        }

        <div className="flex gap-4 pt-2">
          <button
            onClick={() => handleFeed("ignored", user._id)}
            className="w-full bg-gray-700 hover:bg-gray-800 text-white py-2 rounded-xl transition-colors duration-200"
          >
            Ignore
          </button>
          <button
            onClick={() => handleFeed("interested", user._id)}
            className="w-full bg-designColor hover:bg-pink-700 text-white py-2 rounded-xl transition-colors duration-200"
          >
            Interested
          </button>
        </div>
      </div>
    </div>
    
    
  )
}

export default UserCard