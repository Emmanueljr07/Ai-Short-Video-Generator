import { NextResponse } from "next/server";
import { spawn } from "child_process";

export async function POST(req) {
  try {
    const body = await req.json();
    //  const { durationInFrames, inputProps, width, height, fps } = req.body;

    // Pass all necessary props, including the Composition ID
    const propsForRenderer = {
      ...body,
      compositionId: "Empty", // 👈 Make sure this matches your Composition ID
    };

    // This will hold the final video URL from the script's output
    let videoUrl = "";
    let errorOutput = "";

    // Use a Promise to wait for the child process to finish
    const renderProcess = new Promise((resolve, reject) => {
      // Execute the render script as a new Node.js process
      const child = spawn(
        "node",
        [
          "./remotion/render.js", // Path to your new script
          JSON.stringify(propsForRenderer), // Pass props as a JSON string
        ],
        { stdio: "pipe" } // Use 'pipe' to capture output
      );

      // Listen for data from the script's standard output
      child.stdout.on("data", (data) => {
        videoUrl += data.toString();
      });

      // Listen for data from the script's standard error
      child.stderr.on("data", (data) => {
        errorOutput += data.toString();
        console.error(`Render Error: ${data}`);
      });

      // Called when the process finishes
      child.on("close", (code) => {
        if (code === 0) {
          // Success!
          resolve();
        } else {
          // Failure!
          reject(
            new Error(
              `Render script failed with code ${code}. Error: ${errorOutput}`
            )
          );
        }
      });

      child.on("error", (err) => {
        reject(err);
      });
    });

    // Wait for the rendering to complete
    await renderProcess;

    return NextResponse.json({
      success: true,
      videoUrl: videoUrl.trim(), // Trim any whitespace from the output
      message: "Video rendered successfully",
    });
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json({
      error: "Failed to export video",
      details: error.message,
    });
  }
}

// // pages/api/export-video-direct.ts
// import { bundle } from "@remotion/bundler";
// import { renderMedia } from "@remotion/renderer";
// import { NextResponse } from "next/server";

// import path from "path";
// import fs from "fs";

// export default async function handler(req, res) {
//   if (req.method !== "POST") {
//     return NextResponse.json({ error: "Method not allowed" });
//   }

//   try {
//     const { durationInFrames, inputProps, width, height, fps } = req.body;

//     // Step 1: Bundle your Remotion component
//     const bundleLocation = await bundle({
//       entryPoint: path.resolve("./src/remotion/index.ts"), // Path to your remotion component file
//       webpackOverride: (config) => config,
//     });

//     // Step 2: Define composition inline
//     const composition = {
//       id: "Empty",
//       width: width || 300,
//       height: height || 450,
//       fps: fps || 30,
//       durationInFrames: durationInFrames || 150,
//       defaultProps: inputProps || {},
//     };

//     // Step 3: Render the video
//     const timestamp = Date.now();
//     const outputLocation = path.resolve(
//       `./public/videos/video-${timestamp}.mp4`
//     );

//     // Ensure output directory exists
//     const outputDir = path.dirname(outputLocation);
//     if (!fs.existsSync(outputDir)) {
//       fs.mkdirSync(outputDir, { recursive: true });
//     }

//     await renderMedia({
//       composition,
//       serveUrl: bundleLocation,
//       codec: "h264",
//       outputLocation,
//       inputProps: inputProps || {},
//       onProgress: ({ progress }) => {
//         console.log(`Rendering progress: ${(progress * 100).toFixed(2)}%`);
//       },
//     });

//     // Return the video URL
//     const videoUrl = `/videos/video-${timestamp}.mp4`;

//     return NextResponse.json({
//       success: true,
//       videoUrl,
//       message: "Video rendered successfully",
//     });
//   } catch (error) {
//     console.error("Export error:", error);
//     return NextResponse.json({
//       error: "Failed to export video",
//       details: error.message,
//     });
//   }
// }

// export const config = {
//   api: {
//     bodyParser: {
//       sizeLimit: "10mb",
//     },
//     responseLimit: false,
//   },
//   maxDuration: 300, // 5 minutes
// };
