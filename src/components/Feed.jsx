import axios from "axios";
import UserCard from "./UserCard";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import { BASE_URL } from "../utils/constants";

const Feed=()=>{
    
   const dispatch=useDispatch();
   const feed=useSelector(state=> state.feed);
    const getFeed=async()=>{
        if(feed) return 
         try {
    const res = await axios.get(BASE_URL, {
      withCredentials: true,
    });
    console.log("Response:", res);
    dispatch(addFeed(res.data?.users));

  } catch (err) {
    console.error("Fetch error:", err);
  }
    }
    useEffect(()=>{
        getFeed();
    },[])
   if(!feed) return (
    <div>
            <h1 className='text-2xl font-bold text-center mt-20' >Loading ....</h1>
    </div>
   )
   if(feed.length==0) return (
    <div>
            <h1 className='text-2xl font-bold text-center mt-20' >Feed is empty</h1>
        </div>
   )

    return feed&&(
       <div className="flex justify-center mt-10">
        <UserCard user={feed[0]}/>
       </div>
    )
}
export default Feed;