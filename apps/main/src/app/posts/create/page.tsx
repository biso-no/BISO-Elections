"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "~/components/ui/button";
import { Form } from "~/components/ui/form";
import { api } from "~/trpc/react";
import { ChannelSettings } from "./_components/channel-settings";
import { PostContent } from "./_components/post-content";

const FormSchema = z.object({
  workflowId: z.string(),
  topicKey: z.string(),
  payload: z.object({
    title: z.string(),
    content: z.string(),
  }),
});

export default function Page() {
  const methods = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      workflowId: "news-notifications-members",
      topicKey: "news-members",
      payload: {
        title: "My first post",
        content: "Hello world",
      },
    },
  });

  const utils = api.useUtils();

  const { mutateAsync: triggerEvent, error } =
    api.notification.trigger.useMutation({
      async onSuccess(data) {
        onClose(false);
        methods.reset();
        console.log("data: ", data);
      },

      async onError() {
        console.log("Error: ", error);
      },
    });

  async function onSubmit() {
    const data = {
      workflowId: "news-notifications-members",
      topicKey: "news-members",
      payload: {
        title: "My first post",
        message: "Hello world",
      },
    };

    try {
      console.log("data: ", data);
      await triggerEvent(data);
    } catch {
      console.log("Error: ", error);
    }
  }

  return (
    <div className="flex h-screen flex-col">
      <header className="flex items-center justify-between border-b px-6 py-4">
        <h1 className="text-2xl font-bold">Newsletter Post</h1>
        <div className="flex items-center space-x-4">
          <Button size="sm" variant="outline">
            Preview
          </Button>
        </div>
      </header>
      <main className="flex flex-1 overflow-hidden">
        <Form {...methods}>
          <form
            onSubmit={onSubmit}
            className="flex flex-1 flex-row space-x-4 p-6"
          >
            <PostContent />
            <ChannelSettings />
            <Button type="submit" size="sm">
              Publish
            </Button>
          </form>
        </Form>
      </main>
    </div>
  );
}
