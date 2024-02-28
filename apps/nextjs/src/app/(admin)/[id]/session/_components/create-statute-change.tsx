"use client";

import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "~/components/ui/button";
import { Checkbox } from "~/components/ui/checkbox";
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
  withAbstain: z.boolean().default(true),
});

export function CreateStatuteChange({ sessionId }: { sessionId: string }) {
  const utils = api.useUtils();

  const toast = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      withAbstain: true,
    },
  });

  const { mutateAsync: createStatuteChange, error: statuteChangeError } =
    api.elections.createStatuteChange.useMutation({
      async onSuccess() {
        form.reset();
        await utils.elections.statuteChanges.invalidate();
      },

      async onError(error) {
        console.log("Error: ", error);
      },
    });

  const onStatuteChangeCreated = async (
    formData: { name: string; withAbstain: boolean },
    sessionId: string,
  ) => {
    try {
      await createStatuteChange({
        content: formData.name,
        sessionId: sessionId,
        withAbstain: formData.withAbstain,
      });
      toast.toast({
        title: "Statute change created",
        description: "The statute change has been created",
      });
    } catch {
      toast.toast({
        title: "Error",
        description: statuteChangeError?.message,
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="ml-auto" size="sm" variant="outline">
          Add Statute Change
        </Button>
      </DialogTrigger>
      <DialogContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit((data) =>
              onStatuteChangeCreated(data, sessionId),
            )}
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <div className="flex-col space-y-4">
                  <FormItem>
                    <FormLabel>Statute Change name</FormLabel>
                    <FormControl>
                      <div className="flex items-center space-x-2">
                        <Input {...field} placeholder="Statute Change title" />
                      </div>
                    </FormControl>
                    <FormDescription>
                      This is the title of the statute change
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                </div>
              )}
            />
            <FormField
              control={form.control}
              name="withAbstain"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>With abstain</FormLabel>
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit">Add statute change</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
