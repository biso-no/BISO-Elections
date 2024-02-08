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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "~/components/ui/form";
import { useToast } from "~/components/ui/use-toast";
import { api } from "~/trpc/react";
import { AlreadyVoted } from "./already-voted";

interface VotingBallotProps {
  initialSession: RouterOutputs["voter"]["activeSession"];
  initialHasVoted: RouterOutputs["voter"]["hasVoted"];
}

const formSchema = z.object({
  candidates: z.array(z.string()),
});

export function VotingBallot({
  initialSession,
  initialHasVoted,
}: VotingBallotProps) {
  const [session, setSession] = useState(initialSession);
  const [selectedCandidates, setSelectedCandidates] = useState<
    Record<number, string>
  >({});
  const [alreadyVoted, setAlreadyVoted] = useState(initialHasVoted);

  const toast = useToast();

  const utils = api.useUtils();

  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: { candidates: [] },
    resolver: zodResolver(formSchema),
  });

  const { data: activeSession } = api.voter.activeSession.useQuery();

  //Every 15 seconds, invalidate the active session query to get the latest active session
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

  useEffect(() => {
    if (activeSession) {
      setSession(activeSession);
      setAlreadyVoted(false);
    }
  }, [activeSession]);

  if (!session) {
    return null;
  }

  const { data: hasVoted } = api.voter.hasVoted.useQuery({
    sessionId: session.id,
  });

  const { mutateAsync: vote, error } = api.voter.vote.useMutation({
    async onSuccess(data) {
      form.reset();
      toast.toast({
        title: "Success",
        description: "Vote submitted successfully",
      });
      console.log("data: ", data);
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

  if (!activeSession) {
    return null;
  }

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    console.log("data", data);

    // Check if all positions have a corresponding candidate selected
    if (session.positions.length !== data.candidates.filter(Boolean).length) {
      toast.toast({
        title: "Error",
        description: "You must vote for all positions before submitting",
        variant: "destructive",
      });
      return;
    }

    await vote({
      electionCandidateIds: data.candidates,
      sessionId: session.id,
    });
    setAlreadyVoted(true);
  };

  const { control, setValue } = form;

  if (alreadyVoted) {
    return <AlreadyVoted />;
  }

  return (
    <Card className="w-full md:w-1/4">
      <CardHeader>
        <CardTitle>{session.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            {activeSession.positions.map((position, index) => (
              <FormField
                control={form.control}
                name={`candidates.${index}`}
                key={position.id}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{position.name}</FormLabel>
                    <FormControl>
                      <div key={position.id}>
                        {position.candidates.map((candidate) => (
                          <Card
                            key={candidate.id}
                            //Hightlight selected candidates
                            className={`${
                              selectedCandidates[index] === candidate.id
                                ? "bg-blue-100"
                                : ""
                            }`}
                            onClick={() => {
                              setSelectedCandidates((prev) => {
                                const prevForPosition = prev[index] || "";
                                const newForPosition =
                                  prevForPosition === candidate.id
                                    ? ""
                                    : candidate.id;
                                return { ...prev, [index]: newForPosition };
                              });
                              const newValue = Array.isArray(field.value)
                                ? [...field.value]
                                : [];
                              const candidateIndex = newValue.indexOf(
                                candidate.id,
                              );
                              if (candidateIndex === -1) {
                                newValue[index] = candidate.id;
                              } else {
                                newValue[index] = "";
                              }
                              setValue(`candidates.${index}`, newValue[index]); // Update form state using setValue
                            }}
                          >
                            <CardHeader>
                              <CardTitle>{candidate.name}</CardTitle>
                            </CardHeader>
                          </Card>
                        ))}
                      </div>
                    </FormControl>
                  </FormItem>
                )}
              />
            ))}
            <CardFooter>
              <Button disabled={form.formState.isSubmitting} type="submit">
                Submit
              </Button>
            </CardFooter>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
