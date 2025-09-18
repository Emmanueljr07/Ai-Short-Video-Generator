/** @type {import("drizzle-kit").Config} */
export default {
  schema: "./configs/schema.js",
  dialect: "postgresql",
  dbCredentials: {
    url: "postgresql://neondb_owner:npg_YeATDK2vyM5Q@ep-square-cake-afuexx5g-pooler.c-2.us-west-2.aws.neon.tech/ai-short-video-generator?sslmode=require&channel_binding=require",
  },
};

// import { defineConfig } from "drizzle-kit";

// export default defineConfig({
//   dialect: "postgresql",
//   schema: "./src/schema.ts",
//   out: "./drizzle",
// });
