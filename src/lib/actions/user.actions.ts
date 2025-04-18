"use server";

import { revalidatePath } from "next/cache";
import User from "../models/user.model";
import { connectToDB } from "../mongoose";
import { FilterQuery, SortOrder } from "mongoose";
import Thread from "../models/thread.model";
import Community from "../models/community.model";

interface Params {
  userId: string;
  username: string;
  name: string;
  image: string;
  bio: string;
  path: string;
}

export async function updateUser({
  userId,
  username,
  name,
  image,
  bio,
  path,
}: Params): Promise<void> {
  connectToDB();

  try {
    await User.findOneAndUpdate(
      { id: userId },
      {
        username: username.toLowerCase(),
        name,
        image,
        bio,
        onboarded: true,
      },
      { upsert: true }
    );

    if (path === "/profile/edit") {
      revalidatePath("/profile");
    }
  } catch (error) {
    throw new Error(`Failed to create/update user: ${error}`);
  }
}

export async function fetchUser(userId: string) {
  try {
    connectToDB();

    return await User.findOne({ id: userId });
  } catch (error: any) {
    throw new Error(`Failed to fetch user: ${error.message}`);
  }
}

export async function fetchUserPosts(userId: string) {
  try {
    connectToDB();

    const userThreads = await User.findOne({ id: userId }).populate({
      path: "threads",
      model: Thread,
      populate: [
        { path: "community", model: "Community", select: "id name image" },
        {
          path: "children",
          model: "Thread",
          populate: {
            path: "author",
            model: "User",
            select: "name image id",
          },
        },
      ],
    });

    return userThreads;
  } catch (error: any) {
    throw new Error(`Failed to fetch user posts: ${error.message}`);
  }
}

export async function fetchUsers({
  userId,
  searchString = "",
  pageNumber = 1,
  pageSize = 20,
  sortBy = "asc",
}: {
  userId: string;
  searchString?: string;
  pageNumber?: number;
  pageSize?: number;
  sortBy?: SortOrder;
}) {
  try {
    connectToDB();

    const skipAmount = (pageNumber - 1) * pageSize;

    const regex = new RegExp(searchString, "i");

    const query: FilterQuery<typeof User> = {
      id: { $ne: userId },
    };

    if (searchString.trim() !== "") {
      query.$or = [
        { name: { $regex: regex } },
        { username: { $regex: regex } },
      ];
    }

    const sortOptions = { createdAt: sortBy, _id: sortBy };

    const usersQuery = User.find(query)
      .sort(sortOptions)
      .skip(skipAmount)
      .limit(pageSize);

    const totalUsersCount = await User.countDocuments(query);
    const totalPages = Math.ceil(totalUsersCount / pageSize);

    const users = await usersQuery.exec();

    const isNext = totalUsersCount > skipAmount + users.length;

    return { users, isNext, totalPages };
  } catch (error) {}
}

export async function getActivity(userId: string) {
  try {
    connectToDB();
    const userThreads = await Thread.find({ author: userId });

    const childThreadIds = userThreads.reduce((acc, userThread) => {
      return acc.concat(userThread.children);
    }, []);

    const replies = await Thread.find({
      _id: { $in: childThreadIds },
      author: { $ne: userId },
    }).populate({
      path: "author",
      model: "User",
      select: "name image _id",
    });

    return replies;
  } catch (error) {
    throw new Error(`Failed to fetch activity: ${error}`);
  }
}
