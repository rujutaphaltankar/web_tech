import "./globals.css";

export const metadata = {
  title: "Next.js Blog",
  description:
    "Blog application demonstrating SSG, ISR, SSR and React Server Components",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <header className="header">
          <h1>Next.js Blog</h1>
          <nav>
            <a href="/">Home</a>
            <a href="/posts">Blog Posts</a>
            <a href="/dashboard">Dashboard</a>
          </nav>
        </header>

        <main className="container">{children}</main>

        <footer className="footer">
          Next.js Rendering Strategies Assignment
        </footer>
      </body>
    </html>
  );
}