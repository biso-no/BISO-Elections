"use client";

import React, { useState } from "react";

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
  userId: string;
  electionId: string;
  disabled?: boolean;
  multiSelect?: boolean;
  maxSelect?: number;
  preview?: boolean;
}

export function VotingBallot({
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

  const { data: session } = api.voter.activeSession.useQuery({
    id: electionId,
  });

  const { mutateAsync: vote } = api.voter.vote.useMutation();

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
                .flatMap((position) => position.candidates)
                .find((candidate) => candidate.id === candidateId)?.name ??
              "Candidate not found",
          )
          .join(", ")}`,
      );
    } else {
      try {
        await vote({ candidateIds: selectedCandidates });
        toast.toast({
          title: "Success",
          description: "Your vote has been submitted",
        });
      } catch (error) {
        toast.toast({
          title: "Error",
          description: "Something went wrong",
          variant: "destructive",
        });
      }
    }
  };

  async function handleSubmit() {
    if (preview) {
      toast.toast({
        title: "Preview Mode",
        description: `You're currently in preview mode. Your preview votes: ${Object.values(
          selectedCandidates,
        )
          .flat()
          .map(
            (candidateId) =>
              session?.positions
                .flatMap((position) => position.candidates)
                .find((candidate) => candidate.id === candidateId)?.name ??
              "Candidate not found",
          )
          .join(", ")}`,
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

    const candidateIds = Object.values(selectedCandidates).flat();

    await onSubmit(candidateIds);
    setSelectedCandidates({});
  }

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
