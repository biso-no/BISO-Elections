"use client";

import { useEffect, useState } from "react";

import type { RouterOutputs } from "@acme/api";

import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { api } from "~/trpc/react";
import { NotYetVoted } from "./not-yet-voted";

interface VotesDialog {
  sessionId: string;
  electionId: string;
}

export function VotesDialog({ sessionId, electionId }: VotesDialog) {
  const utils = api.useUtils();

  const { data: session } = api.elections.session.useQuery(sessionId);
  const [positions, setPositions] = useState<
    RouterOutputs["elections"]["positions"] | null
  >(null);

  //This query returns all votes for each candidate in the session.
  const { data: fetchedPositions } =
    api.elections.positions.useQuery(sessionId);

  useEffect(() => {
    if (fetchedPositions) {
      setPositions(fetchedPositions);
    }
  }, [fetchedPositions]);

  useEffect(() => {
    //Every 5 seconds, the positions query is invalidated and refetched.
    const interval = setInterval(() => {
      utils.elections.positions.invalidate(sessionId).catch(console.error);
    }, 3000);
    return () => clearInterval(interval);
  }, [sessionId, utils.elections.positions]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>View Votes</Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>{session?.name}</DialogTitle>
          <DialogClose />
        </DialogHeader>
        <div className="flex space-x-4">
          <div>
            {positions?.map((position) => (
              <Table key={position.id}>
                <TableCaption>{position.name}</TableCaption>
                <TableHeader>
                  <TableRow key={position.id} className="flex-row">
                    <TableHead>Candidate</TableHead>
                    <TableHead>Votes</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {position.candidates.map((candidate) => (
                    <TableRow key={candidate.id}>
                      <TableCell>{candidate.name}</TableCell>
                      <TableCell>{candidate.votes.length}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
                <TableFooter>
                  <TableRow>
                    <TableCell>Total</TableCell>
                    <TableCell>
                      {position.candidates.reduce(
                        (acc, candidate) => acc + candidate.votes.length,
                        0,
                      )}
                    </TableCell>
                  </TableRow>
                </TableFooter>
              </Table>
            ))}
          </div>
          <div>
            <NotYetVoted sessionId={sessionId} electionId={electionId} />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
