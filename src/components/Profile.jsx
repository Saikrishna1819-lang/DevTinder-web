import React from 'react'
import { useSelector } from 'react-redux';

import ProfileEdit from './ProfileEdit';
import Spinner from './Spinner';

const Profile = () => {
  const user=useSelector(store=> store.user);
  if(!user)
  {
    return (
      <>
      <Spinner/>
      <div className=''>
        <h1 className='text-2xl text-white text-center md:text-3xl lg:text-4xl mt-10 font-bold '>Loding....</h1>
      </div>
      </>
    )
  }
 
  return user&&(
    <div className='w-full min-h-screen  '>
    <ProfileEdit user={user}/>
      
        
     
      
    </div>
  )
}


export default Profile;





