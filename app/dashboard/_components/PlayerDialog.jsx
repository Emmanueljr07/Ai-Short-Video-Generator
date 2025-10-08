import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Player } from "@remotion/player";
import RemotionVideo from "./RemotionVideo";
import { Button } from "@/components/ui/button";
import { VideoData } from "@/configs/schema";
import { eq } from "drizzle-orm";
import { db } from "@/configs/db";
import { useRef, useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";

function PlayerDialog({ playVideo, videoId }) {
  const [openDialog, setOpenDialog] = useState(false);
  const [videoData, setVideoData] = useState(null);
  const [durationInFrame, setDurationInFrame] = useState(100);
  const [isExporting, setIsExporting] = useState(false);
  const [videoUrl, setVideoUrl] = useState(null);
  const [progress, setProgress] = useState("");

  const router = useRouter();

  useEffect(() => {
    // setOpenDialog(playVideo);
    // if (videoId) {
    //   getVideoData();
    // }
    videoId && getVideoData();
  }, [videoId]);

  const getVideoData = async () => {
    const result = await db
      .select()
      .from(VideoData)
      .where(eq(VideoData.id, videoId));
    // console.log("Result", result[0]);
    const newData = result[0];
    setVideoData(newData);
  };

  useEffect(() => {
    if (!videoData) {
      setOpenDialog(false);
    } else {
      setOpenDialog(!openDialog);
    }
  }, [playVideo, videoData]);

  // console.log("Video Data", videoData);

  const inputProps = useMemo(() => {
    return {
      // ...videoData,
      script: videoData?.script,
      imageList: videoData?.imageList,
      audioFileUrl: videoData?.audioFileUrl,
      captions: videoData?.captions,
      setDurationInFrame: (frameValue) => setDurationInFrame(frameValue),
    };
  }, [videoData]);

  const handleExport = async () => {
    setIsExporting(true);
    setProgress("Starting export...");

    try {
      const response = await fetch("/api/export-video", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          durationInFrames: Number(durationInFrame.toFixed(0)),
          inputProps: inputProps,
          width: 300,
          height: 450,
          fps: 30,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setVideoUrl(data.videoUrl);
        setProgress("Export complete!");

        // Auto-download
        const a = document.createElement("a");
        a.href = data.videoUrl;
        a.download = "my-video.mp4";
        a.click();
      } else {
        setProgress("Export failed: " + data.error);
      }
    } catch (error) {
      console.error("Export error:", error);
      setProgress("Export failed");
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <>
      {videoData && (
        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
          <DialogContent className="bg-white flex flex-col items-center">
            <DialogHeader>
              <DialogTitle className="text-3xl font-bold my-5">
                Your video is ready !
              </DialogTitle>
              <DialogDescription>
                <Player
                  // ref={playerRef}
                  component={RemotionVideo}
                  durationInFrames={Number(durationInFrame.toFixed(0))}
                  compositionWidth={300}
                  compositionHeight={450}
                  fps={30}
                  controls={true}
                  inputProps={inputProps}
                />
                <div className="flex gap-10 mt-10">
                  <Button
                    variant="ghost"
                    onClick={() => {
                      router.replace("/dashboard");
                      setOpenDialog(false);
                    }}
                  >
                    Cancel
                  </Button>
                  {/* {!isRecording ? (
                    <Button onClick={startRecording} disabled={isRecording}>
                      {isRecording ? "Stop Recording" : "Start Recording"}
                    </Button>
                  ) : (
                    <Button onClick={stopRecording}>Stop Recording</Button>
                  )} */}

                  {/* Not Integrated */}
                  {/* <Button onClick={handleExport} disabled={isExporting}>
                    {isExporting ? "Exporting..." : "Export"}
                  </Button> */}
                  <Button>Export</Button>

                  {/* {progress && (
                    <p className="mt-2 text-sm text-gray-600">{progress}</p>
                  )} */}

                  {videoUrl && (
                    <a
                      href={videoUrl}
                      download="my-video.mp4"
                      className="mt-4 inline-block text-blue-500 underline"
                    >
                      Download Again
                    </a>
                  )}
                </div>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}

export default PlayerDialog;
