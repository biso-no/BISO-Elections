"use client";

import React from "react";

import { NotYetVoted } from "~/app/_components/not-yet-voted";
import { PDFResults } from "~/app/_components/pdf-results";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { api } from "~/trpc/react";
import {
  CreatePosition,
  DeletePosition,
  EditPosition,
} from "../_components/create-position";
import { Candidates } from "./candidates";
import { CreateSession } from "./create-session";
import { CreateStatuteChange } from "./create-statute-change";
import { DeleteSession } from "./delete-session";
import { PreviewSession } from "./preview-session";
import { SessionToggle } from "./session-toggle";

export function PositionTable({ sessionId }: { sessionId: string }) {
  const { data: positions } = api.elections.positions.useQuery(sessionId);

  if (!positions) return null;

  return (
    <div className="overflow-x-auto">
      <div className="w-full min-w-full rounded-lg border shadow-lg">
        <Table className="w-full min-w-full leading-normal">
          <TableHeader>
            <TableRow className="text-left text-sm font-semibold">
              <TableHead>Position</TableHead>
              <TableHead>Candidates</TableHead>
              <TableHead>Includes Abstain</TableHead>
              <TableHead>Maximum selections</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {positions.map((position) => (
              <TableRow key={position.id} className="border-t">
                <TableCell className="text-sm">{position.name}</TableCell>
                <TableCell className="text-sm">
                  <Candidates positionId={position.id} />
                </TableCell>
                <TableCell className="text-sm">
                  {position.withAbstain ? "Yes" : "No"}
                </TableCell>
                <TableCell className="text-sm">
                  {position.maxSelections ?? "Unlimited"}
                </TableCell>
                <TableCell>
                  <div className="flex flex-wrap justify-end gap-2">
                    <EditPosition position={position} />
                    <DeletePosition position={position} />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export function StatuteChangeTable({ sessionId }: { sessionId: string }) {
  const { data: changes } = api.elections.statuteChanges.useQuery(sessionId);
  const utils = api.useUtils();

  const { mutateAsync: deleteStatuteChange } =
    api.elections.deletePosition.useMutation({
      async onSuccess() {
        await utils.elections.statuteChanges.invalidate();
      },
      async onError(error) {
        console.error(error);
      },
    });

  if (!changes) return null;

  return (
    <div className="overflow-x-auto">
      <div className="w-full min-w-full rounded-lg border shadow-lg">
        <Table className="w-full min-w-full leading-normal">
          <TableHeader>
            <TableRow className="text-left text-sm font-semibold">
              <TableHead>Change</TableHead>
              <TableHead>Includes Abstain</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {changes.map((change) => (
              <TableRow key={change.id} className="border-t">
                <TableCell className="text-sm">{change.name}</TableCell>
                <TableCell className="text-sm">
                  {change.withAbstain ? "Yes" : "No"}
                </TableCell>
                <TableCell>
                  <div className="flex flex-wrap justify-end gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-blue-500 text-blue-500 hover:bg-blue-100"
                    >
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => deleteStatuteChange(change.id)}
                      className="border-destructive text-destructive hover:bg-destructive/10 dark:border-destructive dark:text-destructive dark:hover:bg-destructive/10"
                    >
                      Delete
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export function Session({ id }: { id: string }) {
  const { data } = api.elections.sessions.useQuery(id);

  const formatSessionStatus = (status: string) => {
    return status
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  };

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
      <div className="flex flex-wrap justify-end">
        <CreateSession electionId={id} />
        <PDFResults electionId={id} disabled={data?.length === 0} />
      </div>
      {data?.map((session) => (
        <React.Fragment key={session.id}>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <h1 className="flex-grow text-lg font-semibold md:text-2xl">
              {session.name}
              <DeleteSession sessionId={session.id} />
              <Badge>{formatSessionStatus(session.status)}</Badge>
            </h1>
            <div className="flex flex-wrap items-center gap-2">
              <NotYetVoted sessionId={session.id} />
              <SessionToggle sessionId={session.id} />
              <PreviewSession session={session} />
              <CreatePosition sessionId={session.id} />
              <CreateStatuteChange sessionId={session.id} />
            </div>
          </div>
          <div className="rounded-lg border shadow-sm">
            <PositionTable sessionId={session.id} />
          </div>
          <div className="rounded-lg border shadow-sm">
            <StatuteChangeTable sessionId={session.id} />
          </div>
        </React.Fragment>
      ))}
    </main>
  );
}
