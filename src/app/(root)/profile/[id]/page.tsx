import { fetchUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import React from "react";

async function Page({ params }: { params: { id: string } }) {
  const user = await currentUser();

  if (!user) return null;

  const userInfo = await fetchUser(params.id);
  console.log("userInfo: ", userInfo);
  if (!userInfo?.onboarded) redirect("/onboarding");

  return <section></section>;
}

export default Page;
