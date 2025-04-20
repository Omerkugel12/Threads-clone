"use server";

import mongoose from "mongoose";
import Like from "../models/like.model";
import { connectToDB } from "@/lib/mongoose";

export async function createLike({
  userId,
  threadId,
}: {
  userId: string;
  threadId: string;
}) {
  try {
    await connectToDB();

    const hasAlreadyLiked = await Like.findOne({ userId, threadId });

    if (hasAlreadyLiked) {
      return { success: false, message: "Thread was already liked" };
    } else {
      const newLike = await Like.create({ userId, threadId });

      return { success: true, like: newLike };
    }
  } catch (error: any) {
    if (error.code === 11000) {
      return { success: false, message: "Already liked." };
    }
    return { success: false, message: error.message };
  }
}

export async function fetchLikesOfThread(threadId: string) {
  try {
    await connectToDB();

    const objectId = new mongoose.Types.ObjectId(threadId);

    const likes = await Like.find({ threadId: objectId }).populate({
      path: "userId",
      model: "User",
    });

    return likes;
  } catch (error: any) {
    return [];
  }
}

export async function deleteLike({
  userId,
  threadId,
}: {
  userId: string;
  threadId: string;
}) {
  try {
    await connectToDB();

    const hasAlreadyLiked = await Like.findOne({ userId, threadId });

    if (hasAlreadyLiked) {
      await Like.findOneAndDelete({ userId, threadId });
      return { success: true };
    } else {
      return { success: false };
    }
  } catch (error: any) {
    return { success: false, message: error.message };
  }
}

export async function checkIfUserLike({
  userId,
  threadId,
}: {
  userId: string;
  threadId: string;
}) {
  try {
    await connectToDB();

    const like = await Like.findOne({ userId, threadId });

    return !!like;
  } catch (error) {
    return false;
  }
}
