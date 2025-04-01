import { fetchUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET() {
  const user = await currentUser();
  if (!user)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const userInfo = await fetchUser(user.id);
  if (!userInfo?.onboarded) {
    return NextResponse.json({ redirect: "/onboarding" });
  }

  return NextResponse.json({ userInfo });
}
