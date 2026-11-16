/** @type {import('next').NextConfig} */
const isGHPages = process.env.GITHUB_PAGES === "true";
const repoName  = process.env.REPO_NAME ?? "";

const nextConfig = {
  ...(isGHPages && {
    output: "export",
    basePath: repoName ? `/${repoName}` : "",
    trailingSlash: true,
  }),
  turbopack: {
    root: process.cwd()
  },
  images: {
    unoptimized: isGHPages,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com"
      },
      {
        protocol: "https",
        hostname: "cdn-new.obsidianui.dev"
      }
    ]
  },
  async redirects() {
    return [
      { source: "/blogs", destination: "/journal", permanent: true },
      { source: "/blog", destination: "/journal", permanent: true },
      { source: "/recent-projects", destination: "/projects", permanent: true },
      { source: "/get-free-consultation", destination: "/contact", permanent: false }
    ];
  }
};

export default nextConfig;
