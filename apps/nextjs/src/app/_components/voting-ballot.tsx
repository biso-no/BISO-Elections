"use client";

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";

import type { RouterOutputs } from "@acme/api";

import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader } from "~/components/ui/card";
import { Checkbox } from "~/components/ui/checkbox";
import { Label } from "~/components/ui/label";
import { useToast } from "~/components/ui/use-toast";
import { api } from "~/trpc/react";
import { AlreadyVoted } from "../(vote)/vote/_components/already-voted";

interface VotingBallotProps {
  session?: RouterOutputs["voter"]["activeSession"];
  preview?: boolean;
}

export function VotingBallot({
  session: propSession,
  preview = false,
}: VotingBallotProps) {
  const toast = useToast();
  const utils = api.useUtils();

  const { data: loadedSession } = api.voter.activeSession.useQuery();

  const { data: hasVoted, isLoading } = api.voter.hasVoted.useQuery({
    sessionId: propSession?.id ?? loadedSession?.id ?? "",
  });

  const session = propSession ?? loadedSession;

  const [selectedCandidateIds, setSelectedCandidateIds] = React.useState<
    string[]
  >([]);

  const form = useForm();

  const { mutateAsync: vote } = api.voter.vote.useMutation({
    async onSuccess() {
      form.reset();
      toast.toast({
        title: "Success",
        description: "Vote submitted successfully",
      });
      await utils.voter.activeSession.invalidate();
      await utils.voter.hasVoted.invalidate();
    },
    async onError() {
      toast.toast({
        title: "Error",
        description: "Failed to submit vote",
        variant: "destructive",
      });
    },
  });

  async function handleSubmit() {
    if (!session) return;
    const voteData = {
      sessionId: session.id,
      votes: selectedCandidateIds.map((id) => ({
        electionCandidateId: id,
      })),
    };
    console.log("voteData: ", voteData);
    await vote({
      sessionId: session.id,
      candidateIds: selectedCandidateIds,
    });
  }

  if (hasVoted && !preview) {
    return <AlreadyVoted />;
  }

  if (isLoading) {
    return <VotingBallotLoading />;
  }

  if (!session) {
    return (
      <div className="flex flex-col gap-4">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          No session is currently active, please stand by.
        </p>
        <Button
          variant="outline"
          className="w-full"
          onClick={async () => {
            await utils.voter.activeSession.invalidate();
            await utils.voter.hasVoted.invalidate();
          }}
        >
          Refresh
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 p-4">
      {session?.positions?.map((position) => (
        <Card key={position.id}>
          <CardHeader className=" p-4">
            <h3 className="text-lg font-semibold">{position.name}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              You may select {position.maxSelections}{" "}
              {position.type === "position" ? "candidates" : "option"}
            </p>
          </CardHeader>
          <CardContent>
            {position.candidates.map((candidate) => (
              <div
                key={candidate.id}
                className="flex items-center justify-between py-2"
              >
                <div className="flex items-center gap-3">
                  <Checkbox
                    key={candidate.id}
                    value={candidate.id}
                    checked={selectedCandidateIds.includes(candidate.id)}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        // Determine the current number of selections for this position
                        const currentSelectionsForPosition =
                          selectedCandidateIds.filter((id) =>
                            position.candidates.some(
                              (candidate) => candidate.id === id,
                            ),
                          ).length;

                        // Check if adding this candidate would exceed the max selections, if maxSelections is not null
                        if (
                          position.maxSelections === null ||
                          currentSelectionsForPosition < position.maxSelections
                        ) {
                          setSelectedCandidateIds((prev) => [
                            ...prev,
                            candidate.id,
                          ]);
                        } else {
                          // Optionally, show a toast message or some other form of feedback to inform the user
                          toast.toast({
                            title: "Selection Limit Reached",
                            description: `You can only select up to ${position.maxSelections} candidates for ${position.name}.`,
                            variant: "destructive",
                          });
                        }
                      } else {
                        // If unchecking, remove the candidate ID from the selection
                        setSelectedCandidateIds((prev) =>
                          prev.filter((id) => id !== candidate.id),
                        );
                      }
                    }}
                  />
                  <Label>{candidate.name}</Label>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      ))}
      <Button
        onClick={handleSubmit}
        disabled={selectedCandidateIds.length === 0}
        className="w-full"
      >
        Submit
      </Button>
    </div>
  );
}

function VotingBallotLoading() {
  return (
    <div className="flex flex-col gap-4">
      {/* Repeat this block for the number of cards you want to display as loading */}
      {Array.from({ length: 3 }).map((_, index) => (
        <div key={index} className="animate-pulse">
          <Card className="rounded-md bg-gray-300 dark:bg-gray-700">
            <div className="p-4">
              <div className="mb-2 h-6 rounded-md bg-gray-400 dark:bg-gray-600"></div>
              <div className="h-4 w-5/6 rounded-md bg-gray-400 dark:bg-gray-600"></div>
            </div>
            <div className="p-4 pt-0">
              {/* Repeat for the typical number of candidates */}
              {Array.from({ length: 3 }).map((_, candidateIndex) => (
                <div
                  key={candidateIndex}
                  className="mb-2 flex items-center justify-between"
                >
                  <div className="h-4 w-1/4 rounded-md bg-gray-400 dark:bg-gray-600"></div>
                  <div className="h-4 w-3/4 rounded-md bg-gray-400 dark:bg-gray-600"></div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      ))}
    </div>
  );
}
