"use client";

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
}

export function VotesDialog({ sessionId }: VotesDialog) {
  const { data: results } = api.elections.sessionResults.useQuery({
    sessionId,
  });

  return (
    <Dialog>
      <DialogTrigger>
        <Button>View Votes</Button>
      </DialogTrigger>
      <DialogContent className="h-2/3 w-1/2  overflow-y-auto p-4">
        <DialogTitle>Results</DialogTitle>
        <DialogClose />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {" "}
          {/* Use CSS grid for better responsiveness */}
          <div>
            <div className="mb-4">Positions</div>
            {results?.positions.map((position) => (
              <div key={position.id} className="mb-4">
                <Table>
                  <TableCaption>{position.name}</TableCaption>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Option</TableHead>
                      <TableHead>Count</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {position.candidates.map((option) => (
                      <TableRow key={option.id}>
                        <TableCell>{option.name}</TableCell>
                        <TableCell>{option.votes.length}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                  <TableFooter>
                    <TableRow>
                      <TableCell>Total Votes</TableCell>
                      <TableCell>
                        {position.candidates.reduce(
                          (total, option) => total + option.votes.length,
                          0,
                        )}
                      </TableCell>
                    </TableRow>
                  </TableFooter>
                </Table>
              </div>
            ))}
          </div>
          <div>
            <div className="mb-4">Statute Changes</div>
            {results?.statuteChanges.map((statute) => (
              <div key={statute.id} className="mb-4">
                <Table>
                  <TableCaption>{statute.name}</TableCaption>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Option</TableHead>
                      <TableHead>Count</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {statute.options.map((option) => (
                      <TableRow key={option.id}>
                        <TableCell>{option.name}</TableCell>
                        <TableCell>{option.votes.length}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                  <TableFooter>
                    <TableRow>
                      <TableCell>Total Votes</TableCell>
                      <TableCell>
                        {statute.options.reduce(
                          (total, option) => total + option.votes.length,
                          0,
                        )}
                      </TableCell>
                    </TableRow>
                  </TableFooter>
                </Table>
              </div>
            ))}
          </div>
        </div>
        <NotYetVoted sessionId={sessionId} />
      </DialogContent>
    </Dialog>
  );
}
