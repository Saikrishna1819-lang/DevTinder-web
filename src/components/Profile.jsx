import React from 'react'
import { useSelector } from 'react-redux';

import ProfileEdit from './ProfileEdit';

const Profile = () => {
  const user=useSelector(store=> store.user);
  console.log(user);
  return user&&(
    <div className='flex mb-50 mt-10 gap-10 justify-center '>
    <ProfileEdit user={user}/>
      
        
     
      
    </div>
  )
}


export default Profile;





