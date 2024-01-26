"use client";

import type { RealtimeChannel } from "@supabase/supabase-js";
import React, { useEffect, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { useToast } from "~/components/ui/use-toast";
import { api } from "~/trpc/react";

interface VotingBallotProps {
  userId: string;
  electionId: string;
  disabled?: boolean;
  multiSelect?: boolean;
  maxSelect?: number;
  preview?: boolean;
}

export function VotingBallot({
  userId,
  electionId,
  disabled = false,
  multiSelect = false,
  maxSelect = 1,
  preview = false,
}: VotingBallotProps) {
  const [selectedCandidates, setSelectedCandidates] = useState<
    Record<number, number[]>
  >({});
  const [user, setUser] = useState<any>(null);

  const toast = useToast();

  const supabase = createClientComponentClient();

  const [channel, setChannel] = useState<RealtimeChannel>();

  const { data: session } = api.voters.activeSession.useQuery({
    id: electionId,
  });

  const handleCardClick = (positionId: number, candidateId: number) => {
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

  const onSubmit = async (selectedCandidates: number[]) => {
    if (preview) {
      console.log(
        `You have voted for ${selectedCandidates
          .map(
            (candidateId) =>
              session?.positions
                .flatMap((position) => position.candidates)
                .find((candidate) => candidate.id === candidateId).name,
          )
          .join(", ")}`,
      );
    } else {
      console.log(
        `You have voted for ${selectedCandidates
          .map(
            (candidateId) =>
              session.positions
                .flatMap((position: any) => position.candidates)
                .find((candidate: any) => candidate.id === candidateId).name,
          )
          .join(", ")}`,
      );
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

    onSubmit();
    setSelectedCandidates({});
  };

  useEffect(() => {
    if (electionId) {
      const channel = supabase.channel(`elections:${electionId}`);
      setChannel(channel);
    }
  }, [electionId, supabase]);

  useEffect(() => {
    if (!preview && channel) {
      channel.subscribe((status) => {
        if (status === "SUBSCRIBED") {
          void channel.track({ userId });
        }
      });
    }
  }, [channel, preview, userId]);

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold">{session?.name}</h1>
      <div className="grid grid-cols-1 gap-4">
        {session?.positions.map((position: any) => (
          <Card key={position.id}>
            <CardHeader>
              <CardTitle>{position.name}</CardTitle>
              <CardDescription>{position.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-4">
                {position.candidates.map((candidate: any) => (
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
                      <CardDescription>{candidate.description}</CardDescription>
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
