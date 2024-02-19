"use client";

import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { PDFResults } from "~/app/_components/pdf-results";
import { VotesDialog } from "~/app/_components/votes-dialog";
import { PopoverActions } from "~/components/popover-actions";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion";
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { useToast } from "~/components/ui/use-toast";
import { useElectionId } from "~/lib/hooks/useElectionId";
import { api } from "~/trpc/react";
import { CreatePosition } from "./_components/create-position";
import { CreateSession } from "./_components/create-session";
import { CreateStatuteChange } from "./_components/create-statute-change";
import { DeleteSession } from "./_components/delete-session";
import { PreviewSession } from "./_components/preview-session";
import { Session } from "./_components/session-table";

const formSchema = z.object({
  name: z.string().min(1),
});

const candidateFormSchema = z.object({
  name: z.string().min(1),
});

type Status = "not_started" | "in_progress" | "completed";
const statuses = ["not_started", "in_progress", "completed"];

export default function SessionPage() {
  const electionId = useElectionId();

  const utils = api.useUtils();

  const toast = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  const candidateForm = useForm<z.infer<typeof candidateFormSchema>>({
    resolver: zodResolver(candidateFormSchema),
    defaultValues: {
      name: "",
    },
  });

  if (!electionId) {
    return null;
  }

  const { data: sessions } = api.elections.sessions.useQuery(electionId);

  const { mutateAsync: createCandidate, error: candidateError } =
    api.elections.createCandidate.useMutation({
      async onSuccess() {
        form.reset();
        await utils.elections.sessions.invalidate();
      },

      async onError() {
        console.log("Error: ", candidateError);
      },
    });

  const onCandidateCreated = async (
    formData: { name: string },
    positionId: string,
  ) => {
    try {
      await createCandidate({
        name: formData.name,
        electionPositionId: positionId,
      });
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  const { mutateAsync: deleteCandidate, error: deleteCandidateError } =
    api.elections.deleteCandidate.useMutation({
      async onSuccess() {
        toast.toast({
          title: "Candidate deleted",
          description: "The candidate has been deleted",
        });
        await utils.elections.sessions.invalidate();
      },

      async onError() {
        toast.toast({
          title: "Error",
          description: deleteCandidateError?.message,
          variant: "destructive",
        });
      },
    });

  const onCandidateDelete = async (candidateId: string) => {
    try {
      await deleteCandidate(candidateId);
    } catch (error) {
      console.log("Error: ", error);
    }
  };
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

  const { mutateAsync: deleteStatuteChange, error: deleteStatuteChangeError } =
    api.elections.deleteStatuteChange.useMutation({
      async onSuccess() {
        toast.toast({
          title: "Statute change deleted",
          description: "The statute change has been deleted",
        });
        await utils.elections.sessions.invalidate();
      },

      async onError() {
        toast.toast({
          title: "Error",
          description: deleteStatuteChangeError?.message,
          variant: "destructive",
        });
      },
    });

  const onStatuteChangeDelete = async (statuteChangeId: string) => {
    try {
      await deleteStatuteChange({ id: statuteChangeId });
    } catch (error) {
      console.log("Error: ", error);
    }
  };

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

  return <Session id={electionId} />;
}
