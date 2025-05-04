"use client";

import useLikes from "@/hooks/useLikes";
import { formatDateString } from "@/lib/utils";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

interface PropsTypes {
  id: string;
  currentUserId: string;
  parentId: string | null;
  content: string;
  author: {
    _id?: string;
    id: string;
    name: string;
    image: string;
  };
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
  isComment,
}: PropsTypes) {
  const {
    hasCurrentUserLiked,
    createLike,
    deleteLike,
    checkIfUserLiked,
    fetchCurrentThreadLikes,
    totalLikes,
  } = useLikes();

  useEffect(() => {
    checkIfUserLiked(currentUserId, id);
  }, [currentUserId, id]);

  useEffect(() => {
    fetchCurrentThreadLikes(id);
  }, [id, createLike, deleteLike]);

  return (
    <article
      className={`flex w-full flex-col rounded-xl bg-dark-2 p-7 ${
        isComment ? "px-0 xs:px-7" : "bg-transparent p-0"
      }`}
    >
      <div className="flex item-start justify-between">
        <div className="flex w-full flex-1 flex-row gap-4">
          <div className="flex flex-col items-center">
            <Link href={`/profile/${author.id}`} className="relative h-11 w-11">
              <Image
                src={author.image}
                alt="Profile Image"
                fill
                className="rounded-full object-cover"
              />
            </Link>
            <div className="thread-card_bar" />
          </div>
          <div className="flex w-full flex-col">
            <Link href={`/profile/${author.id}`}>
              <h4 className="cursor-pointer text-base-semibold text-light-1">
                {author.name}
              </h4>
            </Link>
            <p className="mt-2 text-small-regular text-light-2">{content}</p>
            <div className="mt-5 flex flex-col gap-3">
              <div className="flex gap-3.5 items-center">
                <Image
                  src={`/assets/heart-${
                    hasCurrentUserLiked ? "filled" : "gray"
                  }.svg`}
                  alt="heart"
                  width={24}
                  height={24}
                  className={`cursor-pointer object-contain transition-transform duration-300 ${
                    hasCurrentUserLiked ? "scale-110" : "scale-100"
                  }`}
                  onClick={() =>
                    hasCurrentUserLiked
                      ? deleteLike(currentUserId, id)
                      : createLike(currentUserId, id)
                  }
                />
                {totalLikes > 0 && (
                  <p className="text-white text-small-regular">{totalLikes}</p>
                )}
                <Link href={`/thread/${id}`}>
                  <Image
                    src="/assets/reply.svg"
                    alt="reply"
                    width={24}
                    height={24}
                    className="cursor-pointer object-contain"
                  />
                </Link>
                <Image
                  src="/assets/repost.svg"
                  alt="repost"
                  width={24}
                  height={24}
                  className="cursor-pointer object-contain"
                />
                <Image
                  src="/assets/share.svg"
                  alt="share"
                  width={24}
                  height={24}
                  className="cursor-pointer object-contain"
                />
              </div>
              {isComment && comments.length > 0 && (
                <Link href={`/thread/${id}`}>
                  <p className="mt-1 text-subtle-medium text-gray-1">{`${comments.length} replies`}</p>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
      <Link
        href={`/communities/${community?.id}`}
        className="mt-5 flex items-center"
      >
        <p className="text-subtle-medium text-gray-1">
          {formatDateString(createdAt)}
          {community && ` - ${community.name} Community`}
        </p>
        {isComment && community && (
          <Image
            src={community.image}
            alt={community?.name}
            width={14}
            height={14}
            className="ml-1 rounded-full object-cover"
          />
        )}
      </Link>
    </article>
  );
}

export default ThreadCard;
