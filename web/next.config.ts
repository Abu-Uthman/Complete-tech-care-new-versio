const nextConfig = {
  // Explicitly set the workspace root so Turbopack ignores lockfiles outside this project
  turbopack: {
    rootDirectory: __dirname,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'ctcbackend.local',
        port: '',
        pathname: '/wp-content/uploads/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
} satisfies import("next").NextConfig & {
  turbopack?: {
    rootDirectory?: string;
  };
};

export default nextConfig;
