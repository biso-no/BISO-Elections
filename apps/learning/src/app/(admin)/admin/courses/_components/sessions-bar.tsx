"use client";

import { useState } from "react";
import { Text, Tv2 } from "lucide-react";
import * as z from "zod";

import type { RouterOutputs } from "@acme/api";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "~/components/ui/context-menu";
import { useToast } from "~/components/ui/use-toast";
import { api } from "~/trpc/react";

interface Props {
  courseId: string;
  setActiveChapter: (chapter: RouterOutputs["learning"]["chapters"][0]) => void;
}

export function Sessions(props: Props) {
  const [activeSession, setActiveSession] =
    useState<RouterOutputs["learning"]["lessons"][0]>();
  const { data: sessions } = api.learning.lessons.useQuery({
    id: props.courseId,
  });
  const [contextLesson, setContextLesson] =
    useState<RouterOutputs["learning"]["lessons"][0]>();
  const utils = api.useUtils();
  const toast = useToast();

  const { mutateAsync: createLesson } = api.learning.createLesson.useMutation({
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
  });

  const { mutateAsync: createChapter } = api.learning.createChapter.useMutation(
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

  const { mutateAsync: deleteLesson } = api.learning.deleteLesson.useMutation({
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
  });

  const { mutateAsync: renameLesson } = api.learning.updateLesson.useMutation({
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
  });

  if (!sessions) {
    return (
      <div className="flex h-full flex-col items-center justify-center">
        <div className="text-2xl font-bold">No Sessions</div>
        <div className="text-sm text-gray-500">
          Click the button below to add a session
        </div>
        <Button
          variant="outline"
          onClick={() =>
            createLesson({
              courseId: props.courseId,
              name: "New Session",
              description: "New Session",
            })
          }
        >
          Add Lesson
        </Button>
      </div>
    );
  }

  return (
    <div className="w-full lg:w-2/3">
      <Card>
        <CardHeader>
          <CardTitle>Sessions</CardTitle>
        </CardHeader>
        <CardContent>
          <Accordion
            type="single"
            collapsible
            className="divide-y divide-gray-200 dark:divide-gray-700"
          >
            {sessions.map((session) => (
              <>
                <AccordionItem
                  key={session.id}
                  value={session.id}
                  className="py-2"
                >
                  <ContextMenu>
                    <ContextMenuTrigger>
                      <AccordionTrigger
                        className="w-full text-left"
                        onClick={() => setActiveSession(session)}
                      >
                        {session.name}
                      </AccordionTrigger>
                    </ContextMenuTrigger>
                    <ContextMenuContent>
                      <ContextMenuItem
                        onClick={() => deleteLesson({ id: session.id })}
                      >
                        Delete
                      </ContextMenuItem>
                    </ContextMenuContent>
                  </ContextMenu>
                  <AccordionContent className="p-4">
                    {/* Container for chapter buttons */}
                    <div className="flex flex-col gap-2">
                      {" "}
                      {/* Modified here */}
                      {session.pages.map((chapter) => (
                        <Button
                          onClick={() => props.setActiveChapter(chapter)}
                          key={chapter.id}
                          variant="ghost"
                          className="flex flex-row items-center justify-between space-x-2" // Changed to flex-row and added space
                        >
                          <div className="text-sm">{chapter.name}</div>
                          <div className="text-sm">
                            {chapter.type === "text" ? <Text /> : <Tv2 />}
                          </div>
                        </Button>
                      ))}
                      <Button
                        variant="ghost"
                        onClick={() =>
                          createChapter({
                            lessonId: session.id,
                            name: "New Chapter",
                            type: "text",
                            description: "New Chapter",
                          })
                        }
                      >
                        Add Chapter
                      </Button>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </>
            ))}
          </Accordion>
        </CardContent>
        <CardFooter>
          <div className="flex flex-row items-center">
            <Button
              variant="outline"
              onClick={() =>
                createLesson({
                  courseId: props.courseId,
                  name: "New Session",
                  description: "New Session",
                })
              }
            >
              Add Lesson
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
