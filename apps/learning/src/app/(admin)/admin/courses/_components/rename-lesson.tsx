"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import type { RouterOutputs } from "@acme/api";

import { Button } from "~/components/ui/button";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";
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
import { useToast } from "~/components/ui/use-toast";
import { api } from "~/trpc/react";

const formSchema = z.object({
  name: z.string().min(1).optional(),
});

export function RenameLesson({
  lesson,
}: {
  lesson: RouterOutputs["learning"]["lessons"][0];
}) {
  const utils = api.useUtils();

  const toast = useToast();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: lesson.name,
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

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    if (!lesson) return;
    await renameLesson({
      id: lesson.id,
      name: data.name,
    });
  };

  return (
    <DialogContent className="sm:max-w-[425px]">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle> Rename Lesson</DialogTitle>
            <DialogDescription>
              Rename the lesson to something else
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 items-center gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Lesson name</FormLabel>
                    <FormControl>
                      <Input defaultValue={lesson?.name} {...field} />
                    </FormControl>
                    <FormDescription>
                      This is the name of the lesson
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" variant="outline">
              Save
            </Button>
          </DialogFooter>
        </form>
      </Form>
    </DialogContent>
  );
}
