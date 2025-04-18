"use server";

import { revalidatePath } from "next/cache";
import Thread from "../models/thread.model";
import User from "../models/user.model";
import { connectToDB } from "../mongoose";
import mongoose from "mongoose";
import Community from "../models/community.model";

interface Params {
  text: string;
  author: string;
  communityId: string | null;
  path: string;
}

export async function createThread({
  text,
  author,
  communityId,
  path,
}: Params) {
  try {
    connectToDB();

    const community = await Community.findOne({ id: communityId });

    const createdThread = await Thread.create({
      text,
      author,
      community: community,
    });

    await User.findByIdAndUpdate(author, {
      $push: { threads: createdThread._id },
    });

    if (community) {
      await Community.findByIdAndUpdate(community._id, {
        $push: { threads: createdThread._id },
      });
    }

    revalidatePath(path);
  } catch (error: any) {
    throw new Error(`Failed to create thread: ${error.message}`);
  }
}

export async function fetchPosts(pageNumber = 1, pageSize = 5) {
  try {
    connectToDB();

    const skipAmount = (pageNumber - 1) * pageSize;

    const postQuery = Thread.find({
      parentId: { $in: [null, undefined] },
    })
      .sort({ createdAt: "desc" })
      .populate({ path: "author", model: User })
      .populate({
        path: "children",
        populate: {
          path: "author",
          model: User,
          select: "_id name parentId image",
        },
      })
      .populate({
        path: "community",
        model: Community,
        select: "id name image",
      });

    const totalPostsCount = await Thread.countDocuments({
      parentId: { $in: [null, undefined] },
    });

    const posts = await postQuery.exec();

    const isNext = totalPostsCount > skipAmount + posts.length;

    return { posts, isNext };
  } catch (error: any) {
    throw new Error(`Failed to fetch posts: ${error.message}`);
  }
}

export async function fetchPostById(id: string) {
  try {
    connectToDB();

    const post = await Thread.findById(id)
      .populate({
        path: "author",
        model: User,
        select: "_id name image",
      })
      .populate({
        path: "community",
        model: Community,
        select: "id name image",
      })
      .populate({
        path: "children",
        populate: [
          {
            path: "author",
            model: User,
            select: "_id name parentId image",
          },
          {
            path: "children",
            model: "Thread",
            populate: {
              path: "author",
              model: "User",
              select: "_id name parentId image",
            },
          },
        ],
      });

    return post;
  } catch (error) {
    throw new Error(`Failed to fetch post: ${error}`);
  }
}

export async function addCommentToThread(
  threadId: string,
  commentText: string,
  userId: string,
  path: string
) {
  try {
    connectToDB();

    const originalThread = await Thread.findById(threadId);

    if (!originalThread) {
      throw new Error("Thread not found");
    }

    const commentThread = new Thread({
      text: commentText,
      author: userId,
      parentId: threadId,
    });

    const savedCommentThread = await commentThread.save();

    originalThread.children.push(savedCommentThread._id);

    await originalThread.save();

    revalidatePath(path);
  } catch (error: any) {
    throw new Error(`Failed to add comment to thread: ${error.message}`);
  }
}
