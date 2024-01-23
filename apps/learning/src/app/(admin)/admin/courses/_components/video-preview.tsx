"use client";

import React, { useState } from "react";
import { useDropzone } from "react-dropzone";

import "@vidstack/react/player/styles/default/theme.css";
import "@vidstack/react/player/styles/default/layouts/video.css";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { MediaPlayer, MediaProvider } from "@vidstack/react";
import {
  defaultLayoutIcons,
  DefaultVideoLayout,
} from "@vidstack/react/player/layouts/default";

import { Button } from "~/components/ui/button";
import { api } from "~/trpc/react";

export function VideoPreview({
  courseId,
  chapterId,
  videoUri,
}: {
  courseId: string;
  chapterId: string;
  videoUri?: string;
}) {
  const [videoFile, setVideoFile] = useState<string | null>(null);
  const supabase = createClientComponentClient();

  const utils = api.useUtils();

  const { mutateAsync: uploadVideo } = api.learning.updateChapter.useMutation({
    onSuccess: async () => {
      await utils.learning.chapters.invalidate();
    },
  });

  const { mutateAsync: deleteVideo } = api.learning.removeVideo.useMutation({
    onSuccess: async () => {
      await utils.learning.lessons.invalidate();
    },
  });

  const onDrop = async (acceptedFiles: File[]) => {
    console.log(courseId, chapterId);
    if (acceptedFiles[0]) {
      const { error, data } = await supabase.storage
        .from("courses")
        .upload(
          `videos/course-${courseId}/chapter-${chapterId}/${new Date().getTime()}.mp4`,
          acceptedFiles[0],
        );
      if (error) {
        console.error(error);
      }
      if (data) {
        const publicUrl = supabase.storage
          .from("courses")
          .getPublicUrl(data.path);
        if (publicUrl.data) {
          await uploadVideo({
            id: chapterId,
            video: publicUrl.data.publicUrl,
          });
          setVideoFile(publicUrl.data.publicUrl);
        }
      }
    }
  };

  const onDeleteVideo = async () => {
    const { error } = await supabase.storage
      .from("courses")
      .remove([`videos/course-${courseId}/chapter-${chapterId}/video.mp4`]);
    if (error) {
      console.error(error);
    }
    await deleteVideo({
      id: chapterId,
    });
    setVideoFile(null);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
  });

  return (
    <>
      {videoFile ?? videoUri ? (
        <div className="bottom-5 flex flex-col items-end">
          <Button onClick={onDeleteVideo}>Delete Video</Button>
          <MediaPlayer title="Video Preview" src={videoUri ?? videoFile}>
            <MediaProvider />
            <DefaultVideoLayout thumbnails="none" icons={defaultLayoutIcons} />
          </MediaPlayer>
        </div>
      ) : (
        <div
          {...getRootProps()}
          className="flex h-64 cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 transition-colors hover:border-gray-400"
        >
          <input {...getInputProps()} />
          <p>Drag and drop a video file here, or click to select a file</p>
        </div>
      )}
    </>
  );
}

export function VideoPreviewPlaceholder() {
  return <div className="h-64 animate-pulse rounded-lg bg-gray-200"></div>;
}
