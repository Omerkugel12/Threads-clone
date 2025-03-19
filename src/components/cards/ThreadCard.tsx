import React from "react";

interface PropsTypes {
  id: string;
  currentUserId: string;
  parentId: string | null;
  content: string;
  author: string;
  community: string;
  createdAt: string;
  comments: {
    author: string;
    body: string;
    createdAt: string;
    id: string;
    parentId: string | null;
    children: {};
  };
}

function ThreadCard({
  id,
  author,
  comments,
  community,
  content,
  createdAt,
  currentUserId,
  parentId,
}: PropsTypes) {
  return <div></div>;
}

export default ThreadCard;
