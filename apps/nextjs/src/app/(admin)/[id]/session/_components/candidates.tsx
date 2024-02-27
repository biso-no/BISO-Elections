"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Pen, Trash } from "lucide-react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import type { RouterOutputs } from "@acme/api";

import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { useToast } from "~/components/ui/use-toast";
import { api } from "~/trpc/react";

interface CandidateProps {
  positionId: string;
}

const formSchema = z.object({
  name: z.string().min(1),
});

export function Candidates({ positionId }: CandidateProps) {
  const utils = api.useUtils();
  const toast = useToast();

  const [candidateInputActive, setCandidateInputActive] = useState(false);

  const { data: candidates } = api.elections.candidates.useQuery(positionId);

  const filteredCandidates = candidates?.filter(
    (candidate) => candidate.name.toLowerCase() !== "abstain",
  );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  const { mutateAsync: createCandidate } =
    api.elections.createCandidate.useMutation({
      onSuccess: async () => {
        await utils.elections.candidates.invalidate();
        toast.toast({
          title: "Candidate created",
          description: "The candidate has been created",
        });
        setCandidateInputActive(false); // Hide the input field after a candidate is created
        form.reset();
      },
      onError: (error) => {
        toast.toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
        });
      },
    });

  const { mutateAsync: updateCandidate } =
    api.elections.updateCandidate.useMutation({
      onSuccess: async () => {
        await utils.elections.candidates.invalidate();
        toast.toast({
          title: "Candidate updated",
          description: "The candidate has been updated",
        });
        setCandidateInputActive(false); // Hide the input field after a candidate is created
      },
      onError: (error) => {
        toast.toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
        });
      },
    });

  const onCandidateCreated = async (
    formData: { name: string },
    positionId: string,
  ) => {
    if (formData.name.trim() === "") {
      // Prevent empty submissions
      setCandidateInputActive(false);
      return;
    }

    try {
      await createCandidate({
        name: formData.name,
        electionPositionId: positionId,
      });
    } catch (error) {
      console.log("Unhandled error:", error);
    }
  };

  const onCandidateUpdated = async (
    formData: { name: string },
    candidateId: string,
  ) => {
    try {
      await updateCandidate({
        id: candidateId,
        name: formData.name,
      });
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  return (
    <div className="flex items-start justify-between">
      {!candidateInputActive && (
        <Button variant="outline" onClick={() => setCandidateInputActive(true)}>
          Add candidate
        </Button>
      )}
      {candidateInputActive && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit((formData) =>
              onCandidateCreated(formData, positionId),
            )}
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Candidate name"
                      {...field}
                      onBlur={() =>
                        form.handleSubmit((formData) =>
                          onCandidateCreated(formData, positionId),
                        )()
                      }
                    />
                  </FormControl>
                  <FormDescription>The name of the candidate</FormDescription>
                </FormItem>
              )}
            />
            {/* Removed the submit button */}
          </form>
        </Form>
      )}
      <div className="flex flex-wrap justify-end gap-2">
        {filteredCandidates?.map((candidate) => (
          <CandidateBadge candidate={candidate} key={candidate.id} />
        ))}
      </div>
    </div>
  );
}

export function CandidateBadge({
  candidate,
}: {
  candidate: RouterOutputs["elections"]["candidates"][0];
}) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: candidate.name,
    },
  });
  const utils = api.useUtils();
  const toast = useToast();
  const [isEditing, setIsEditing] = useState(false);

  const { mutateAsync: updateCandidate } =
    api.elections.updateCandidate.useMutation({
      onSuccess: async () => {
        await utils.elections.candidates.invalidate();
        toast.toast({
          title: "Candidate updated",
          description: "The candidate has been updated successfully",
        });
        setIsEditing(false); // Hide the input field after a candidate is updated
      },
      onError: (error) => {
        toast.toast({
          title: "Error updating candidate",
          description: error.message,
          variant: "destructive",
        });
      },
    });

  const { mutateAsync: deleteCandidate } =
    api.elections.deleteCandidate.useMutation({
      onSuccess: async () => {
        await utils.elections.candidates.invalidate();
      },
      onError: (error) => {
        toast.toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
        });
      },
    });

  const onCandidateUpdated = async (
    formData: { name: string },
    candidateId: string,
  ) => {
    if (formData.name !== candidate.name) {
      // Check if the name has been changed
      try {
        await updateCandidate({
          id: candidateId,
          name: formData.name,
        });
      } catch (error) {
        console.log("Error updating candidate: ", error);
      }
    } else {
      setIsEditing(false); // No change in name, just revert back to badge view
    }
  };

  return (
    <div>
      {isEditing ? (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit((formData) =>
              onCandidateUpdated(formData, candidate.id),
            )}
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Candidate name"
                      {...field}
                      onBlur={() => {
                        form.trigger("name").then((isValid) => {
                          if (isValid) {
                            form.handleSubmit((formData) =>
                              onCandidateUpdated(formData, candidate.id),
                            )();
                          }
                        });
                      }}
                    />
                  </FormControl>
                  <FormDescription>The name of the candidate</FormDescription>
                </FormItem>
              )}
            />
          </form>
        </Form>
      ) : (
        <Badge>
          <div className="flex items-center gap-2">
            {candidate.name}{" "}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsEditing(true)}
            >
              <Pen size={16} />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => deleteCandidate(candidate.id)}
            >
              <Trash size={16} />
            </Button>
          </div>
        </Badge>
      )}
    </div>
  );
}
