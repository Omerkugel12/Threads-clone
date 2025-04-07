// scripts/seedUsers.ts

import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "../models/user.model.ts"; // adjust path based on your project

dotenv.config();

const MONGODB_URL = process.env.MONGODB_URL || "";

const users = Array.from({ length: 30 }, (_, index) => ({
  id: `user${index + 1}`,
  username: `user${index + 1}`,
  name: `User ${index + 1}`,
  image: `https://i.pravatar.cc/150?img=${index + 1}`,
  bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed faucibus, arcu sed aliquet pharetra, quam neque ultricies mi, at ultricies arcu ex in neque.",
  threads: [],
  onboarded: false,
  communities: [],
}));

const seed = async () => {
  console.log(
    "process.env.MONGODB_URLllllllllllllllllll: ",
    process.env.MONGODB_URL
  );
  try {
    await mongoose.connect(
      "mongodb+srv://omerkugel12:DWrBZr9JvGHjPGqF@cluster0.mszwmyg.mongodb.net/test?retryWrites=true&w=majority&appName=Cluster0"
    );
    console.log("Connected to MongoDB");

    const userIdsToKeep = [
      "67dc0f68ce2f5f85f1f34c2a",
      "67dd8d77ce2f5f85f1f6cb27",
    ];

    // await User.deleteMany({ _id: { $nin: userIdsToKeep } });
    // console.log("Old users removed");

    const createdUsers = await User.insertMany(users);
    console.log(`${createdUsers.length} users inserted.`);

    process.exit(0);
  } catch (err) {
    console.error("Seeding failed", err);
    process.exit(1);
  }
};

seed();
