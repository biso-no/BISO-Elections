"use client";

import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { PDFResults } from "~/app/_components/pdf-results";
import { VotesDialog } from "~/app/_components/votes-dialog";
import { VotingBallot } from "~/app/_components/voting-ballot";
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
import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group";
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

const formSchema = z.object({
  name: z.string().min(1),
  type: z.enum(["position", "statute_change"], {
    required_error: "Invalid type",
  }),
  description: z.string().min(1),
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
      type: "position",
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

  const { mutateAsync: createSession, error } =
    api.elections.createSession.useMutation({
      async onSuccess() {
        form.reset();
        toast.toast({
          title: "Session created",
          description: "The session has been created",
        });
        await utils.elections.sessions.invalidate();
      },

      async onError() {
        toast.toast({
          title: "Error",
          description: "Something went wrong",
          variant: "destructive",
        });
      },
    });

  const { mutateAsync: createPosition, error: positionError } =
    api.elections.createPosition.useMutation({
      async onSuccess() {
        form.reset();
        await utils.elections.sessions.invalidate();
      },

      async onError() {
        console.log("Error: ", error);
      },
    });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      await createSession({ ...data, electionId });
    } catch {
      console.log("Error: ", error);
      toast.toast({
        title: "Error",
        description: error?.message,
        variant: "destructive",
      });
    }
  };

  const { mutateAsync: deleteSession, error: deleteError } =
    api.elections.deleteSession.useMutation({
      async onSuccess() {
        toast.toast({
          title: "Session deleted",
          description: "The session has been deleted",
        });
        await utils.elections.sessions.invalidate();
      },

      async onError() {
        toast.toast({
          title: "Error",
          description: deleteError?.message,
          variant: "destructive",
        });
      },
    });

  const onPositionCreated = async (
    formData: { name: string; type: string; description: string },
    sessionId: string,
  ) => {
    try {
      await createPosition({
        name: formData.name,
        sessionId: sessionId,
        description: formData.description,
      });
      toast.toast({
        title: "Position created",
        description: "The position has been created",
      });
    } catch {
      console.log("Error: ", error);
      toast.toast({
        title: "Error",
        description: positionError?.message,
        variant: "destructive",
      });
    }
  };

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
      toast.toast({
        title: "Candidate created",
        description: "The candidate has been created",
      });
    } catch {
      console.log("Error: ", error);
      toast.toast({
        title: "Error",
        description: candidateError?.message,
        variant: "destructive",
      });
    }
  };

  const onDelete = async (sessionId: string) => {
    try {
      await deleteSession(sessionId);
    } catch {
      console.log("Error: ", error);
      toast.toast({
        title: "Error",
        description: error?.message,
        variant: "destructive",
      });
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
    } catch {
      console.log("Error: ", error);
      toast.toast({
        title: "Error",
        description: deleteCandidateError?.message,
        variant: "destructive",
      });
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

  const onSessionToggle = async (
    sessionId: string,
    currentStatusIndex: number,
  ) => {
    console.log("Current status: ", statuses[currentStatusIndex]);
    if (sessions) {
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
          <Dialog>
            <DialogTrigger asChild>
              <Button size="sm">Add Session</Button>
            </DialogTrigger>
            <DialogContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Session name</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Session name" />
                        </FormControl>
                        <FormDescription>
                          This is the name of the session
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="type"
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormLabel>Session type</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex flex-col space-y-1"
                          >
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="position" />
                              </FormControl>
                              <FormLabel className="font-normal">
                                Position
                              </FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="statute_change" />
                              </FormControl>
                              <FormLabel className="font-normal">
                                Statute change
                              </FormLabel>
                            </FormItem>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Description" />
                        </FormControl>
                        <FormDescription>
                          This is the description of the session
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <DialogFooter>
                    <Button type="submit">Add session</Button>
                  </DialogFooter>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <div className="rounded-lg border shadow-sm">
        {sessions?.map((session) => (
          <Accordion type="single" key={session.id} collapsible>
            <AccordionItem value={session.id}>
              <AccordionTrigger>
                <div className="flex items-center justify-between px-4 py-2">
                  <div className="flex items-center space-x-2">
                    <div className="mr-1 text-sm font-medium text-gray-900">
                      {session.name}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="ml-1 mr-1 text-sm text-gray-500">-</div>
                    <div className="text-sm text-gray-500">{session.type}</div>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="px-4 py-2">
                  <div className="flex items-center space-x-2">
                    <Button
                      onClick={() => onDelete(session.id)}
                      variant="destructive"
                    >
                      Delete
                    </Button>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button className="ml-auto" variant="outline">
                          Preview
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <h2 className="text-lg font-semibold md:text-2xl">
                          {session.name}
                        </h2>
                        <VotingBallot
                          initialSessionId={session.id}
                          preview
                          electionId={electionId}
                          userId="1"
                        />
                      </DialogContent>
                    </Dialog>
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
                          : "default"
                      }
                    >
                      {session.status === statuses[1] // "in_progress"
                        ? "Deactivate"
                        : "Activate"}
                    </Button>
                    <VotesDialog
                      sessionId={session.id}
                      electionId={electionId}
                    />
                  </div>
                  {/*Preview button that opens a dialog with the voting ballot*/}
                  {session.type === "position" && (
                    <>
                      <div className="mt-4 flex items-center justify-between">
                        <h2 className="text-lg font-semibold md:text-2xl">
                          Positions
                        </h2>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button className="ml-auto" size="sm">
                              Add Position
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <Form {...form}>
                              <form
                                onSubmit={form.handleSubmit((data) =>
                                  onPositionCreated(data, session.id),
                                )}
                              >
                                <FormField
                                  control={form.control}
                                  name="name"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel>Position name</FormLabel>
                                      <FormControl>
                                        <Input
                                          {...field}
                                          placeholder="Position name"
                                        />
                                      </FormControl>
                                      <FormDescription>
                                        This is the name of the position
                                      </FormDescription>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                                <FormField
                                  control={form.control}
                                  name="description"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel>Description</FormLabel>
                                      <FormControl>
                                        <Input
                                          {...field}
                                          placeholder="Description"
                                        />
                                      </FormControl>
                                      <FormDescription>
                                        This is the description of the position
                                      </FormDescription>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                                <DialogFooter>
                                  <Button type="submit">Add position</Button>
                                </DialogFooter>
                              </form>
                            </Form>
                          </DialogContent>
                        </Dialog>
                      </div>
                      <div className="mt-4">
                        {session.positions.map((position) => (
                          <Accordion
                            type="single"
                            key={position.id}
                            collapsible
                          >
                            <AccordionItem value={position.id}>
                              <AccordionTrigger>
                                <div className="flex items-center justify-between px-4 py-2">
                                  <div className="flex items-center space-x-2">
                                    <div className="text-sm font-medium text-gray-900">
                                      {position.name}
                                    </div>
                                  </div>
                                </div>
                              </AccordionTrigger>
                              <AccordionContent>
                                <div className="px-4 py-2">
                                  <p className="text-sm text-gray-500">
                                    {position.description}
                                  </p>
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
                    </>
                  )}
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
