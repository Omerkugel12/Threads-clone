import React from "react";

interface PropsTypes {
  id: string;
  currentUserId: string;
  parentId: string | null;
  content: string;
  author: string;
  community: {
    id: string;
    name: string;
    image: string;
  } | null;
  createdAt: string;
  comments: {
    author: {
      image: string;
    };
  }[];
  isComment?: boolean;
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
  return (
    <article>
      <h2 className="text-small-regular text-light-2">{content}</h2>
    </article>
  );
}

export default ThreadCard;
