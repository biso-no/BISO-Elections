"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
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
import { useToast } from "~/components/ui/use-toast";
import { api } from "~/trpc/react";

interface InviteUsersProps {
  electionId: string;
}

const formSchema = z.object({
  users: z.array(
    z.object({
      email: z.string().email(),
      name: z.string().min(1),
      voteWeight: z.number().min(1),
    }),
  ),
});

export function InviteUsers({ electionId }: InviteUsersProps) {
  //A button that opens a dialog. In the dialog there are 3 inputs per row. Include a button to add more rows. Each row represent a user to invite.
  //When the user clicks the invite button, the users are invited and the dialog closes.

  const toast = useToast();

  const [isOpen, setIsOpen] = useState(false);
  const [rows, setRows] = useState(1);

  const { mutateAsync: invite } = api.elections.inviteVoters.useMutation({
    onSuccess: () => {
      toast.toast({
        title: "Voters invited",
        description: "The voters have been invited",
      });
      setIsOpen(false);
    },
    onError: (error) => {
      toast.toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      users: [{ email: "", name: "", voteWeight: 1 }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "users",
  });

  if (rows < 1) {
    setRows(1);
  }

  const addRow = () => {
    setRows(rows + 1);
  };

  const removeRow = () => {
    setRows(rows - 1);
  };

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    console.log("data: ", data);
    try {
      await invite({ electionId, users: data.users });
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button>Invite voters</Button>
        </DialogTrigger>
        <DialogContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <DialogHeader>
                <DialogTitle>Invite voters</DialogTitle>
                <DialogDescription>
                  Invite voters to the election.
                </DialogDescription>
              </DialogHeader>
              {fields.map((field, index) => (
                <div key={field.id} className="flex items-center space-x-2">
                  <FormField
                    control={form.control}
                    name={`users.${index}.email`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Voter email</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="John Doe"
                            {...form.register(`users.${index}.email`)}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`users.${index}.name`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Voter name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="John Doe"
                            {...form.register(`users.${index}.name`)}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`users.${index}.voteWeight`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Vote weight</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            defaultValue={1}
                            {...form.register(`users.${index}.voteWeight`)}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <Button
                    type="button"
                    onClick={() => remove(index)}
                    className="flex-none"
                  >
                    Remove
                  </Button>
                </div>
              ))}
              <Button
                type="button"
                onClick={() => append({ email: "", name: "", voteWeight: 1 })}
              >
                Add Voter
              </Button>
              <DialogFooter>
                <Button type="submit">Invite</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
}
