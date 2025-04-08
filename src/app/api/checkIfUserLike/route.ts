import { checkIfUserLike } from "@/lib/actions/like.action";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
  const { userId, threadId } = body;
  try {
    const result = await checkIfUserLike({
      userId,
      threadId,
    });
    return NextResponse.json({ result });
  } catch (error: any) {
    console.error("Error checking like status:", error);
    return NextResponse.json(
      { message: error.message || "An error occurred" },
      { status: 500 }
    );
  }
}
