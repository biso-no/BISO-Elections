"use client";

import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import type { RouterOutputs } from "@acme/api";

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

export function EditPosition({
  position,
}: {
  position: RouterOutputs["elections"]["sessions"][0]["positions"][0];
}) {
  const utils = api.useUtils();
  const toast = useToast();

  // Initialize form with React Hook Form's useForm, using default values from the position prop
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    // Make sure to use position properties directly for defaultValues
    defaultValues: {
      name: position.name ?? "",
      maxSelections: position.maxSelections?.toString() ?? "1",
      withAbstain: position.withAbstain ?? true,
    },
  });

  const { mutateAsync: updatePosition, error: positionError } =
    api.elections.updatePosition.useMutation({
      async onSuccess() {
        // Reset form with updated position values to ensure form reflects the current state
        form.reset({
          name: position.name,
          maxSelections: position.maxSelections?.toString() ?? "1",
          withAbstain: position.withAbstain ?? true,
        });
        await utils.elections.sessions.invalidate();
        toast.toast({
          title: "Position updated",
          description: "The position has been updated successfully.",
        });
      },
      async onError(error) {
        console.error("Error: ", error);
        toast.toast({
          title: "Error",
          description: positionError?.message ?? "Failed to update position.",
          variant: "destructive",
        });
      },
    });

  const onPositionUpdated = async (
    formData: { name: string; maxSelections?: string; withAbstain?: boolean },
    positionId: string,
  ) => {
    await updatePosition({
      id: positionId,
      name: formData.name,
      maxSelections: formData.maxSelections
        ? parseInt(formData.maxSelections)
        : undefined,
      withAbstain: formData.withAbstain,
    });
  };

  if (!position) {
    return null;
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm" variant="outline">
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit((data) =>
              onPositionUpdated(data, position.id),
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
            <DialogFooter>
              <Button type="submit">Update position</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export function DeletePosition({
  position,
}: {
  position: RouterOutputs["elections"]["sessions"][0]["positions"][0];
}) {
  const utils = api.useUtils();
  const toast = useToast();

  const { mutateAsync: deletePosition, error: positionError } =
    api.elections.deletePosition.useMutation({
      async onSuccess() {
        await utils.elections.sessions.invalidate();
      },

      async onError(error) {
        console.log("Error: ", error);
      },
    });

  const onPositionDeleted = async (positionId: string) => {
    try {
      await deletePosition(positionId);
      toast.toast({
        title: "Position deleted",
        description: "The position has been deleted",
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
        <Button size="sm" variant="outline" color="red">
          Delete
        </Button>
      </DialogTrigger>
      <DialogContent>
        <p>Are you sure you want to delete this position?</p>
        <DialogFooter>
          <Button onClick={() => onPositionDeleted(position.id)} color="red">
            Delete position
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
