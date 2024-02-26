"use client";

import React from "react";

import type { RouterOutputs } from "@acme/api";

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
import { PreviewSession } from "./preview-session";
import { SessionToggle } from "./session-toggle";

export function PositionTable({
  positions,
}: {
  positions: RouterOutputs["elections"]["sessions"][0]["positions"];
}) {
  return (
    <div className="rounded-lg border shadow-sm">
      <Table>
        <TableHeader>
          <TableRow className="flex w-full items-center space-y-2">
            <TableHead className="flex-1">Position</TableHead>
            <TableHead className="hidden flex-1 md:flex">Candidates</TableHead>
            <TableHead className="flex-1">Includes Abstain</TableHead>
            <TableHead className="w-auto flex-none">
              Maximum selections
            </TableHead>
            <TableHead className="w-auto flex-none">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {positions.map((position) => (
            <TableRow key={position.id} className="flex w-full items-center">
              <TableCell className="flex-1">{position.name}</TableCell>
              <TableCell className="flex-1">
                <Candidates positionId={position.id} />
              </TableCell>
              <TableCell className="flex-1">
                {position.withAbstain ? "Yes" : "No"}
              </TableCell>
              <TableCell className="flex-1">
                {position.maxSelections ?? "Unlimited"}
              </TableCell>
              <TableCell className="flex-none">
                <div className="flex justify-end space-x-2">
                  <EditPosition position={position} />
                  <DeletePosition position={position} />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export function StatuteChangeTable({
  changes,
}: {
  changes: RouterOutputs["elections"]["sessions"][0]["statuteChanges"];
}) {
  return (
    <div className="rounded-lg border shadow-sm">
      <Table>
        <TableHeader>
          <TableRow className="flex w-full">
            <TableHead className="flex-1">Change</TableHead>
            <TableHead className="w-auto flex-none">Includes Abstain</TableHead>
            {/* Ensure this cell becomes optional on smaller screens if needed */}
            <TableHead className="hidden w-auto flex-none md:table-cell">
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {changes.map((change) => (
            <TableRow key={change.id} className="flex w-full items-center">
              {/* Allow this cell to grow and fill the space */}
              <TableCell className="flex-1">{change.name}</TableCell>
              <TableCell className="flex-1">
                {change.withAbstain ? "Yes" : "No"}
              </TableCell>
              <TableCell className="flex-none">
                <Button size="sm" variant="outline">
                  Edit
                </Button>
                <Button size="sm" variant="outline">
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

//TODO: Add the CreateSession component that is a button to this component
export function Session({ id }: { id: string }) {
  const { data } = api.elections.sessions.useQuery(id);

  // Utility function to format session status
  const formatSessionStatus = (status: string) => {
    return status
      .split("_") // Split the string by underscore
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) // Capitalize the first letter of each word
      .join(" "); // Join the words back with a space
  };

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
      {/* Container for the CreateSession button aligned to the right */}
      <div className="flex justify-end">
        <CreateSession electionId={id} />
      </div>
      {/* Mapping over session data */}
      {data?.map((session) => (
        <React.Fragment key={session.id}>
          <div className="flex items-center justify-between">
            <h1 className="flex-grow text-lg font-semibold md:text-2xl">
              {session.name} -{" "}
              <Badge>{formatSessionStatus(session.status)}</Badge>
            </h1>
            {/* Container for CreatePosition and CreateStatuteChange components */}
            <div className="flex items-center gap-2">
              <SessionToggle sessionId={session.id} />
              <PreviewSession session={session} />
              <CreatePosition sessionId={session.id} />
              <CreateStatuteChange sessionId={session.id} />
            </div>
          </div>
          <div className="rounded-lg border shadow-sm">
            <PositionTable positions={session.positions} />
          </div>
          <div className="rounded-lg border shadow-sm">
            <StatuteChangeTable changes={session.statuteChanges} />
          </div>
        </React.Fragment>
      ))}
    </main>
  );
}
