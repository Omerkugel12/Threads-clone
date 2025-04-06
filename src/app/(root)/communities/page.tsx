"use client";

import CommunityCard from "@/components/cards/CommunityCard";
import UserCard from "@/components/cards/UserCard";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import useCommunity from "@/hooks/useCommunity";
import useUser from "@/hooks/useUsers";
import { fetchCommunities } from "@/lib/actions/community.actions";
import { fetchUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs/server";
import { CircularProgress } from "@mui/material";
import { redirect } from "next/navigation";
import React, { useEffect, useState } from "react";

function Page() {
  const { user, getCurrentUser } = useUser();
  const { getCommunities, communities, loading } = useCommunity();
  const [criteria, setCriteria] = useState<{
    pageNumber: number;
    searchString: string;
  }>({ pageNumber: 1, searchString: "" });

  useEffect(() => {
    getCurrentUser();
    getCommunities(criteria);
  }, [getCurrentUser, criteria]);

  return (
    <section>
      <h1 className="head-text mb-10">Communities</h1>
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
        placeholder="Enter community name..."
        className="searchbar_input"
      />

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
    </section>
  );
}

export default Page;
