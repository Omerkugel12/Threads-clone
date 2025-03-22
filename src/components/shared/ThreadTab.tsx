import { fetchUserPosts } from "@/lib/actions/user.actions";
import React from "react";
import ThreadCard from "../cards/ThreadCard";

interface ThreadTabProps {
  currentUserId: string;
  accountId: string;
  accountType: string;
}

async function ThreadTab({
  currentUserId,
  accountId,
  accountType,
}: ThreadTabProps) {
  const result = await fetchUserPosts(accountId);

  return (
    <section className="mt-9 flex flex-col gap-10">
      {result.threads.map((thread: any) => {
        return (
          <ThreadCard
            key={thread._id}
            id={thread._id}
            currentUserId={currentUserId}
            parentId={thread.parentId}
            content={thread.text}
            author={
              accountType === "User"
                ? { name: result.name, image: result.image, id: result._id }
                : {
                    name: thread.author.name,
                    image: thread.author.image,
                    id: thread.author.id,
                  }
            }
            community={thread.community}
            createdAt={thread.createdAt}
            comments={thread.children}
            isComment={true}
          />
        );
      })}
    </section>
  );
}

export default ThreadTab;
