import { UserButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <main>
      <h1 className="">Threads</h1>
      <UserButton afterSignOutUrl="/" />
    </main>
  );
}
