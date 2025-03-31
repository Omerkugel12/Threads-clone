import ThreadCard from "@/components/cards/ThreadCard";
import React from "react";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { fetchUser } from "@/lib/actions/user.actions";
import { fetchPostById } from "@/lib/actions/thread.actions";
import Comment from "@/components/forms/Comment";
import { Thread } from "@/types";

async function Page({ params }: { params: { id: string } }) {
  const user = await currentUser();
  if (!user) return null;

  const userInfo = await fetchUser(user.id);
  if (!userInfo.onboarded) redirect("/onboarding");

  const post = await fetchPostById(params.id);

  return (
    <section className="relative">
      <div>
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
      </div>
      <div className="mt-7">
        <Comment
          threadId={post._id}
          currentUserImg={userInfo.image}
          currentUserId={userInfo._id.toString()}
        />
      </div>
      <div className="mt-10">
        {post.children.map((childItem: any) => {
          return (
            <ThreadCard
              key={childItem._id}
              id={childItem._id}
              currentUserId={user?.id}
              parentId={childItem.parentId}
              content={childItem.text}
              author={childItem.author}
              community={childItem.community}
              createdAt={childItem.createdAt}
              comments={childItem.children}
              isComment={false}
            />
          );
        })}
      </div>
    </section>
  );
}

export default Page;
