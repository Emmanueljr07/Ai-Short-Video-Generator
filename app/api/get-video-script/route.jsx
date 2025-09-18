import { chatSession } from "@/configs/AiModel";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { prompt } = await req.json();
    console.log("Received", prompt);

    const result = await chatSession.sendMessage({ message: prompt });
    console.log("Result", result.text);

    // console.log("Response", result.response.text());

    return NextResponse.json({ result: JSON.parse(result.text) });
  } catch (error) {
    console.log("Error generating video script:", error);
    return NextResponse.json({ Error: error });
  }
}
