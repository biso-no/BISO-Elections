"use client";

import React, { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import type { RouterOutputs } from "@acme/api";

import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { useToast } from "~/components/ui/use-toast";
import { socket } from "~/lib/io";
import { api } from "~/trpc/react";

interface VotingBallotProps {
  preview?: boolean;
  initialSession: RouterOutputs["voter"]["activeSession"];
  initialHasVoted: RouterOutputs["voter"]["hasVoted"];
  multiSelect?: boolean;
  maxSelect?: number;
  disabled?: boolean;
}

const formSchema = z.object({
  votes: z.array(
    z.object({
      electionCandidateId: z.string().optional(),
      electionStatuteChangeId: z.string().optional(),
    }),
  ),
});
export function VotingBallot({
  initialSession,
  initialHasVoted,
  preview = false,
  multiSelect = false,
  maxSelect = 1,
  disabled = false,
}: VotingBallotProps) {
  const [session, setSession] = useState(initialSession);
  const [alreadyVoted, setAlreadyVoted] = useState(initialHasVoted);
  const toast = useToast();
  const { data: me } = api.auth.me.useQuery();
  const email = me?.email;
  const utils = api.useUtils();
  const { data: activeSession } = api.voter.activeSession.useQuery();

  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: { votes: [] },
    resolver: zodResolver(formSchema),
  });

  const [selectedCandidates, setSelectedCandidates] = useState<
    Record<string, string[]>
  >({});

  const [selectedStatuteChanges, setSelectedStatuteChanges] = useState<
    Record<string, string[]>
  >({});

  const { data: sessionByIdData } = api.voter.sessionById.useQuery({
    id: initialSession?.id,
  });

  useEffect(() => {
    if (!preview) {
      socket.on("connect", () => {
        console.log(email + " connected to the socket server");
      });
      socket.on("vote", (msg) => {
        console.log("message: " + msg);
      });
      socket.on("newSession", async (sessionId) => {
        console.log("Session updated:", sessionId);
        await utils.voter.activeSession.invalidate();
      });
      return () => {
        socket.disconnect();
      };
    }
  }, [email, preview, utils.voter.activeSession]);

  /*
  useEffect(() => {
    const interval = setInterval(() => {
      utils.voter.activeSession
        .invalidate()
        .then(() => {
          console.log("Session invalidated successfully");
        })
        .catch((error) => {
          console.error("Error invalidating session:", error);
        });
    }, 10000);
    return () => clearInterval(interval);
  }, [utils.voter.activeSession]);
*/
  useEffect(() => {
    if (activeSession && !preview) {
      setSession(activeSession);
      setAlreadyVoted(false);
    } else if (sessionByIdData) {
      setSession(sessionByIdData);
    }
  }, [activeSession, preview, sessionByIdData]);

  if (!session) {
    return null;
  }

  const { mutateAsync: vote } = api.voter.vote.useMutation({
    async onSuccess() {
      form.reset();
      toast.toast({
        title: "Success",
        description: "Vote submitted successfully",
      });
      socket.emit("vote");
      await utils.voter.activeSession.invalidate();
      setAlreadyVoted(true);
    },
    async onError() {
      toast.toast({
        title: "Error",
        description: "Failed to submit vote",
        variant: "destructive",
      });
    },
  });

  if (!activeSession) {
    return null;
  }

  const handleSubmit = async () => {
    const isSelectionValid = Object.values(selectedCandidates).every(
      (selection) => {
        return multiSelect
          ? selection.length <= maxSelect
          : selection.length === 1;
      },
    );

    if (!isSelectionValid) {
      toast.toast({
        title: "Invalid Selection",
        description: `Please make a valid selection for each position.`,
        variant: "destructive",
      });
      return;
    }

    const candidateVotes = Object.entries(selectedCandidates)
      .map(([positionId, candidateIds]) => {
        return candidateIds.map((candidateId) => {
          return {
            electionCandidateId: candidateId,
            electionStatuteChangeId: undefined,
          };
        });
      })
      .flat();

    const statuteChangeVotes = Object.keys(selectedStatuteChanges).map(
      (statuteChangeId) => {
        return {
          electionCandidateId: undefined,
          electionStatuteChangeId: statuteChangeId,
        };
      },
    );

    await vote({
      sessionId: session.id,
      votes: [...candidateVotes, ...statuteChangeVotes],
    });
  };

  const handleCardClick = (positionId: string, candidateId: string) => {
    setSelectedCandidates((prevSelected) => {
      const updatedSelection = [...(prevSelected[positionId] ?? [])];
      if (multiSelect) {
        const index = updatedSelection.indexOf(candidateId);
        if (index > -1) {
          updatedSelection.splice(index, 1);
        } else {
          if (!maxSelect || updatedSelection.length < maxSelect) {
            updatedSelection.push(candidateId);
          }
        }
      } else {
        updatedSelection.length = 0; // Clear the array
        updatedSelection.push(candidateId);
      }
      return { ...prevSelected, [positionId]: updatedSelection };
    });
  };

  const previewSubmit = async () => {
    toast.toast({
      title: "Preview",
      description: "Vote submitted successfully",
    });
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold">{session?.name}</h1>
      <div className="grid grid-cols-1 gap-4">
        {session?.positions.map((position) => (
          <Card key={position.id}>
            <CardHeader>
              <CardTitle>{position.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-4">
                {position.candidates.map((candidate) => (
                  <Card
                    key={candidate.id}
                    onClick={() => handleCardClick(position.id, candidate.id)}
                    className={`${
                      selectedCandidates[position.id]?.includes(candidate.id)
                        ? "border-2 border-blue-500"
                        : ""
                    }`}
                  >
                    <CardHeader>
                      <CardTitle>{candidate.name}</CardTitle>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
        {session?.statuteChanges.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Statute Changes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-4">
                {session?.statuteChanges.map((statuteChange) => (
                  <Card
                    key={statuteChange.id}
                    onClick={() =>
                      setSelectedStatuteChanges((prevSelected) => {
                        const updatedSelection = [
                          ...(prevSelected[statuteChange.id] ?? []),
                        ];
                        if (multiSelect) {
                          const index = updatedSelection.indexOf(
                            statuteChange.id,
                          );
                          if (index > -1) {
                            updatedSelection.splice(index, 1);
                          } else {
                            if (
                              !maxSelect ||
                              updatedSelection.length < maxSelect
                            ) {
                              updatedSelection.push(statuteChange.id);
                            }
                          }
                        } else {
                          updatedSelection.length = 0; // Clear the array
                          updatedSelection.push(statuteChange.id);
                        }
                        return {
                          ...prevSelected,
                          [statuteChange.id]: updatedSelection,
                        };
                      })
                    }
                    className={`${
                      selectedStatuteChanges[statuteChange.id]?.includes(
                        statuteChange.id,
                      )
                        ? "border-2 border-blue-500"
                        : ""
                    }`}
                  >
                    <CardHeader>
                      <CardTitle>{statuteChange.name}</CardTitle>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
      <CardFooter>
        <Button
          disabled={disabled}
          onClick={preview ? previewSubmit : handleSubmit}
          className="w-full"
        >
          Submit
        </Button>
      </CardFooter>
    </div>
  );
}
