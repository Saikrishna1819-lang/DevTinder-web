import React, { useState } from 'react'
import UserCard from './UserCard';
import axios from 'axios';
import { BASE_URL } from '../utils/constants';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { MdCancel } from "react-icons/md";

const ProfileEdit = ({user}) => {
    const dispatch=useDispatch();
    
    const [firstName,setFirstName]=useState(user.firstName);
    const [lastName,setLastName]=useState(user.lastName);
    const [age,setAge]=useState(user.age||"");
    const [gender,setGender]=useState(user.gender||"");
    const [about,setAbout]=useState(user.about||"");
    const [photourl,setPhotourl]=useState(user.photourl||"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQuhYaQUXZv9Fgs3YsocuEf1Vi4ydnXf7HLU9FY0liq7-NFo1nC7CIRw2jlAou1kICG5rk&usqp=CAU");
     const [error,setError]=useState("");
     const [showStatus,setShowStatus]=useState(false)
     const [skills,setSKills]=useState(user.skills)
     const [skillValue,setSkillValue]=useState("")
    
    
    const handleRemoveSkill=(id)=>{
      setSKills(skills.filter((skill,index)=> index!==id
        
      ))
    }
    
    const handleSaveProfile=async()=>{
        setError("");
        try{
            const res=await axios.patch(BASE_URL+"/profile/edit",{firstName,lastName,age,gender,about,photourl,skills},{withCredentials:true});
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
     <div className='text-white text-2xl md:text-3xl lg:text-4xl font-bold  text-center mt-10'>Edit Profile</div>
    <div className='py-20 px-10   flex flex-col  items-center md:items-start justify-center gap-10 md:flex-row  ' >
      <div className='w-full md:w-1/2 flex justify-center'>
     
        <div className='w-[500px] px-10 py-10  flex  flex-col gap-4 rounded-2xl  bg-gray-900  text-black shadow-2xl'>
         <div className='flex flex-col gap-2'>
          <label className='block text-white'>FirstName </label>
        <input type="text" value={firstName} onChange={(e)=> setFirstName(e.target.value)} className='bg-gray-300 rounded px-4 w-full py-2'></input>
        </div>
        <div className='flex flex-col gap-2'>
           <label className='block text-white'>LastName </label>
        <input type="text" value={lastName} onChange={(e)=> setLastName(e.target.value)} className='bg-gray-300 rounded px-4 w-full py-2'></input>
        </div>
         <div className='flex items-center gap-20'>
          <div className='flex flex-col gap-2'>
            <label className='block  text-white'>Age</label>
          <input type="text" value={age} onChange={(e)=> setAge(e.target.value)} className='bg-gray-300 rounded px-4 w-full py-2'></input>
          </div>
        <div className='flex flex-col gap-2'>
           <label className='block  text-white'>Gender</label>
          <select value={gender} onChange={(e)=>setGender(e.target.value)} className='bg-gray-300  px-4 py-2'>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Others">Others</option>
          </select>

         </div>
         
        </div>
       <div className='flex flex-col gap-2'>
          <label className='block  text-white'>About</label>
          <textarea type="textarea"  value={about} onChange={(e)=> setAbout(e.target.value)} className='bg-gray-300 block px-6 py-3 rounded-lg w-[300px] h-[100px]'></textarea>
        </div>
        <div className='flex flex-col gap-2'>
          <label className='block  text-white'>PhotoUrl</label>
          <input type="text" value={photourl} onChange={(e)=> setPhotourl(e.target.value)} className='bg-gray-300 rounded px-4 w-full py-2'></input>
         </div>
         <div className='text-red-500 break-words'>{error}</div>
         
         <div className='flex flex-col gap-2'>
          <label className='text-white  text-lg'>Skills ( enter top 4  )</label>
          <input type="text" value={skillValue} className='bg-gray-300 rounded px-4 w-full py-2'
           onChange={(e)=>{setSkillValue(e.target.value)}} 
           onKeyDown={(e)=>{
            if(e.key==="Enter"){
              if(skills.length>3){
                setSkillValue("")
                return
              }
              if(skillValue.trim().length>0)
              {
              setSKills([...skills,skillValue])}
              setSkillValue("")
            }
          }} ></input>
          <div className='flex  mt-1 flex-wrap gap-3'>
            {skills.map((skill,i)=>{
              return (
                <div key={i} className='text-white px-3 py-1 rounded-full border flex items-center gap-2 border-designColor'>
                 <h1> {skill} </h1>
                 <h1 onClick={()=>{handleRemoveSkill(i)}} className='text-lg'><MdCancel/></h1>
                  </div>
              )
            })}
          </div>
          <div className='flex justify-center mt-2'>
            <button onClick={handleSaveProfile} className='bg-blue-500 hover:bg-blue-600 font-semibold text-white rounded-lg px-4 py-2'>Save Profile</button>
         </div>
         </div>

      </div>
      </div>
      <div className='w-full sm:w-1/2 flex justify-center items-center  '>
        <div>
         <UserCard user={{firstName,lastName,age,gender,about,photourl,skills}}/>
      </div>
      </div>
    </div>

    
 </>
  )
}

export default ProfileEdit