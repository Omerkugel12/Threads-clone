import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useCallback, useState } from "react";

function useUsers() {
  const [user, setUser] = useState<any>(null);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState<{ getUsers: boolean }>({
    getUsers: false,
  });
  const [totalPages, setTotalPages] = useState<number>();

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

  const getUsers = async ({
    pageNumber,
    searchString,
  }: {
    pageNumber: number;
    searchString: string;
  }) => {
    setLoading((prevState) => {
      return { ...prevState, getUsers: true };
    });
    try {
      const res = await axios.get(
        `/api/users?userId=${user?.id}&page=${pageNumber}&limit=10&searchString=${searchString}`
      );

      setUsers(res.data.res.users);
      setTotalPages(res.data.res.totalPages);
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
  };

  return { getCurrentUser, user, getUsers, users, loading, totalPages };
}

export default useUsers;
