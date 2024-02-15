"use client";

import React from "react";

import type { RouterOutputs } from "@acme/api";

import { VotingBallot } from "~/app/_components/voting-ballot";
import { Button } from "~/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "~/components/ui/dialog";

interface SessionFormProps {
  session?: RouterOutputs["voter"]["activeSession"];
}

export function PreviewSession({ session }: SessionFormProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="ml-auto" variant="outline">
          Preview
        </Button>
      </DialogTrigger>
      <DialogContent className="flex flex-col space-y-4 p-4 md:p-8">
        <h2 className="text-lg font-semibold md:text-2xl">{session?.name}</h2>
        <VotingBallot session={session} preview />
      </DialogContent>
    </Dialog>
  );
}
