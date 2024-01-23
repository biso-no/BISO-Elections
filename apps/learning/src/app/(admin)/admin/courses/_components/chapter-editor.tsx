"use client";

import React, { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Pen, Trash2 } from "lucide-react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import type { RouterOutputs } from "@acme/api";

import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Checkbox } from "~/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { Textarea } from "~/components/ui/textarea";
import { useToast } from "~/components/ui/use-toast";
import { api } from "~/trpc/react";
import { VideoPreview } from "./video-preview";

interface Props {
  lessonId: string;
  courseId: string;
}

const renameChapterSchema = z.object({
  name: z.string().min(1),
});

export function ChapterEditor({ lessonId, courseId }: Props) {
  const utils = api.useUtils();

  const toast = useToast();

  const [editChapterTitle, setEditChapterTitle] = useState(false);

  const { data: chapter } = api.learning.chapterById.useQuery({ id: lessonId });

  const { mutateAsync: deleteChapter } = api.learning.deleteChapter.useMutation(
    {
      onSuccess: async () => {
        await utils.learning.lessons.invalidate(undefined, {
          refetchType: "all",
          queryKey: ["learning.lessons", { id: courseId }],
        });
      },
      onError: (err) => {
        toast.toast({
          title:
            err?.data?.code === "UNAUTHORIZED"
              ? "You must be logged in to post"
              : "Failed to create post",
          description: "Please try again later",
          variant: "destructive",
        });
      },
    },
  );

  const form = useForm<z.infer<typeof renameChapterSchema>>({
    resolver: zodResolver(renameChapterSchema),
    defaultValues: {
      name: chapter?.name,
    },
  });

  const { mutateAsync: updateChapter } = api.learning.updateChapter.useMutation(
    {
      onSuccess: async () => {
        await utils.learning.lessons.invalidate();
      },
      onError: (err) => {
        toast.toast({
          title:
            err?.data?.code === "UNAUTHORIZED"
              ? "You must be logged in to post"
              : "Failed to create post",
          description: "Please try again later",
          variant: "destructive",
        });
      },
    },
  );

  if (!chapter) {
    return <div>Chapter not found</div>;
  }

  const onSubmit = async (data: z.infer<typeof renameChapterSchema>) => {
    await updateChapter({
      id: chapter.id,
      name: data.name,
    });
    setEditChapterTitle(false);
    await utils.learning.chapters.invalidate();
  };

  return (
    <div>
      <Card key={chapter.id}>
        <CardHeader>
          <div className="flex flex-row items-center justify-between">
            <div className="flex flex-row items-center gap-2">
              {!editChapterTitle ? (
                <>
                  <CardTitle>{chapter.name}</CardTitle>
                  <Pen
                    onClick={() => setEditChapterTitle(true)}
                    className="cursor-pointer"
                  />
                </>
              ) : (
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="flex flex-row items-center gap-2">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel htmlFor="name">Chapter Name</FormLabel>
                            <Input {...field} defaultValue={chapter.name} />
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button variant="ghost" type="submit">
                        Save
                      </Button>
                    </div>
                  </form>
                </Form>
              )}
            </div>
            <Trash2
              onClick={() => deleteChapter({ id: chapter.id })}
              className="cursor-pointer"
            />
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue={chapter.type}>
            <TabsList className="flex gap-2">
              <TabsTrigger value="video">Video</TabsTrigger>
              <TabsTrigger value="text">Text</TabsTrigger>
              <TabsTrigger value="quiz">Quiz</TabsTrigger>
            </TabsList>
            <TabsContent value="video">
              <div className="rounded-md p-4">
                <VideoPreview
                  chapterId={chapter.id}
                  courseId={courseId}
                  videoUri={chapter.video}
                />
              </div>
            </TabsContent>
            <TabsContent value="text">
              <div className="p-4">
                <Label htmlFor="text-content">Text Content</Label>
                <Textarea id="text-content" placeholder="Enter text content" />
              </div>
            </TabsContent>
            <TabsContent value="quiz">
              <div className="p-4">
                <Label htmlFor="quiz-question">Quiz Question</Label>
                <Textarea />
                {chapter.quizzes.map((quiz) => (
                  <div
                    className="flex flex-row items-center gap-2"
                    key={quiz.id}
                  >
                    <Checkbox />
                    <Input />
                  </div>
                ))}
                <Button variant="ghost">Add Answer</Button>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
