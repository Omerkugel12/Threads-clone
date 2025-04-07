"use client";

import CommunityCard from "@/components/cards/CommunityCard";
import UserCard from "@/components/cards/UserCard";
import Pagination from "@/components/shared/Pagination";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import useCommunity from "@/hooks/useCommunity";
import useUser from "@/hooks/useUsers";
import { fetchCommunities } from "@/lib/actions/community.actions";
import { fetchUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs/server";
import { CircularProgress } from "@mui/material";
import { redirect, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

function Page() {
  const { user, getCurrentUser } = useUser();
  const { getCommunities, communities, loading, totalPages } = useCommunity();

  const router = useRouter();
  const searchParams = useSearchParams();

  const pageNumber = Number(searchParams.get("pageNumber") || 1);
  const searchString = searchParams.get("search") || "";

  useEffect(() => {
    getCurrentUser();
  }, [getCurrentUser]);

  useEffect(() => {
    getCommunities({ pageNumber, searchString });
  }, [pageNumber, searchString]);

  const handleSearchChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("search", value);
    params.set("pageNumber", "1");

    router.push(`?${params.toString()}`);
  };

  return (
    <section>
      <h1 className="head-text mb-10">Communities</h1>
      <Input
        type="text"
        value={searchString}
        onChange={(e) => handleSearchChange(e.target.value)}
        placeholder="Enter community name..."
        className="searchbar_input"
      />

      {communities.length > 0 && (
        <Pagination
          pageNumber={pageNumber}
          searchParams={searchParams}
          totalPages={totalPages}
        />
      )}

      <div className="mt-14 flex flex-col gap-9">
        {loading.getCommunities ? (
          <div className="flex justify-center items-center flex-col gap-10">
            {Array.from({ length: 7 }).map((_, index) => (
              <div key={index} className="flex items-center space-x-4 w-full">
                <Skeleton className="h-12 w-12 rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-[250px]" />
                  <Skeleton className="h-4 w-[200px]" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <>
            {communities?.length === 0 ? (
              <p className="no-result">No communities found</p>
            ) : (
              <>
                {communities?.map((community: any) => (
                  <CommunityCard
                    key={community.id}
                    id={community.id}
                    name={community.name}
                    username={community.username}
                    imgUrl={community.image}
                    bio={community.bio}
                    members={community.members}
                  />
                ))}
              </>
            )}
          </>
        )}
      </div>
      {communities.length > 0 && (
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
