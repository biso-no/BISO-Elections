"use client";

import type { RealtimeChannel } from "@supabase/supabase-js";
import React, { useEffect, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

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
import { api } from "~/trpc/react";

interface VotingBallotProps {
  initialSession?: RouterOutputs["voter"]["sessionById"];
  initialSessionId?: string;
  userId?: string;
  electionId: string;
  disabled?: boolean;
  multiSelect?: boolean;
  maxSelect?: number;
  preview?: boolean;
}

export function VotingBallot({
  initialSessionId,
  userId,
  electionId,
  disabled = false,
  multiSelect = false,
  maxSelect = 1,
  preview = false,
}: VotingBallotProps) {
  const [selectedCandidates, setSelectedCandidates] = useState<
    Record<string, string[]>
  >({});

  const toast = useToast();

  const supabase = createClientComponentClient();

  const [channel, setChannel] = useState<RealtimeChannel>();

  const [activeSessionId, setActiveSessionId] =
    useState<string>(initialSessionId);

  if (!initialSessionId) {
    throw new Error("sessionId is required");
  }

  useEffect(() => {
    console.log("Active session id", activeSessionId);
  }, [activeSessionId]);

  const { data: session } = api.voter.sessionById.useQuery({
    id: activeSessionId,
  });

  const { mutateAsync: vote } = api.voter.vote.useMutation({
    onSuccess: () => {
      toast.toast({
        title: "Vote Submitted",
        description: "Your vote has been submitted successfully.",
      });
    },
    onError: (error) => {
      toast.toast({
        title: "Vote Failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  useEffect(() => {
    if (userId && !preview) {
      const channel = supabase.channel(`elections:${electionId}`);
      channel.subscribe();
      setChannel(channel);
    }
  }, [userId, electionId, supabase, preview]);

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

  const onSubmit = async (selectedCandidates: string[]) => {
    if (preview) {
      console.log(
        `You have voted for ${selectedCandidates
          .map(
            (candidateId) =>
              session?.positions
                ?.flatMap((position) => position.candidates)
                .find((candidate) => candidate.id === candidateId)?.name,
          )
          .join(", ")}`,
      );
    } else {
      await vote({
        sessionId: initialSessionId,
        candidateIds: selectedCandidates,
      });
    }
  };

  const handleSubmit = () => {
    if (preview) {
      toast.toast({
        title: "Preview Mode",
        description: `You're currently in preview mode. No changes can be made.`,
        variant: "destructive",
      });
      return;
    }

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

    void onSubmit(Object.values(selectedCandidates).flat());
    setSelectedCandidates({});
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
      </div>
      <CardFooter>
        <Button disabled={disabled} onClick={handleSubmit} className="w-full">
          Submit
        </Button>
      </CardFooter>
    </div>
  );
}
