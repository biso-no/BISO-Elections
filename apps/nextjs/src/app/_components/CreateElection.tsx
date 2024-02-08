"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

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
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { useToast } from "~/components/ui/use-toast";
import { api } from "~/trpc/react";

const formSchema = z.object({
  name: z.string().min(1),
  date: z.string(),
  campus: z.enum(["Bergen", "Oslo", "Stavanger", "Trondheim", "National"]),
});

interface CreateElectionDialogProps {
  onClose: React.Dispatch<React.SetStateAction<boolean>>;
}

export function CreateElection({ onClose }: CreateElectionDialogProps) {
  const utils = api.useUtils();
  const toast = useToast();

  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      date: new Date().toISOString().slice(0, 10),
      campus: "National",
    },
  });

  const { mutateAsync: createElection, error } =
    api.elections.create.useMutation({
      async onSuccess(data) {
        onClose(false);
        form.reset();
        toast.toast({
          title: "Success",
          description: "Election created successfully!",
        });
        console.log("data: ", data);
        await utils.elections.all.invalidate();
        router.push(`/${data[0]?.id}`);
      },

      async onError() {
        toast.toast({
          title: "Error",
          description: error?.message,
          variant: "destructive",
        });
      },
    });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      await createElection(data);
      await utils.elections.all.invalidate();
    } catch {
      console.log("Error: ", error);
      toast.toast({
        title: "Error",
        description: error?.message,
        variant: "destructive",
      });
    }
  };

  const currentDate = new Date();

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Create election</DialogTitle>
        <DialogDescription>
          Create an election for your campus
        </DialogDescription>
      </DialogHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div>
            <div className="space-y-4 py-2 pb-4">
              <div className="space-y-2">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Election name</FormLabel>
                      <FormControl>
                        <Input placeholder="General Assembly 2023" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Election date</FormLabel>
                      <FormControl>
                        <Input
                          placeholder={`${currentDate
                            .toISOString()
                            .slice(0, 10)}`}
                          {...field}
                          type="date"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="campus"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Campus</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue="National"
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select a campus" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Bergen">Bergen</SelectItem>
                            <SelectItem value="Oslo">Oslo</SelectItem>
                            <SelectItem value="Stavanger">Stavanger</SelectItem>
                            <SelectItem value="Trondheim">Trondheim</SelectItem>
                            <SelectItem value="National">National</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                form.reset();
                onClose(false);
              }}
            >
              Cancel
            </Button>
            <Button type="submit">Create</Button>
          </DialogFooter>
        </form>
      </Form>
    </DialogContent>
  );
}
