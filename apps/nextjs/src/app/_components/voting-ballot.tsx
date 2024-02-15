"use client";

import { useForm } from "react-hook-form";

import type { RouterOutputs } from "@acme/api";

import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader } from "~/components/ui/card";
import { Checkbox } from "~/components/ui/checkbox";
import { Form } from "~/components/ui/form";
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

  async function onSubmit(data: Record<string, any>) {
    if (!loadedSession) return;

    const candidateVotes = loadedSession.positions.flatMap((position) => {
      // For multiSelect, handle array of selected candidate IDs
      const selectedCandidates = Array.isArray(data[position.id])
        ? data[position.id]
        : [data[position.id]];
      return selectedCandidates.map((candidateId) => ({
        electionCandidateId: candidateId,
        electionStatuteChangeOptionId: undefined,
      }));
    });

    const statuteChangeVotes = loadedSession.statuteChanges.map(
      (statuteChange) => ({
        electionCandidateId: undefined, // Explicitly set undefined for clarity
        electionStatuteChangeOptionId: data[statuteChange.id],
      }),
    );

    const votes = [...candidateVotes, ...statuteChangeVotes]; // Use spread operator to merge arrays

    if (preview) {
      toast.toast({
        title: "Preview Mode",
        description: "Vote submission is disabled in preview mode.",
      });
      return;
    }
    console.log(data);
    try {
      await vote({
        sessionId: loadedSession.id,
        votes,
      });
    } catch (error) {
      console.error("Failed to submit vote:", error);
    }
  }

  if (!session) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex w-full flex-col items-center justify-center gap-4 md:flex-row">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-4 md:flex-row">
            {session.positions.map((position) => (
              <Card key={position.id} className="w-full max-w-lg">
                <CardContent className="grid gap-4">
                  <PositionForm
                    position={position}
                    form={form}
                    onSubmit={(candidateId) => {
                      form.setValue(position.id, candidateId);
                    }}
                  />
                </CardContent>
              </Card>
            ))}
            {session.statuteChanges.map((statuteChange) => (
              <Card key={statuteChange.id} className="w-full max-w-lg">
                <CardHeader className="flex items-start justify-between">
                  <div className="space-y-1">
                    <div className="font-bold">
                      Vote on {statuteChange.name}
                    </div>
                    <div className="text-sm">Choose your preference.</div>
                  </div>
                </CardHeader>
                <CardContent className="grid gap-4">
                  <StatuteChangeForm
                    statuteChange={statuteChange}
                    form={form}
                    onSubmit={(optionId) => {
                      form.setValue(statuteChange.id, optionId);
                    }}
                  />
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="top-4 flex justify-end">
            <Button type="submit">Submit Votes</Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

function PositionForm({
  position,
  onSubmit,
  form,
}: PositionFormProps & { maxSelections?: number }) {
  const maxSelections = position.maxSelections;
  return (
    <div>
      <CardHeader className="flex items-start justify-between">
        <div className="space-y-1">
          <div className="font-bold">Vote for {position.name}</div>
          <div className="text-sm">
            Choose {maxSelections || "one"} candidate
            {maxSelections === 1 ? "" : "s"}
          </div>
        </div>
      </CardHeader>
      {position.candidates.map((candidate) => {
        const isChecked = maxSelections
          ? form.watch(position.id)?.includes(candidate.id) // Handle array for multiSelect
          : form.watch(position.id) === candidate.id;

        const handleCheckedChange = () => {
          if (maxSelections) {
            if (maxSelections > 1) {
              const currentValues = form.watch(position.id) || [];
              if (currentValues.includes(candidate.id)) {
                // Remove if already selected
                const newValues = currentValues.filter(
                  (id) => id !== candidate.id,
                );
                onSubmit(newValues);
              } else {
                // Add new selection if under maxSelections limit
                if (
                  maxSelections === undefined ||
                  currentValues.length < maxSelections
                ) {
                  const newValues = [...currentValues, candidate.id];
                  onSubmit(newValues);
                } else {
                  // Optionally handle the scenario where the limit is reached (e.g., show a message or replace an existing selection)
                  console.log(
                    `Maximum of ${maxSelections} selections reached.`,
                  );
                  // Example: To replace the first selected item when the limit is reached (uncomment the next line)
                  // onSubmit([...currentValues.slice(1), candidate.id]);
                }
              }
            }
          } else {
            onSubmit(candidate.id);
          }
        };

        return (
          <div key={candidate.id} className="flex items-center space-x-2">
            <Checkbox
              name={position.id}
              value={candidate.id}
              onCheckedChange={handleCheckedChange}
              checked={isChecked}
            />
            <label htmlFor={candidate.id}>{candidate.name}</label>
          </div>
        );
      })}
    </div>
  );
}

function StatuteChangeForm({
  statuteChange,
  onSubmit,
  form,
}: StatuteChangeFormProps) {
  return (
    <div>
      {statuteChange.options.map((option) => (
        <div key={option.id} className="flex items-center space-x-2">
          <Checkbox
            name={statuteChange.id}
            value={option.id}
            onCheckedChange={() => onSubmit(option.id)}
            checked={form.watch(statuteChange.id) === option.id}
          />
          <label htmlFor={option.id}>{option.name}</label>
        </div>
      ))}
    </div>
  );
}

interface PositionFormProps {
  position: {
    id: string;
    name: string;
    candidates: { id: string; name: string }[];
    maxSelections?: number; // Add this prop to the interface
  };
  onSubmit: (candidateId: string | string[]) => void; // Adjust type to accept string array for multiSelect
  form: ReturnType<typeof useForm>;
  multiSelect?: boolean; // Add this prop to the interface
  maxSelections?: number; // Add this prop to the interface
}

interface StatuteChangeFormProps {
  statuteChange: {
    id: string;
    name: string;
    options: { id: string; name: string }[];
  };
  onSubmit: (optionId: string) => void;
  form: ReturnType<typeof useForm>;
}
