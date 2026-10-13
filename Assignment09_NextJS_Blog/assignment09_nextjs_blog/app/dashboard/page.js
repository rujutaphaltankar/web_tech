import { getUserDashboard } from "../../lib/data";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const user = await getUserDashboard();

  const requestTime = new Date().toLocaleString("en-IN", {
    dateStyle: "medium",
    timeStyle: "medium",
  });

  return (
    <section>
      <p className="tag">SERVER-SIDE RENDERING</p>
      <h2>User Dashboard</h2>
      <p className="description">
        This page is dynamically rendered on the server using a React Server
        Component.
      </p>

      <div className="dashboard-card">
        <h3>Welcome, {user.name}!</h3>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Role:</strong> {user.role}</p>
        <p><strong>Total Blog Posts:</strong> {user.totalPosts}</p>
        <p><strong>Server Render Time:</strong> {requestTime}</p>
      </div>

      <a href="/posts">Browse Blog Posts →</a>
    </section>
  );
}