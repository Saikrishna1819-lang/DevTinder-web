import axios from 'axios';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { BASE_URL } from '../utils/constants';

const Login = () => {
    const user=useSelector(store=> store.user);
    const navigate=useNavigate();
    if(user){
        navigate("/")
    }
    
   

    const dispatch=useDispatch();
    const [isLogin,setIsLogin]=useState(true);
    const [emailId,setEmailId]=useState("");
    const [firstName,setFirstName]=useState("");
    const [lastName,setLastName]=useState("");

    const [error,setError]=useState("");
    
    const [password,setPassword]=useState("")
    const handleSignUp=async()=>{
        try{
            const res= await axios.post(BASE_URL+"/signup",{firstName,lastName,emailId,password},{withCredentials:true});
            console.log(res)
             dispatch(addUser(res.data.data))
            navigate("/profile")



        }catch(err){
             setError(err.response.data?.message||"Something went wrong");
        }


    }
    const handleLogin=async()=>{
        try{
            const res=await axios.post(BASE_URL+"/login",
                {emailId:emailId,password},{withCredentials:true})
                console.log(res)
            dispatch(addUser(res.data))
            navigate("/")
           


        }
        catch(err){ 
            setError(err.response.data?.message||"Something went wrong");
       
    
  
            
        }
        

    }
    // if(user) return
  return (
    <div className='flex w-full  justify-center mt-10' >
   
        <div className='bg-base-300 px-10 py-10  flex flex-col gap-3 rounded-2xl '>
            <div className=' font-bold text-2xl'>{isLogin?"Login":"Sign Up"}</div>
            {!isLogin&&<>
            <label className='block text-gray-400'>First Name</label>
            <input type="text" value={firstName} className='px-3 py-3 rounded-md shadow-2xl bg-base-100' onChange={(e)=>setFirstName(e.target.value)}></input>
            <label className='block text-gray-400'>Last Name</label>
            <input type="text" value={lastName} className='px-3 py-3 rounded-md shadow-2xl bg-base-100' onChange={(e)=>setLastName(e.target.value)}></input></>
            }
            <label className='block text-gray-400'>Email</label>
            <input type="email" value={emailId} className='px-3 py-3 rounded-md shadow-2xl bg-base-100' onChange={(e)=>setEmailId(e.target.value)}></input>
             <label className='block text-gray-400'>Password</label>
            <input type="password" value={password} className='px-6 py-3 mb-1 rounded-md shadow-2xl bg-base-100' onChange={(e)=>setPassword(e.target.value)}></input>
            <p className='text-red-500 mb-1'>{error}</p>
            <button onClick={isLogin?handleLogin:handleSignUp} className='bg-blue-500 hover:bg-blue-600 text-lg font-semibold px-4 py-2 rounded-md w-full block'>{isLogin?"Login":"Sign Up"}</button>
            {isLogin?<p>Don't have an account? <span className='cursor-pointer text-blue-500' onClick={()=> setIsLogin(value=> !value)}>Sign up </span></p>:<p>Have an account?<span className='cursor-pointer text-blue-500' onClick={()=> setIsLogin(value=> !value)}>Log in</span></p>}
            
            
        </div>
    
    </div>
   
  )
}

export default Login
