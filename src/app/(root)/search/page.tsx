"use client";

import UserCard from "@/components/cards/UserCard";
import Pagination from "@/components/shared/Pagination";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import useUsers from "@/hooks/useUsers";
import { useRouter, useSearchParams } from "next/navigation";

import React, { useEffect, useState } from "react";

function Page() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const pageNumber = Number(searchParams.get("pageNumber") || 1);
  const searchString = searchParams.get("search") || "";

  const { user, getCurrentUser, getUsers, users, loading, totalPages } =
    useUsers();

  useEffect(() => {
    getCurrentUser();
  }, [getCurrentUser]);

  useEffect(() => {
    getUsers({ pageNumber, searchString });
  }, [pageNumber, searchString]);

  const handleSearchChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("search", value);
    params.set("pageNumber", "1");

    router.push(`?${params.toString()}`);
  };

  return (
    <section>
      <h1 className="head-text mb-10">Search</h1>
      <Input
        type="text"
        value={searchString}
        onChange={(e) => handleSearchChange(e.target.value)}
        placeholder="Enter name or username..."
        className="searchbar_input"
      />

      {users.length > 0 && (
        <Pagination
          pageNumber={pageNumber}
          searchParams={searchParams}
          totalPages={totalPages}
        />
      )}

      <div className="mt-14 flex flex-col gap-9 overflow-auto">
        {loading.getUsers ? (
          <div className="flex justify-center items-center flex-col gap-10">
            {Array.from({ length: 7 }).map((_, index) => (
              <div key={index} className="flex items-center space-x-4 w-full">
                <Skeleton className="h-12 w-12 rounded-full" />
                <div className="space-y-2">
                  {users.length > 0 && (
                    <Pagination
                      pageNumber={pageNumber}
                      searchParams={searchParams}
                      totalPages={totalPages}
                    />
                  )}
                  <Skeleton className="h-4 w-[250px]" />
                  <Skeleton className="h-4 w-[200px]" />
                </div>
              </div>
            ))}
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
      {users.length > 0 && (
        <Pagination
          pageNumber={pageNumber}
          searchParams={searchParams}
          totalPages={totalPages}
        />
      )}
    </section>
  );
}

export default Page;
