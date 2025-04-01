import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

function useUser() {
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  const getCurrentUser = async () => {
    try {
      const res = await axios.get("/api/user");

      if (res.data.redirect) {
        router.push(res.data.redirect);
      }

      setUser(res.data.userInfo);
    } catch (error) {
      console.log("Failed to fetch user", error);
    }
  };

  return { getCurrentUser, user };
}

export default useUser;
