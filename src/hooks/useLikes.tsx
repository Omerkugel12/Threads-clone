import axios from "axios";
import React, { useState } from "react";

function useLikes() {
  const [hasCurrentUserLiked, setHasCurrentUserLiked] =
    useState<boolean>(false);
  const [totalLikes, setTotalLikes] = useState<number>(0);

  async function createLike(userId: string, threadId: string) {
    try {
      const res = await axios.post(`/api/likes`, {
        userId,
        threadId,
      });
      setHasCurrentUserLiked(true);
    } catch (error) {
      console.log(error);
    }
  }

  async function deleteLike(userId: string, threadId: string) {
    try {
      const res = await axios.delete(`api/likes`, {
        data: { userId, threadId },
      });
      setHasCurrentUserLiked(false);
    } catch (error) {
      console.log(error);
    }
  }

  async function checkIfUserLiked(userId: string, threadId: string) {
    try {
      const res = await axios.post("/api/checkIfUserLike", {
        userId,
        threadId,
      });
      setHasCurrentUserLiked(res.data.result);
      return res;
    } catch (error) {
      console.log(error);
    }
  }

  async function fetchCurrentThreadLikes(threadId: string) {
    try {
      const res = await axios.get(`/api/likes?threadId=${threadId}`);
      console.log("res: ", res);

      setTotalLikes(res.data.total);
    } catch (error) {
      console.log(error);
    }
  }

  return {
    hasCurrentUserLiked,
    createLike,
    deleteLike,
    checkIfUserLiked,
    fetchCurrentThreadLikes,
    totalLikes,
  };
}

export default useLikes;
