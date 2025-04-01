"use client";

import ThreadCard from "@/components/cards/ThreadCard";
import { fetchPosts } from "@/lib/actions/thread.actions";
import { fetchUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs/server";
import { redirect, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import { Skeleton } from "@/components/ui/skeleton";

function Home() {
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  async function getUser() {
    try {
      const res = await axios.get("/api/user");

      if (res.data.redirect) {
        router.push(res.data.redirect);
      }

      setUser(res.data.userInfo);
    } catch (error) {
      console.log("Failed to fetch user", error);
    }
  }

  async function getPosts() {
    setLoading(true);
    try {
      const res = await axios.get("/api/fetchPosts?page=1&limit=5");

      setPosts(res.data.res.posts);
      setLoading(false);
    } catch (error) {
      console.log("Failed fetch posts", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getUser();
    getPosts();
  }, []);

  return (
    <main>
      <h1 className="head-text text-left">Home</h1>

      <section className="mt-9 flex flex-col gap-10">
        {loading && (
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
        )}
        <>
          {posts.length === 0 ? (
            <p>No Threads found</p>
          ) : (
            <>
              {posts.map((post: any) => {
                return (
                  <ThreadCard
                    key={post._id}
                    id={post._id}
                    currentUserId={user?.id}
                    parentId={post.parentId}
                    content={post.text}
                    author={post.author}
                    community={post.community}
                    createdAt={post.createdAt}
                    comments={post.children}
                    isComment={true}
                  />
                );
              })}
            </>
          )}
        </>
      </section>
    </main>
  );
}

export default Home;
