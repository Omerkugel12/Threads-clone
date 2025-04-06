import { loadingPostsState } from "@/store/loading-posts";
import axios from "axios";
import React, { useCallback, useState } from "react";
import { useRecoilState } from "recoil";

function useThreads() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useRecoilState(loadingPostsState);

  const getPosts = useCallback(async () => {
    setLoading((prevState) => {
      return { ...prevState, getPosts: true };
    });
    try {
      const res = await axios.get("/api/fetchPosts?page=1&limit=5");

      setPosts(res.data.res.posts);
      setLoading((prevState) => {
        return { ...prevState, getPosts: false };
      });
    } catch (error) {
      console.log("Failed fetch posts", error);
    } finally {
      setLoading((prevState) => {
        return { ...prevState, getPosts: false };
      });
    }
  }, []);
  return { getPosts, posts, loading };
}

export default useThreads;
