const posts = [
  {
    id: "1",
    title: "Introduction to Artificial Intelligence",
    author: "Aarav",
    body: "Artificial Intelligence enables computers to perform tasks that normally require human intelligence. It is used in healthcare, education, robotics, and many other fields.",
  },
  {
    id: "2",
    title: "Understanding Machine Learning",
    author: "Riya",
    body: "Machine Learning is a branch of AI that allows systems to learn patterns from data and make predictions without being explicitly programmed for every task.",
  },
  {
    id: "3",
    title: "Getting Started with Next.js",
    author: "Aditya",
    body: "Next.js is a React framework that supports routing, server rendering, static generation, and full-stack web development.",
  },
];

export async function getPosts() {
  return posts;
}

export async function getPostById(id) {
  return posts.find((post) => post.id === id);
}

export async function getUserDashboard() {
  return {
    name: "Demo User",
    email: "demo@example.com",
    totalPosts: posts.length,
    role: "Student",
  };
}