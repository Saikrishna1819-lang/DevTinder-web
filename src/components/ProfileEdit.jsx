import React, { useState } from 'react'
import UserCard from './UserCard';
import axios from 'axios';
import { BASE_URL } from '../utils/constants';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';

const ProfileEdit = ({user}) => {
    const dispatch=useDispatch();
    
    const [firstName,setFirstName]=useState(user.firstName);
    const [lastName,setLastName]=useState(user.lastName);
    const [age,setAge]=useState(user.age||"");
    const [gender,setGender]=useState(user.gender||"");
    const [about,setAbout]=useState(user.about||"");
    const [photourl,setPhotourl]=useState(user.photourl||"");
     const [error,setError]=useState("");
     const [showStatus,setShowStatus]=useState(false)
    
    const handleSaveProfile=async()=>{
        setError("");
        try{
            const res=await axios.patch(BASE_URL+"/profile/edit",{firstName,lastName,age,gender,about,photourl},{withCredentials:true});
            dispatch(addUser(res?.data?.data))
            setShowStatus(true)
            setTimeout(()=>{
                setShowStatus(false)
            },3000)
        
        }catch(err){
            console.error(err);
             setError(err?.response?.data||"Something went wrong");
        }
        
    }

  return (
    <>
    {showStatus&&<div className="w-[250px]  flex items-center justify-center rounded-lg absolute top-5 right-10 bg-blue-500 h-[70px]">
        <div className=' text-white text-md font-medium '>Profile Updated Sucessfully</div>
    </div>}
      <div className='bg-base-300  px-10 py-5'>
       <div className='flex flex-col gap-2'>
        <div className='font-bold text-2xl'>Profile Edit</div>
         <div>
          <label className='block mb-2'>FirstName </label>
        <input type="text" value={firstName} onChange={(e)=> setFirstName(e.target.value)} className='bg-base-100 rounded px-4 w-full py-2'></input>
        </div>
        <div>
           <label className='block mb-2'>LastName </label>
        <input type="text" value={lastName} onChange={(e)=> setLastName(e.target.value)} className='bg-base-100 rounded px-4 w-full py-2'></input>
        </div>
        <div className='flex items-center gap-20'>
          <div>
            <label className='block mb-2'>Age</label>
          <input type="text" value={age} onChange={(e)=> setAge(e.target.value)} className='bg-base-100 rounded px-4 w-full py-2'></input>
          </div>
         <div>
           <label className='block mb-2'>Gender</label>
          <select value={gender} onChange={(e)=>setGender(e.target.value)} className='bg-base-100 px-4 py-2'>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Others">Others</option>
          </select>

         </div>
         
        </div>
        <div >
          <label className='block mb-2'>About</label>
          <textarea type="textarea"  value={about} onChange={(e)=> setAbout(e.target.value)} className='bg-base-100 block px-6 py-3 rounded-lg w-[300px] h-[100px]'></textarea>
        </div>
        <div>
          <label className='block mb-2'>PhotoUrl</label>
          <input type="text" value={photourl} onChange={(e)=> setPhotourl(e.target.value)} className='bg-base-100 rounded px-4 w-full py-2'></input>
         </div>
         <div className='text-red-500 break-words'>{error}</div>
         <div className='flex justify-center'>
            <button onClick={handleSaveProfile} className='bg-blue-500 hover:bg-blue-600 font-semibold rounded-lg px-4 py-2'>Save Profile</button>
         </div>
         
       </div>
        
      </div>
      <div>
        <UserCard user={{firstName,lastName,age,gender,about,photourl}}/>
      </div>
 </>
  )
}

export default ProfileEdit