"use client";

import React from "react";
import { useForm } from "react-hook-form";

import type { RouterOutputs } from "@acme/api";

import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader } from "~/components/ui/card";
import { Checkbox } from "~/components/ui/checkbox";
import { Label } from "~/components/ui/label";
import { useToast } from "~/components/ui/use-toast";
import { api } from "~/trpc/react";

interface VotingBallotProps {
  session?: RouterOutputs["voter"]["sessionById"];
  preview?: boolean;
}

export function VotingBallot({
  session: propSession,
  preview = false,
}: VotingBallotProps) {
  const toast = useToast();
  const utils = api.useUtils();

  const { data: loadedSession } = api.voter.activeSession.useQuery();

  const session = propSession ?? loadedSession;

  const [selectedCandidateIds, setSelectedCandidateIds] = React.useState<
    string[]
  >([]);
  const [selectedStatuteChangeOptions, setSelectedStatuteChangeOptions] =
    React.useState<string[]>([]);

  const form = useForm();

  const { mutateAsync: vote } = api.voter.vote.useMutation({
    async onSuccess() {
      form.reset();
      toast.toast({
        title: "Success",
        description: "Vote submitted successfully",
      });
      await utils.voter.activeSession.invalidate();
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
        electionStatuteChangeOptionId: selectedStatuteChangeOptions,
      })),
    };
    console.log("voteData: ", voteData);
    await vote({
      sessionId: session.id,
      candidateIds: selectedCandidateIds,
      electionStatuteChangeOptionIds: selectedStatuteChangeOptions,
    });
  }

  return (
    <div className="flex flex-col gap-4">
      {session?.positions.map((position) => (
        <Card key={position.id}>
          <CardHeader>
            <h3 className="text-lg font-semibold">{position.name}</h3>
          </CardHeader>
          <CardContent>
            {position.candidates.map((candidate) => (
              <div
                key={candidate.id}
                className="flex items-center justify-between"
              >
                <Checkbox
                  key={candidate.id}
                  value={candidate.id}
                  checked={selectedCandidateIds.includes(candidate.id)}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setSelectedCandidateIds((prev) => [
                        ...prev,
                        candidate.id,
                      ]);
                    } else {
                      setSelectedCandidateIds((prev) =>
                        prev.filter((id) => id !== candidate.id),
                      );
                    }
                  }}
                />
                <Label>{candidate.name}</Label>
              </div>
            ))}
          </CardContent>
        </Card>
      ))}

      {session?.statuteChanges.map((option) => (
        <Card key={option.id}>
          <CardHeader>
            <h3 className="text-lg font-semibold">{option.name}</h3>
          </CardHeader>
          <CardContent>
            <Checkbox
              key={option.id}
              value={option.id}
              checked={selectedStatuteChangeOptions.includes(option.id)}
              onCheckedChange={(checked) => {
                if (checked) {
                  setSelectedStatuteChangeOptions((prev) => [
                    ...prev,
                    option.id,
                  ]);
                } else {
                  setSelectedStatuteChangeOptions((prev) =>
                    prev.filter((id) => id !== option.id),
                  );
                }
              }}
            />
            <Label>{option.name}</Label>
          </CardContent>
        </Card>
      ))}

      <Button onClick={handleSubmit}>Submit</Button>
    </div>
  );
}
