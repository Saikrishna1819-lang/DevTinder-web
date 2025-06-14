import axios from "axios";
import UserCard from "./UserCard";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import { BASE_URL } from "../utils/constants";
import Spinner from "./Spinner";

const Feed = () => {
  const user = useSelector(store => store.user);

  const dispatch = useDispatch();
  const feed = useSelector(state => state.feed);
  const getFeed = async () => {
    if (feed) return
    try {
      const res = await axios.get(BASE_URL + "/feed", {
        withCredentials: true,
      });

      dispatch(addFeed(res.data?.users));

    } catch (err) {
      console.error("Fetch error:", err);
    }
  }
  useEffect(() => {
    if (user) {
      getFeed();
    }
  }, [user])

  if (!feed) return (
    <>
      <Spinner />
    </>

  )
  if (feed.length == 0) return (
    <div>
      <h1 className='text-2xl md:text-3xl lg:text-4xl text-white font-bold text-center mt-20' >Feed is empty</h1>
    </div>
  )

  return feed && (
    <div className="flex justify-center pt-20">
      <UserCard user={feed[0]} />
    </div>
  )
}
export default Feed;