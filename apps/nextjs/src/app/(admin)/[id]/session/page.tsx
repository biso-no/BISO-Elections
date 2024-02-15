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

  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold md:text-2xl">Sessions</h1>
        <div className="flex space-x-4">
          <PDFResults electionId={electionId} />
          <CreateSession electionId={electionId} />
        </div>
      </div>
      <div className="rounded-lg border shadow-sm">
        {sessions?.map((session) => (
          <Accordion type="single" key={session.id} collapsible>
            <AccordionItem value={session.id}>
              <AccordionTrigger>
                <div className="flex items-center justify-between px-4 py-2">
                  <div className="flex items-center space-x-2">
                    <div className="mr-1 text-sm font-medium">
                      {session.name}
                    </div>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="px-4 py-2">
                  <div className="flex items-center space-x-2">
                    <DeleteSession sessionId={session.id} />
                    <PreviewSession session={session} />
                    <Button
                      onClick={() =>
                        onSessionToggle(
                          session.id,
                          statuses.indexOf(session.status),
                        )
                      }
                      disabled={session.status === statuses[2]} // "completed"
                      variant={
                        session.status === statuses[1] // "in_progress"
                          ? "destructive"
                          : session.status === statuses[2] // "completed"
                            ? "ghost"
                            : "default"
                      }
                    >
                      {session.status === statuses[1] // "in_progress"
                        ? "Complete"
                        : session.status === statuses[2] // "completed"
                          ? "Completed"
                          : "Start"}
                    </Button>
                    <VotesDialog sessionId={session.id} />
                  </div>
                  {/*Preview button that opens a dialog with the voting ballot*/}
                  <>
                    <div className="mt-4 flex items-center justify-between">
                      <div className="flex space-x-4">
                        <CreatePosition sessionId={session.id} />
                        <CreateStatuteChange sessionId={session.id} />
                      </div>
                    </div>
                    <div className="mt-4 flex flex-row">
                      <div className="flex w-1/2 flex-col">
                        <div className="mt-4 flex items-center justify-between">
                          <h2 className="text-lg font-semibold md:text-2xl">
                            Running Positions
                          </h2>
                        </div>
                        {session.positions.map((position) => (
                          <Accordion
                            type="single"
                            key={position.id}
                            collapsible
                            className="mb-4 mr-4"
                          >
                            <AccordionItem value={position.id}>
                              <AccordionTrigger>
                                <div className="flex items-center justify-between px-4 py-2">
                                  <div className="flex items-center space-x-2">
                                    <div className="text-sm font-medium">
                                      {position.name}
                                    </div>
                                  </div>
                                </div>
                              </AccordionTrigger>
                              <AccordionContent>
                                <div className="px-4 py-2">
                                  <div className="mt-4 flex items-center justify-between">
                                    <h2 className="text-lg font-semibold md:text-2xl">
                                      Candidates
                                    </h2>
                                    <Dialog>
                                      <DialogTrigger asChild>
                                        <Button className="ml-auto" size="sm">
                                          Add Candidate
                                        </Button>
                                      </DialogTrigger>
                                      <DialogContent>
                                        <Form {...candidateForm}>
                                          <form
                                            onSubmit={candidateForm.handleSubmit(
                                              (data) =>
                                                onCandidateCreated(
                                                  data,
                                                  position.id,
                                                ),
                                            )}
                                          >
                                            <FormField
                                              control={candidateForm.control}
                                              name="name"
                                              render={({ field }) => (
                                                <FormItem>
                                                  <FormLabel>
                                                    Candidate name
                                                  </FormLabel>
                                                  <FormControl>
                                                    <Input
                                                      {...field}
                                                      placeholder="Candidate name"
                                                    />
                                                  </FormControl>
                                                  <FormDescription>
                                                    This is the name of the
                                                    candidate
                                                  </FormDescription>
                                                  <FormMessage />
                                                </FormItem>
                                              )}
                                            />
                                            <DialogFooter>
                                              <Button type="submit">
                                                Add candidate
                                              </Button>
                                            </DialogFooter>
                                          </form>
                                        </Form>
                                      </DialogContent>
                                    </Dialog>
                                  </div>
                                  <div className="mt-4">
                                    <Table>
                                      <TableHeader>
                                        <TableRow>
                                          <TableHead>Name</TableHead>
                                          <TableHead>Actions</TableHead>
                                        </TableRow>
                                      </TableHeader>
                                      <TableBody>
                                        {position.candidates.map(
                                          (candidate) => (
                                            <TableRow key={candidate.id}>
                                              <TableCell>
                                                {candidate.name}
                                              </TableCell>
                                              <TableCell>
                                                <PopoverActions
                                                  key={candidate.id}
                                                  items={[
                                                    {
                                                      id: "delete",
                                                      icon: (
                                                        <DeleteIcon className="h-4 w-4" />
                                                      ),
                                                      label: "Delete",
                                                      onClick: () => {
                                                        void onCandidateDelete(
                                                          candidate.id,
                                                        );
                                                      },
                                                    },
                                                  ]}
                                                />
                                              </TableCell>
                                            </TableRow>
                                          ),
                                        )}
                                      </TableBody>
                                    </Table>
                                  </div>
                                </div>
                              </AccordionContent>
                            </AccordionItem>
                          </Accordion>
                        ))}
                      </div>
                      <div className="flex w-1/2 flex-col">
                        {session.statuteChanges.length > 0 && (
                          <>
                            <div className="mt-4 flex items-center justify-between">
                              <h2 className="text-lg font-semibold md:text-2xl">
                                Statute Changes
                              </h2>
                            </div>
                            <div className="mt-4">
                              <Table className="mt-4">
                                <TableHeader>
                                  <TableRow>
                                    <TableHead>Name</TableHead>
                                    <TableHead>With abstain</TableHead>
                                    <TableHead>Actions</TableHead>
                                  </TableRow>
                                </TableHeader>
                                <TableBody>
                                  {session.statuteChanges.map(
                                    (statuteChange) => (
                                      <TableRow key={statuteChange.id}>
                                        <TableCell>
                                          {statuteChange.name}
                                        </TableCell>
                                        <TableCell>
                                          {statuteChange.withAbstain
                                            ? "Yes"
                                            : "No"}
                                        </TableCell>
                                        <TableCell>
                                          <PopoverActions
                                            key={statuteChange.id}
                                            items={[
                                              {
                                                id: "delete",
                                                icon: (
                                                  <DeleteIcon className="h-4 w-4" />
                                                ),
                                                label: "Delete",
                                                onClick: () => {
                                                  void onStatuteChangeDelete(
                                                    statuteChange.id,
                                                  );
                                                },
                                              },
                                            ]}
                                          />
                                        </TableCell>
                                      </TableRow>
                                    ),
                                  )}
                                </TableBody>
                              </Table>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        ))}
      </div>
    </>
  );
}

function DeleteIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 5H9l-7 7 7 7h11a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2Z" />
      <line x1="18" x2="12" y1="9" y2="15" />
      <line x1="12" x2="18" y1="9" y2="15" />
    </svg>
  );
}
