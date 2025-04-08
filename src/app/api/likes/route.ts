import {
  createLike,
  deleteLike,
  fetchLikesOfThread,
} from "@/lib/actions/like.action";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
  const { userId, threadId } = body;
  try {
    const result = await createLike({ userId, threadId });

    if (result.success) {
      return NextResponse.json({
        message: "Like created seccessfully",
        like: result.like,
      });
    } else {
      return NextResponse.json({ message: result.message }, { status: 400 });
    }
  } catch (error) {
    return NextResponse.json(
      { message: "Error creating like" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  const body = await req.json();
  const { userId, threadId } = body;
  try {
    const result = await deleteLike({ userId, threadId });

    if (result.success) {
      return NextResponse.json({ message: "Like deleted successfully" });
    } else {
      return NextResponse.json({ message: result.message }, { status: 400 });
    }
  } catch (error) {
    console.error(`Error deleting like: ${error}`);
    return NextResponse.json(
      { message: "Error deleting like" },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const threadId = searchParams.get("threadId");

  if (!threadId) {
    return NextResponse.json({ message: "Missing threadId" }, { status: 400 });
  }

  try {
    const likes = await fetchLikesOfThread(threadId);

    return NextResponse.json({
      message: "Likes fetched successfully",
      likes,
      total: likes.length,
    });
  } catch (error) {
    console.error(`Error fetching likes of thread: ${error}`);
    return NextResponse.json(
      { message: "Error fetching likes of thread" },
      { status: 500 }
    );
  }
}
