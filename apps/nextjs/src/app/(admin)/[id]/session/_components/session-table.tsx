"use client";

import type { RouterOutputs } from "@acme/api";

import { Button } from "~/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { useToast } from "~/components/ui/use-toast";
import { api } from "~/trpc/react";
import { DeletePosition, EditPosition } from "../_components/create-position";

export function PositionTable({
  positions,
}: {
  positions: RouterOutputs["elections"]["sessions"][0]["positions"];
}) {
  const utils = api.useUtils();
  const toast = useToast();
  const { mutateAsync: deletePosition, error: deleteError } =
    api.elections.deletePosition.useMutation({
      onSuccess: () => {
        toast.toast({
          title: "Position deleted",
          description: "The position has been deleted",
        });
      },
      onError: (err) => {
        toast.toast({
          title: "Error",
          description: err.message,
          variant: "destructive",
        });
      },
    });
  const { mutateAsync: createPosition, error: createError } =
    api.elections.createPosition.useMutation({
      onSuccess: () => {
        toast.toast({
          title: "Position created",
          description: "The position has been created",
        });
      },
      onError: (err) => {
        toast.toast({
          title: "Error",
          description: err.message,
          variant: "destructive",
        });
      },
    });
  const { mutateAsync: updatePosition, error: updateError } =
    api.elections.updatePosition.useMutation({
      onSuccess: () => {
        toast.toast({
          title: "Position updated",
          description: "The position has been updated",
        });
      },
      onError: (err) => {
        toast.toast({
          title: "Error",
          description: err.message,
          variant: "destructive",
        });
      },
    });
  const { mutateAsync: createCandidate, error: candidateError } =
    api.elections.createCandidate.useMutation({
      async onSuccess() {
        toast.toast({
          title: "Candidate created",
          description: "The candidate has been created",
        });
        await utils.elections.sessions.invalidate();
      },
      onError(err) {
        toast.toast({
          title: "Error",
          description: err.message,
          variant: "destructive",
        });
      },
    });
  const { mutateAsync: deleteCandidate, error: deleteCandidateError } =
    api.elections.deleteCandidate.useMutation({
      async onSuccess() {
        toast.toast({
          title: "Candidate deleted",
          description: "The candidate has been deleted",
        });
        await utils.elections.sessions.invalidate();
      },
      onError(err) {
        toast.toast({
          title: "Error",
          description: err.message,
          variant: "destructive",
        });
      },
    });

  const onPositionDelete = async (positionId: string) => {
    try {
      await deletePosition(positionId);
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  return (
    <div className="rounded-lg border shadow-sm">
      <Table>
        <TableHeader>
          <TableRow className="flex w-full items-center space-y-2">
            <TableHead className="flex-1">Position</TableHead>
            <TableHead className="hidden flex-1 md:flex">Candidates</TableHead>
            <TableHead className="w-auto flex-none">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {positions.map((position) => (
            <TableRow key={position.id} className="flex w-full items-center">
              <TableCell className="flex-1">{position.name}</TableCell>
              <TableCell className="flex-1">
                <Button variant="ghost" size="sm">
                  Add Candidates
                </Button>
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
              {/* This ensures the buttons are to the right and do not grow */}
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

export function Session({ id }: { id: string }) {
  const { data } = api.elections.sessions.useQuery(id);

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
      {data?.map((session) => (
        <>
          <div className="flex items-center">
            <h1 className="text-lg font-semibold md:text-2xl">
              {session.name}
            </h1>
            <Button className="ml-auto" size="sm">
              Edit Session
            </Button>
          </div>
          <div className="rounded-lg border shadow-sm">
            <PositionTable positions={session.positions} />
          </div>
          <div className="rounded-lg border shadow-sm">
            <StatuteChangeTable changes={session.statuteChanges} />
          </div>
        </>
      ))}
    </main>
  );
}
