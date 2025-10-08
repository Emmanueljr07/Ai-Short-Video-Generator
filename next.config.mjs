/** @type {import('next').NextConfig} */
const nextConfig = {};

export default nextConfig;

/** @type {import('next').NextConfig} */
// const nextConfig = {
//   webpack: (config, { isServer }) => {
//     // Add externals for server-side Remotion rendering
//     if (isServer) {
//       config.externals = [
//         ...(config.externals || []),
//         "canvas",
//         "bufferutil",
//         "utf-8-validate",
//       ];
//     }

//     // Handle Remotion's special requirements
//     config.resolve.alias = {
//       ...config.resolve.alias,
//     };

//     return config;
//   },

//   // Allow longer API routes for video rendering
//   experimental: {
//     serverActions: {
//       bodySizeLimit: "10mb",
//     },
//   },
// };

// export default nextConfig;
