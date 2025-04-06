import { fetchPosts } from "@/lib/actions/thread.actions";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    const pageNumber = Number(searchParams.get("page") || "1");
    const pageSize = Number(searchParams.get("limit") || "5");

    const res = await fetchPosts(pageNumber, pageSize);

    return NextResponse.json({ res });
  } catch (error) {
    return NextResponse.json(
      { error: `Failed to fetch posts: ${error}` },
      { status: 500 }
    );
  }
}
