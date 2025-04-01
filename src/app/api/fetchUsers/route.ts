import { fetchUsers } from "@/lib/actions/user.actions";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    const pageNumber = Number(searchParams.get("page") || "1");
    const pageSize = Number(searchParams.get("limit") || "25");
    const searchString = searchParams.get("searchString") || "";
    const userId = searchParams.get("userId") || "";

    const res = await fetchUsers({
      userId,
      pageNumber,
      pageSize,
      searchString,
    });

    return NextResponse.json({ res });
  } catch (error) {
    return NextResponse.json(
      { error: `Failed to fetxh users ${error}` },
      { status: 500 }
    );
  }
}
