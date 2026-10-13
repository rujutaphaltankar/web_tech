import { getPosts } from "../../lib/data";

export const dynamic = "force-static";

export default async function PostsPage() {
  const posts = await getPosts();

  return (
    <section>
      <h2>All Blog Posts</h2>
      <p className="description">
        This page uses Static Site Generation (SSG).
      </p>

      <div className="post-grid">
        {posts.map((post) => (
          <article className="post-card" key={post.id}>
            <p className="tag">POST {post.id}</p>
            <h3>{post.title}</h3>
            <p>{post.body}</p>
            <p className="author">By {post.author}</p>
            <a href={`/posts/${post.id}`}>Read More →</a>
          </article>
        ))}
      </div>
    </section>
  );
}