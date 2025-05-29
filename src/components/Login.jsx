import axios from 'axios';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/constants';

const Login = () => {
    
    const navigate=useNavigate();

    const dispatch=useDispatch();
    const [email,setEmail]=useState("krishnasai69219@gmail.com");
    const [error,setError]=useState("");
    console.log(email);
    const [password,setPassword]=useState("Sai@181911")
    const handleLogin=async()=>{
        try{
            const res=await axios.post(BASE_URL+"/login",
                {emailId:email,password},{withCredentials:true})
                console.log(res)
            dispatch(addUser(res.data))
            navigate("/")
           


        }
        catch(err){ 
            setError(err.response.data?.message||"Something went wrong");
       
    
  
            
        }
        

    }
  return (
    <div className='flex w-full  justify-center mt-20' >
   
        <div className='bg-base-300 px-10 py-10  flex flex-col gap-3 rounded-2xl '>
            <div className=' font-bold text-2xl'>Login</div>
            <label className='block text-gray-400'>Email</label>
            <input type="email" value={email} className='px-3 py-3 rounded-md shadow-2xl bg-base-100' onChange={(e)=>setEmail(e.target.value)}></input>
             <label className='block text-gray-400'>Password</label>
            <input type="password" value={password} className='px-6 py-3 mb-1 rounded-md shadow-2xl bg-base-100' onChange={(e)=>setPassword(e.target.value)}></input>
            <p className='text-red-500 mb-1'>{error}</p>
            <button onClick={handleLogin} className='bg-blue-500 hover:bg-blue-600 text-lg font-semibold px-4 py-2 rounded-md w-full block'>login</button>
            
        </div>
    
    </div>
   
  )
}

export default Login
