"use client";

import type { RouterOutputs } from "@acme/api";

import { Button } from "~/components/ui/button";
import { useToast } from "~/components/ui/use-toast";
import { api } from "~/trpc/react";

type Status = "not_started" | "in_progress" | "completed";
const statuses = ["not_started", "in_progress", "completed"];

interface SessionToggleButton {
  sessionId: string;
}

export function SessionToggle({ sessionId }: SessionToggleButton) {
  const toast = useToast();
  const session = api.elections.session.useQuery(sessionId);
  const utils = api.useUtils();

  const readableStatus = (status: Status) => {
    return status
      .split("_") // Split the string by underscore
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) // Capitalize the first letter of each word
      .join(" "); // Join the words back with a space
  };

  const { mutateAsync: toggleSession, error: toggleError } =
    api.elections.toggleSession.useMutation({
      async onSuccess() {
        toast.toast({
          title: "Session toggled",
          description: "The session has been toggled",
        });
        await utils.elections.session.invalidate();
      },

      async onError(error) {
        console.log("Error: ", error);
      },
    });

  const onSessionToggled = async (sessionId: string) => {
    try {
      await toggleSession({
        id: sessionId,
      });
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={() => onSessionToggled(sessionId)}
    >
      {readableStatus(session.data?.status ?? "not_started")}
    </Button>
  );
}
