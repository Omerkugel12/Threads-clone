import ThreadCard from "@/components/cards/ThreadCard";
import { fetchPosts } from "@/lib/actions/thread.actions";
import { currentUser } from "@clerk/nextjs/server";

export default async function Home() {
  const result = await fetchPosts(1, 5);

  const user = await currentUser();
  if (!user) return null;

  return (
    <main>
      <h1 className="head-text text-left">Home</h1>

      <section className="mt-9 flex flex-col gap-10">
        {result.posts.length === 0 ? (
          <p>No Threads found</p>
        ) : (
          <>
            {/* {result.posts.map((post) => {
              return (
                <ThreadCard
                  key={post._id}
                  id={post._id}
                  currentUserId={user?.id}
                  parentId={post.parentId}
                  content={post.text}
                  author={post.author}
                  community={post.community}
                  createdAt={post.createdAt}
                  comments={post.children}
                  isComment={true}
                />
              );
            })} */}
          </>
        )}
      </section>
    </main>
  );
}
