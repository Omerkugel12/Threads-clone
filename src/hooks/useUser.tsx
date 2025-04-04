import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

function useUser() {
  const [user, setUser] = useState<any>(null);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState<{ getUsers: boolean }>({
    getUsers: false,
  });

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

  async function getUsers() {
    setLoading((prevState) => {
      return { ...prevState, getUsers: true };
    });
    try {
      const res = await axios.get(
        `/api/fetchUsers?userId=${user?.id}&page=1&limit=25&searchString=`
      );

      setUsers(res.data.res.users);
      setLoading((prevState) => {
        return { ...prevState, getUsers: false };
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading((prevState) => {
        return { ...prevState, getUsers: false };
      });
    }
  }

  return { getCurrentUser, user, getUsers, users, loading };
}

export default useUser;
