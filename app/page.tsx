import { Home } from "@/components/Home";
import { getAllPosts } from "@/lib/posts";
import { Post } from "@/components/bento/PostList";

export default function Page() {
  // Fetch posts on the server
  const allPosts = getAllPosts();
  const latestPosts = allPosts.slice(0, 3);

  return <Home latestPosts={latestPosts} />;
}
