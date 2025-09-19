import { writeFile } from "fs/promises";
import { NextResponse } from "next/server";
import Replicate from "replicate";
import { supabase } from "@/configs/SupabaseConfig";
import axios from "axios";

export async function POST(req) {
  try {
    const { prompt } = await req.json();
    const replicate = new Replicate({ auth: process.env.REPLICATE_API_TOKEN });

    const input = {
      prompt: prompt,
      height: 1200,
      width: 1024,
      num_outputs: 1,
    };

    const output = await replicate.run(
      "bytedance/sdxl-lightning-4step:6f7a773af6fc3e8de9d5a3c00be77c17308914bf67772726aff83496ba1e3bbe",
      { input }
    );
    // console.log("Output Url:", output[0].url());
    console.log("Output:", output[0].url().href);

    // Get the image URL from the Replicate output
    const imageURLS = output[0].url().href;

    console.log("Generated Image URL:", imageURLS);

    // Convert the image from URL to a Buffer
    const imageBuffer = await ConvertImage(imageURLS);
    if (!imageBuffer) {
      throw new Error("Failed to convert image to buffer.");
    }

    // Save to Supabase

    const filePath = "ai-short-video-files/" + Date.now() + ".png"; // Generate a unique file path for the image

    // Upload the audio buffer to Supabase Storage
    const { data, error } = await supabase.storage
      .from("ai-short-video-generator")
      .upload(filePath, imageBuffer);
    if (error) {
      console.error("Error uploading images to supabase", error);
      throw error;
    }

    console.log("Image uploaded successfully:", data);

    // Get the public URL for the uploaded file
    const { data: imageUrl, error: urlError } = supabase.storage
      .from("ai-short-video-generator")
      .getPublicUrl(data.path);
    if (urlError) {
      console.error("Error getting public URL:", urlError);
    }

    // Access the publicUrl property from the imageUrl object
    const publicUrl = imageUrl.publicUrl;

    console.log("Public URL:", publicUrl);
    return NextResponse.json({ Result: publicUrl });
  } catch (e) {
    console.error("An error occurred in the API route:", e);
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

const ConvertImage = async (imageUrl) => {
  try {
    const resp = await axios.get(imageUrl, { responseType: "arraybuffer" });

    const imageBuffer = Buffer.from(resp.data);
    return imageBuffer;
  } catch (error) {
    console.log("Error", error);
  }
};

// To access the file URLs:
// console.log(output[0].url());
// // To write the files to disk:
// for (const [index, item] of Object.entries(output)) {
//   await writeFile(`output_${index}.png`, item);
// }
// //=> output_0.png written to disk
