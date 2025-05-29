import axios from "axios";
import UserCard from "./UserCard";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";

const Feed=()=>{
    
   const dispatch=useDispatch();
   const feed=useSelector(state=> state.feed);
    const getFeed=async()=>{
        if(feed) return 
         try {
    const res = await axios.get("http://localhost:3000/feed", {
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
    {feed&&console.log(feed[1]);}

    return feed&&(
       <div className="flex justify-center mt-10">
        <UserCard user={feed[1]}/>
       </div>
    )
}
export default Feed;