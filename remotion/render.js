// src/remotion/render.js
import { bundle } from "@remotion/bundler";
import { renderMedia } from "@remotion/renderer";
import path from "path";
import fs from "fs";

const renderScript = async () => {
  try {
    // The data is passed as a command-line argument in JSON format
    const props = JSON.parse(process.argv[2]);
    const { durationInFrames, inputProps, width, height, fps, compositionId } =
      props;

    // Step 1: Bundle your Remotion composition
    const bundleLocation = await bundle({
      entryPoint: path.resolve("./remotion/index.jsx"),
      webpackOverride: (config) => config,
    });

    // Step 2: Define the composition based on passed props
    const composition = {
      id: compositionId, // Get compositionId from props
      width: width || 1920,
      height: height || 1080,
      fps: fps || 30,
      durationInFrames: durationInFrames || 150,
      defaultProps: inputProps || {},
    };

    // Step 3: Render the video
    const timestamp = Date.now();
    const outputLocation = path.resolve(
      `./public/videos/video-${timestamp}.mp4`
    );

    const outputDir = path.dirname(outputLocation);
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    await renderMedia({
      composition,
      serveUrl: bundleLocation,
      codec: "h264",
      outputLocation,
      inputProps: inputProps || {},
    });

    // Step 4: Output the final URL to stdout so the parent process can capture it
    const videoUrl = `/videos/video-${timestamp}.mp4`;
    console.log(videoUrl); // This is how we send the result back
  } catch (error) {
    // Log errors to stderr so the parent process can capture them
    console.error("Render script error:", error);
    process.exit(1); // Exit with an error code
  }
};

renderScript();
