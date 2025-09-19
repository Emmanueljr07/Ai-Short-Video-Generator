import { NextResponse } from "next/server";
import { ElevenLabsClient, play } from "@elevenlabs/elevenlabs-js";
// const fs = require("fs");
import { supabase } from "@/configs/SupabaseConfig";
import { Buffer } from "buffer";
// const { pipeline } = require("stream");

export async function POST(req) {
  const { text, id } = await req.json();

  const filePath = `ai-short-video-files/${id}.mp3 `;

  try {
    // const elevenlabs = new ElevenLabsClient();
    // const audio = await elevenlabs.textToSpeech.convert(
    //   "JBFqnCBsd6RMkjVDRZzb",
    //   {
    //     text: text,
    //     // modelId: "eleven_multilingual_v2",
    //     modelId: "eleven_flash_v2_5",
    //     outputFormat: "mp3_44100_128",
    //   }
    // );

    // // STORING IN SUPABASE
    // // Read the stream and collect all chunks into a single Buffer
    // const chunks = [];
    // for await (const chunk of audio) {
    //   chunks.push(chunk);
    // }
    // const audioBuffer = Buffer.concat(chunks);

    // console.log("Audio stream successfully read and buffered."); // creating a buffer

    // // Upload the audio buffer to Supabase Storage
    // const { data, error } = await supabase.storage
    //   .from("ai-short-video-generator")
    //   .upload(filePath, audioBuffer, {
    //     cacheControl: "3600",
    //     upsert: false,
    //     contentType: "audio/mp3",
    //   });
    // if (error) {
    //   console.error("Error uploading audio to supabase", error);
    //   throw error;
    // }

    // console.log("File uploaded successfully:", data);

    // Get the public URL for the uploaded file
    const { data: urlData, error: urlError } = supabase.storage
      .from("ai-short-video-generator")
      .getPublicUrl(
        "ai-short-video-files/d2e8a3d1-297b-4493-bc56-416d0e7d45a1.mp3"
      );
    if (urlError) {
      console.error("Error getting public URL:", urlError);
    }
    // Access the publicUrl property from the urlData object
    const publicUrl = urlData.publicUrl;

    console.log("Public URL:", publicUrl);
    return NextResponse.json({ Result: publicUrl });
  } catch (error) {
    console.error("Error During Audio Generation:", error);
    throw error;
  }
}

// USING PUTER.AI FOR TEXT-TO-SPEECH (NB: WORKS ONLY FROM CLIENT-SIDE)
//  await axios.get("https://js.puter.com/v2/");

//   // The 'puter' object is now available globally on the window
//   //   if (puter && puter.ai && puter.ai.txt2speech) {
//   try {
//     const audio = await puter.ai.txt2speech(text);
//     audio.play();
//   } catch (error) {
//     console.error("Error generating or playing audio:", error);
//   }
//   } else {
//     console.error("Puter.js object not found.");
//   }

// IF STORING LOCALLY
// Create a writable stream to the output file
// const fileWriteStream = fs.createWriteStream("output_elevenlabs.mp3");

// Use stream.pipeline to pipe the readable stream to the writable stream.
// This is the key to handling the audio data stream.
// It automatically handles closing the streams and propagating errors.
// pipeline(audio, fileWriteStream, (err) => {
//   if (err) {
//     console.error("Pipeline failed:", err);
//   } else {
//     console.log("Audio content written to file: output_elevenlabs.mp3");
//   }
// });
