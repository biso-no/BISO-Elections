"use client";

import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTrigger,
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
  name: z.string().min(1),
});

export function CreateSession({ electionId }: { electionId: string }) {
  const utils = api.useUtils();

  const toast = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  const { mutateAsync: createSession, error } =
    api.elections.createSession.useMutation({
      async onSuccess() {
        form.reset();
        toast.toast({
          title: "Session created",
          description: "The session has been created",
        });
        await utils.elections.sessions.invalidate();
      },

      async onError() {
        toast.toast({
          title: "Error",
          description: "Something went wrong",
          variant: "destructive",
        });
      },
    });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      console.log(data);
      await createSession({ ...data, electionId });
    } catch {
      console.log("Error: ", error);
      toast.toast({
        title: "Error",
        description: error?.message,
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm">Add Session</Button>
      </DialogTrigger>
      <DialogContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Session name</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Session name" />
                  </FormControl>
                  <FormDescription>
                    This is the name of the session
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit">Add session</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
