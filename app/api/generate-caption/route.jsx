import { AssemblyAI } from "assemblyai";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { audioFileUrl } = await req.json();

    const client = new AssemblyAI({
      apiKey: process.env.CAPTION_API,
    });

    // const audioFile = "./local_file.mp3";
    const audioFile = audioFileUrl;

    const params = {
      audio: audioFile,
      speech_model: "universal",
    };

    const transcript = await client.transcripts.transcribe(params);

    console.log(transcript.words);
    return NextResponse.json({ result: transcript.words });
  } catch (error) {
    return NextResponse.json({ error: error });
  }
}
