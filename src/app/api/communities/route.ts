import { fetchCommunities } from "@/lib/actions/community.actions";
import { SortOrder } from "mongoose";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    const pageNumber = Number(searchParams.get("page") || "1");
    const pageSize = Number(searchParams.get("limit") || "5");
    const searchString = searchParams.get("searchString") || "";
    const sortBy = (searchParams.get("sortBy") as SortOrder) || "desc";

    const res = await fetchCommunities({
      pageNumber,
      pageSize,
      searchString,
      sortBy,
    });

    return NextResponse.json({ res });
  } catch (error) {
    return NextResponse.json(
      { error: `Failed to fetch posts: ${error}` },
      { status: 500 }
    );
  }
}
