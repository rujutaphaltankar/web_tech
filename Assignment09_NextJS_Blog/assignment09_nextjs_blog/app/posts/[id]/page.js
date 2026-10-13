import { getPostById, getPosts } from "../../../lib/data";
import { notFound } from "next/navigation";

export const revalidate = 60;

export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((post) => ({ id: post.id }));
}

export default async function PostDetails({ params }) {
  const { id } = await params;
  const post = await getPostById(id);

  if (!post) {
    notFound();
  }

  return (
    <article className="post-detail">
      <p className="tag">INCREMENTAL STATIC REGENERATION</p>
      <h2>{post.title}</h2>
      <p className="author">Written by {post.author}</p>
      <div className="post-body">
        <p>{post.body}</p>
      </div>
      <p className="description">
        This page is configured to revalidate every 60 seconds.
      </p>
      <a href="/posts">← Back to All Posts</a>
    </article>
  );
}