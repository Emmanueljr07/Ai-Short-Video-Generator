"use client";
import React, { useContext, useEffect, useState } from "react";
import SelectTopic from "./_components/SelectTopic";
import SelectStyle from "./_components/SelectStyle";
import SelectDuration from "./_components/SelectDuration";
import { Button } from "@/components/ui/button";
import axios from "axios";
import Script from "next/script";
import { v4 as uuidv4 } from "uuid";
import { CustomLoading } from "./_components/CustomLoading";
import { VideoDataContext } from "@/app/_context/VideoDataContext";

function CreateNew() {
  const [formData, setFormData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [videoScript, setvideoScript] = useState();
  const [audioFileUrl, setAudioFileUrl] = useState();
  const [captions, setCaptions] = useState();
  const [imageList, setImageList] = useState();
  const { videoData, setVideoData } = useContext(VideoDataContext);

  const onHandleInputChange = (fieldName, fieldValue) => {
    setFormData((prev) => ({
      ...prev,
      [fieldName]: fieldValue,
    }));
  };

  const onCreateClickHandler = () => {
    GetVideoScript();
    // GenerateAudioFile(scriptData);
    // GenerateAudioCaption(FILEURL);
    // GenerateImage();
  };

  // Get Video Script
  const GetVideoScript = async () => {
    setLoading(true);
    const prompt =
      `Write a script to generate ` +
      formData.duration +
      ` video on topic : ` +
      formData.topic +
      ` along with AI image prompt in ` +
      formData.imageStyle +
      ` format for each scene and give me result in JSON format with imagePrompt and ContentText as field, No Plain text`;
    // console.log(prompt);

    const resp = await axios.post("/api/get-video-script", {
      prompt: prompt,
    });
    if (resp.data.result) {
      setVideoData((prev) => ({
        ...prev,
        videoScript: resp.data.result,
      }));
      setvideoScript(resp.data.result);
      await GenerateAudioFile(resp.data.result);
    }
    setLoading(false);
  };

  /**
   * Generate Audio File and Save to Firebase Storage
   * @param {*} videoScriptData
   */
  const GenerateAudioFile = async (videoScriptData) => {
    setLoading(true);
    let script = "";
    const id = uuidv4();
    videoScriptData.forEach((item) => {
      script = script + item.ContentText + " ";
    });

    const resp = await axios.post("/api/generate-audio", {
      text: script,
      id: id,
    });
    setVideoData((prev) => ({
      ...prev,
      audioFileUrl: resp.data.result,
    }));
    setAudioFileUrl(resp.data.result); //Get FIle Url
    resp.data.result &&
      (await GenerateAudioCaption(resp.data.result, videoScriptData));

    setLoading(false);
  };

  /**
   * Used To Generate Audio Caption from Audio File
   * @param {*} fileUrl
   */
  const GenerateAudioCaption = async (fileUrl, videoScriptData) => {
    setLoading(true);
    console.log(fileUrl);
    const resp = await axios.post("/api/generate-caption", {
      audioFileUrl: fileUrl,
    });

    setCaptions(resp?.data?.result);
    setVideoData((prev) => ({
      ...prev,
      captions: resp.data.result,
    }));
    resp.data.result && (await GenerateImage(videoScriptData));
  };

  /**
   * Used to generate AI Images
   */
  const GenerateImage = async (videoScriptData) => {
    let images = [];

    for (const element of videoScriptData) {
      try {
        const resp = await axios.post("/api/generate-image", {
          prompt: element.imagePrompt,
        });
        console.log(resp.data.result);
        images.push(resp.data.result);
      } catch (error) {
        console.log("Error:" + error);
      }
    }
    setVideoData((prev) => ({
      ...prev,
      imageList: images,
    }));
    setImageList(images);
    setLoading(false);
  };

  useEffect(() => {
    console.log(videoData);
  }, [videoData]);

  return (
    <div className="md:px-20">
      <h2 className="font-bold text-4xl text-primary text-center">
        Create New
      </h2>

      <div className="mt-10 shadow-md p-10">
        {/* Select Topic */}
        <SelectTopic onUserSelect={onHandleInputChange} />

        {/* Select Style */}
        <SelectStyle onUserSelect={onHandleInputChange} />

        {/* Duration */}
        <SelectDuration onUserSelect={onHandleInputChange} />

        {/* Create Button */}
        <Button className="mt-10 w-full" onClick={onCreateClickHandler}>
          Create Short Video
        </Button>
        {/* ONLY WHEN USING PUTER.AI */}
        {/* <Script
          src="https://js.puter.com/v2/"
          strategy="afterInteractive"
          onLoad={() => {
            console.log("Puter.js script loaded successfully!");
          }}
        /> */}

        {/* Loading */}
        <CustomLoading loading={loading} />
      </div>
    </div>
  );
}

export default CreateNew;

// const scriptData =
//   "In the heart of a forgotten town, stood an old, abandoned Victorian mansion. Whispers of its dark past kept locals away, but curiosity pulled me in. The air inside was thick with dust and decay. Floorboards creaked under my feet, each sound echoing through the empty, silent halls, as if the house itself was breathing. In a child's desolate room, tucked away beneath a broken cradle, I found it: an antique porcelain doll, its eyes eerily focused, a faint, unsettling smile etched on its painted face. As I picked it up, a chilling whisper seemed to slither past my ears, 'You shouldn't be here.' The temperature in the room plummeted, and the doll's eyes felt like they were following me. Suddenly, a floorboard directly behind me groaned, even though no one else was there. Then, a faint, childlike giggle echoed from the darkest corner, growing louder, closer. Panic seized me. I dropped the doll, its porcelain shattering, and fled. But as I ran, I could swear I heard faint, tiny footsteps following me, echoing through the empty house, all the way out into the night.";
// const FILEURL =
//   "https://pbganaysprbcopnjvhxx.supabase.co/storage/v1/object/public/ai-short-video-generator/34f720cf-9a35-4dd8-8793-471366fca7c3.mp3";

// const VideoSCRIPT = [
//   {
//     imagePrompt:
//       "A bustling marketplace in ancient Rome, with people selling goods, merchants haggling, and citizens going about their lives. Realistic, detailed, and vibrant colors",
//     ContentText:
//       "Welcome to ancient Rome, a city buzzing with life and commerce. Imagine a bustling marketplace, filled with the cries of vendors and the chatter of citizens.",
//   },
//   {
//     imagePrompt:
//       "A portrait of a Roman senator, stern and powerful, wearing a toga and sitting on a marble throne. Realistic, with sharp details and a sense of authority",
//     ContentText:
//       "Among then, a poweful senator named Cato the Younger, known for his strong principles and unwavering patriotism",
//   },
// ];
