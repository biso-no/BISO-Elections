"use client";

import { MediaPlayer, MediaProvider } from "@vidstack/react";
import {
  defaultLayoutIcons,
  DefaultVideoLayout,
} from "@vidstack/react/player/layouts/default";

interface VideoPlayerProps {
  videoUri?: string;
}

export function VideoPlayer({ videoUri }: VideoPlayerProps) {
  return (
    <div className="bottom-5 flex flex-col items-end">
      <MediaPlayer title="My Video" src={videoUri}>
        <MediaProvider />
        <DefaultVideoLayout thumbnails="none" icons={defaultLayoutIcons} />
      </MediaPlayer>
    </div>
  );
}
