"use client";

import type { RouterOutputs } from "@acme/api";

import { Button } from "~/components/ui/button";
import { useToast } from "~/components/ui/use-toast";
import { api } from "~/trpc/react";

type Status = "not_started" | "in_progress" | "completed";
const statuses = ["not_started", "in_progress", "completed"];

interface SessionToggleButton {
  sessions: RouterOutputs["elections"]["sessions"];
}
export function SessionToggleButton({ sessions }: SessionToggleButton) {
  const toast = useToast();
  const utils = api.useUtils();

  const { mutateAsync: updateSession, error: updateSessionError } =
    api.elections.updateSession.useMutation({
      async onSuccess() {
        toast.toast({
          title: "Session updated",
          description: "The session has been updated",
        });
        await utils.elections.sessions.invalidate();
      },

      async onError() {
        toast.toast({
          title: "Error",
          description: updateSessionError?.message,
          variant: "destructive",
        });
      },
    });

  const onSessionToggle = async (
    sessionId: string,
    currentStatusIndex: number,
  ) => {
    console.log("Current status: ", statuses[currentStatusIndex]);
    if (sessions) {
      // Find any session that is in progress
      const inProgressSession = sessions.find(
        (session) => session.status === "in_progress",
      );

      // If there is a session in progress, update its status to disabled
      if (inProgressSession) {
        await updateSession({
          id: inProgressSession.id,
          status: "completed" as Status,
        });
      }

      // Continue with the rest of the function
      await updateSession({
        id: sessionId,
        status: statuses[(currentStatusIndex + 1) % statuses.length] as Status,
      });
    }
  };

  return (
    <>
      <Button
        onClick={() =>
          onSessionToggle(session.id, statuses.indexOf(session.status))
        }
        disabled={session.status === statuses[2]} // "completed"
        variant={
          session.status === statuses[1] // "in_progress"
            ? "destructive"
            : session.status === statuses[2] // "completed"
              ? "ghost"
              : "default"
        }
      >
        {session.status === statuses[1] // "in_progress"
          ? "Complete"
          : session.status === statuses[2] // "completed"
            ? "Completed"
            : "Start"}
      </Button>
    </>
  );
}
