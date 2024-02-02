"use client";

import { Button } from "~/components/ui/button";
import { ChannelSettings } from "./_components/channel-settings";
import { PostContent } from "./_components/post-content";

export default function Page() {
  return (
    <div className="flex h-screen flex-col">
      <header className="flex items-center justify-between border-b px-6 py-4">
        <h1 className="text-2xl font-bold">Newsletter Post</h1>
        <Button size="sm" variant="outline">
          Preview
        </Button>
      </header>
      <main className="flex flex-1 overflow-hidden">
        <PostContent />
        <ChannelSettings />
      </main>
    </div>
  );
}
