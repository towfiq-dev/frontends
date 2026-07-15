/** @type {import('next').NextConfig} */
const nextConfig = {
  //reactCompiler: true,

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ghchart.rshah.org",
      },
      // Dashboard-managed images (projects, institution logos, certificates)
      // are pasted-in URLs from anywhere (Imgur, Cloudinary, etc.), so we
      // can't know the host ahead of time. "**" allows any HTTPS host.
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },

  // Canonical domain — prevents duplicate content from www vs non-www
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Robots-Tag",
            value: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
        ],
      },
      // Cache static assets for performance (Core Web Vitals = ranking factor)
      {
        source: "/(.*)\\.(jpg|jpeg|png|webp|avif|svg|ico|woff|woff2)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },

  // Redirect www to non-www (prevents duplicate content)
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.towfiq-mern-stack-developer.vercel.app" }],
        destination: "https://towfiq-mern-stack-developer.vercel.app/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;