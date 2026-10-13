export default function HomePage() {
  return (
    <section className="hero">
      <p className="tag">FULL-STACK WEB DEVELOPMENT</p>
      <h2>Welcome to the Next.js Blog</h2>
      <p>
        Explore a blog application demonstrating Static Site Generation,
        Incremental Static Regeneration, Server-Side Rendering, and React
        Server Components.
      </p>

      <div className="actions">
        <a className="button" href="/posts">
          Explore Posts
        </a>
        <a className="button secondary" href="/dashboard">
          View Dashboard
        </a>
      </div>
    </section>
  );
}