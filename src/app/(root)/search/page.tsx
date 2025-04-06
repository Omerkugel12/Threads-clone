"use client";

import UserCard from "@/components/cards/UserCard";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import useUsers from "@/hooks/useUsers";

import React, { useEffect, useState } from "react";

function Page() {
  const { user, getCurrentUser, getUsers, users, loading } = useUsers();
  const [criteria, setCriteria] = useState<{
    pageNumber: number;
    searchString: string;
  }>({
    pageNumber: 1,
    searchString: "",
  });

  useEffect(() => {
    getCurrentUser();
    getUsers(criteria);
  }, [getCurrentUser, criteria]);

  return (
    <section>
      <h1 className="head-text mb-10">Search</h1>
      <Input
        type="text"
        value={criteria.searchString}
        onChange={(e) =>
          setCriteria({
            ...criteria,
            pageNumber: 1,
            searchString: e.target.value,
          })
        }
        placeholder="Enter name or username..."
        className="searchbar_input"
      />

      <div className="mt-14 flex flex-col gap-9">
        {loading.getUsers ? (
          <div className="flex justify-center items-center flex-col gap-10">
            <div className="flex items-center space-x-4 w-full">
              <Skeleton className="h-12 w-12 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-[250" />
                <Skeleton className="h-4 w-[200px]" />
              </div>
            </div>
            <div className="flex items-center space-x-4 w-full">
              <Skeleton className="h-12 w-12 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-[250" />
                <Skeleton className="h-4 w-[200px]" />
              </div>
            </div>
            <div className="flex items-center space-x-4 w-full">
              <Skeleton className="h-12 w-12 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-[250" />
                <Skeleton className="h-4 w-[200px]" />
              </div>
            </div>
            <div className="flex items-center space-x-4 w-full">
              <Skeleton className="h-12 w-12 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-[250" />
                <Skeleton className="h-4 w-[200px]" />
              </div>
            </div>
            <div className="flex items-center space-x-4 w-full">
              <Skeleton className="h-12 w-12 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-[250" />
                <Skeleton className="h-4 w-[200px]" />
              </div>
            </div>
            <div className="flex items-center space-x-4 w-full">
              <Skeleton className="h-12 w-12 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-[250" />
                <Skeleton className="h-4 w-[200px]" />
              </div>
            </div>
            <div className="flex items-center space-x-4 w-full">
              <Skeleton className="h-12 w-12 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-[250" />
                <Skeleton className="h-4 w-[200px]" />
              </div>
            </div>
          </div>
        ) : (
          <>
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
          </>
        )}
      </div>
    </section>
  );
}

export default Page;
