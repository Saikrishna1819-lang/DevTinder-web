import axios from 'axios';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/constants';
import { removeUser } from '../utils/userSlice';
import { removeTotalFeed } from '../utils/feedSlice';
import { removeConnections } from '../utils/connectionSlice';

const Navbar = () => {
   const dispatch=useDispatch();
   const navigate=useNavigate();
  const handleLogout=async()=>{
   
    try{
          await axios.post(BASE_URL+"/logout",{},{withCredentials:true})
          dispatch(removeTotalFeed());
          dispatch(removeUser());
          dispatch(removeConnections());
         
          navigate("/login");
          
    }catch(err){
      console.log(err);
    }

  }
  const user=useSelector(store=> store.user);
  return (
   <>
  
   <div className="navbar bg-base-300 shadow-sm">
  <div className="flex-1">
    <Link to="/" className="btn btn-ghost text-xl">DevTinder</Link>
  </div>
  {user&&
   <div className="flex gap-2 items-center">
    <div>{user.firstName}</div>
    <div className="dropdown dropdown-end mr-5">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
          <img
            alt="Tailwind CSS Navbar component"
            src={user.photourl?user.photourl:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQuhYaQUXZv9Fgs3YsocuEf1Vi4ydnXf7HLU9FY0liq7-NFo1nC7CIRw2jlAou1kICG5rk&usqp=CAU"} />
        </div>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
        <li>
          <Link to="/profile" className="justify-between">
            Profile
            <span className="badge">New</span>
          </Link>
        </li>
        <li><Link to="/connections">Connections</Link></li>
        <li><Link to="/requests">Requests</Link></li>
        <li><a  onClick={handleLogout}>Logout</a></li>

      </ul>
    </div>
  </div>}
</div>
   </>
  )
}

export default Navbar;