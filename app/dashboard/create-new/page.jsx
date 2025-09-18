"use client";
import React, { useState } from "react";
import SelectTopic from "./_components/SelectTopic";
import SelectStyle from "./_components/SelectStyle";
import SelectDuration from "./_components/SelectDuration";
import { Button } from "@/components/ui/button";
import axios from "axios";
import Script from "next/script";
import { v4 as uuidv4 } from "uuid";
import { CustomLoading } from "./_components/CustomLoading";

const scriptData =
  "In the heart of a forgotten town, stood an old, abandoned Victorian mansion. Whispers of its dark past kept locals away, but curiosity pulled me in. The air inside was thick with dust and decay. Floorboards creaked under my feet, each sound echoing through the empty, silent halls, as if the house itself was breathing. In a child's desolate room, tucked away beneath a broken cradle, I found it: an antique porcelain doll, its eyes eerily focused, a faint, unsettling smile etched on its painted face. As I picked it up, a chilling whisper seemed to slither past my ears, 'You shouldn't be here.' The temperature in the room plummeted, and the doll's eyes felt like they were following me. Suddenly, a floorboard directly behind me groaned, even though no one else was there. Then, a faint, childlike giggle echoed from the darkest corner, growing louder, closer. Panic seized me. I dropped the doll, its porcelain shattering, and fled. But as I ran, I could swear I heard faint, tiny footsteps following me, echoing through the empty house, all the way out into the night.";
function CreateNew() {
  const [formData, setFormData] = useState([]);
  const [loading, setloading] = useState(false);
  const [videoScript, setvideoScript] = useState();
  const [message, setMessage] = useState("");
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);

  const onHandleInputChange = (fieldName, fieldValue) => {
    setFormData((prev) => ({
      ...prev,
      [fieldName]: fieldValue,
    }));
  };

  const onCreateClickHandler = () => {
    // GetVideoScript();
    GenerateAudioFile(scriptData);
  };

  // Get Video Script
  const GetVideoScript = async () => {
    setloading(true);
    const prompt =
      `Write a script to generate ` +
      formData.duration +
      ` video on topic : ` +
      formData.topic +
      ` along with AI image prompt in ` +
      formData.imageStyle +
      ` format for each scene and give me result in JSON format with imagePrompt and ContentText as field, No Plain text`;
    // console.log(prompt);

    const result = await axios
      .post("/api/get-video-script", {
        prompt: prompt,
      })
      .then((res) => {
        // console.log(res.data.result);
        setvideoScript(res.data.result);
        GenerateAudioFile(res.data.result);
      });
    setloading(false);
  };

  const GenerateAudioFile = async (videoScriptData) => {
    setloading(true);
    let script = "";
    const id = uuidv4();
    // videoScriptData.forEach((item) => {
    //   script = script + item.ContentText + " ";
    // });
    if (videoScriptData) {
      await axios.post("/api/generate-audio", {
        text: videoScriptData,
        id: id,
      });
    }

    setloading(false);
  };

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
