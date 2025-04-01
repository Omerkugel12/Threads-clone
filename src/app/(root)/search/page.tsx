"use client";

import UserCard from "@/components/cards/UserCard";
import { fetchUser, fetchUsers } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs/server";
import axios from "axios";
import { redirect, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

function Page() {
  const [userInfo, setUserInfo] = useState<any>();
  const [users, setUsers] = useState([]);
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function getUser() {
    try {
      const res = await axios.get("/api/user");

      if (res.data.redirect) {
        router.push(res.data.redirect);
      }

      setUserInfo(res.data.userInfo);
    } catch (error) {
      console.log("Failed to fetch user", error);
    }
  }

  async function getUsers() {
    try {
      const res = await axios.get(
        `/api/fetchUsers?userId=${userInfo?.id}&page=1&limit=25&searchString=`
      );

      setUsers(res.data.res.users);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getUser();
    getUsers();
  }, []);

  useEffect(() => {}, [userInfo]);

  return (
    <section>
      <h1 className="head-text mb-10">Search</h1>

      <div className="mt-14 flex flex-col gap-9">
        {users?.length === 0 ? (
          <p className="no-result">No users found</p>
        ) : (
          <>
            {users?.map((person: any) => (
              <UserCard
                key={person.id}
                id={person.id}
                name={person.name}
                username={person.username}
                imgUrl={person.image}
                personType="User"
              />
            ))}
          </>
        )}
      </div>
    </section>
  );
}

export default Page;
