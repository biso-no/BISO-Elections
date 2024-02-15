"use client";

import { useEffect, useState } from "react";

import type { RouterOutputs } from "@acme/api";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { api } from "~/trpc/react";

interface NotYetVotedProps {
  sessionId: string;
}

export function NotYetVoted({ sessionId }: NotYetVotedProps) {
  const utils = api.useUtils();

  const { data: notVoted } = api.elections.votersWhoHaveNotVoted.useQuery({
    sessionId: sessionId,
  });

  const [votersNotVoted, setVotersNotVoted] = useState<
    RouterOutputs["elections"]["votersWhoHaveNotVoted"] | null
  >(null);

  useEffect(() => {
    if (notVoted) {
      setVotersNotVoted(notVoted);
    }
  }, [notVoted]);

  /*
  useEffect(() => {
    const interval = setInterval(() => {
      utils.elections.votersWhoHaveNotVoted
        .invalidate({
          sessionId: sessionId,
          electionId: electionId,
        })
        .catch(console.error);
    }, 3000);
    return () => clearInterval(interval);
  }, [electionId, sessionId, utils.elections.votersWhoHaveNotVoted]);
  */

  return (
    <Table>
      <TableCaption>Not Yet Voted</TableCaption>
      <TableHead>
        <TableRow>
          <TableHeader>Voter Name</TableHeader>
        </TableRow>
      </TableHead>
      <TableBody>
        {votersNotVoted?.map((voter) => (
          <TableRow key={voter.id}>
            <TableCell>{voter.profile.name}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
