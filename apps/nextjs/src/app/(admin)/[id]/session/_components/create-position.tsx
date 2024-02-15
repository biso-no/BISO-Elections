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
  maxSelections: z.string().optional(),
  withAbstain: z.boolean().optional(),
});

export function CreatePosition({ sessionId }: { sessionId: string }) {
  const utils = api.useUtils();

  const [multiSelect, setMultiSelect] = React.useState(false);

  const toast = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      maxSelections: "1",
      withAbstain: true,
    },
  });

  const { mutateAsync: createPosition, error: positionError } =
    api.elections.createPosition.useMutation({
      async onSuccess() {
        form.reset();
        await utils.elections.sessions.invalidate();
      },

      async onError(error) {
        console.log("Error: ", error);
      },
    });

  const onPositionCreated = async (
    formData: { name: string; maxSelections?: string; withAbstain?: boolean },
    sessionId: string,
  ) => {
    try {
      await createPosition({
        name: formData.name,
        maxSelections: formData.maxSelections
          ? parseInt(formData.maxSelections)
          : undefined,
        sessionId: sessionId,
        withAbstain: formData.withAbstain,
      });
      toast.toast({
        title: "Position created",
        description: "The position has been created",
      });
    } catch {
      toast.toast({
        title: "Error",
        description: positionError?.message,
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="ml-auto" size="sm">
          Add Position
        </Button>
      </DialogTrigger>
      <DialogContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit((data) =>
              onPositionCreated(data, sessionId),
            )}
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Position name</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Position name" />
                  </FormControl>
                  <FormDescription>
                    This is the name of the position
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="withAbstain"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormLabel>
                    Allow voters to abstain from voting on this position
                  </FormLabel>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Checkbox
              checked={multiSelect}
              onCheckedChange={() => setMultiSelect(!multiSelect)}
            />
            <FormLabel>Allow multiple selections</FormLabel>

            {multiSelect && (
              <FormField
                control={form.control}
                name="maxSelections"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Max selections"
                        type="number"
                      />
                    </FormControl>
                    <FormDescription>
                      Allow voter to select {field.value} candidates.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            <DialogFooter>
              <Button type="submit">Add position</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
