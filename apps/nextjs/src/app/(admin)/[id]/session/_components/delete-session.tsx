"use client";

import { Trash } from "lucide-react";

import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { useToast } from "~/components/ui/use-toast";
import { api } from "~/trpc/react";

interface DeleteSession {
  sessionId: string;
}

export function DeleteSession({ sessionId }: DeleteSession) {
  const utils = api.useUtils();
  const toast = useToast();

  const { mutateAsync: deleteSession, error: deleteError } =
    api.elections.deleteSession.useMutation({
      async onSuccess() {
        toast.toast({
          title: "Session deleted",
          description: "The session has been deleted",
        });
        await utils.elections.sessions.invalidate();
      },

      async onError() {
        toast.toast({
          title: "Error",
          description: deleteError?.message,
          variant: "destructive",
        });
      },
    });

  const onDelete = async (sessionId: string) => {
    try {
      await deleteSession(sessionId);
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger>
        <Button variant="ghost">
          <Trash className="text-red-600" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Session</DialogTitle>
          <DialogClose />
        </DialogHeader>
        <DialogDescription>
          Are you sure you want to delete this session?
        </DialogDescription>
        <DialogFooter>
          <Button variant="destructive" onClick={() => onDelete(sessionId)}>
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
