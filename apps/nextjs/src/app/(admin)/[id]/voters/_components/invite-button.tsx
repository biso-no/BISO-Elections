"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { Input } from "~/components/ui/input";
import { useToast } from "~/components/ui/use-toast";

interface InviteUsersProps {
  electionId: string;
}

interface VoterInvitation {
  email: string;
  electionId: string;
  voteWeight: number;
}

export function InviteUsers({ electionId }: InviteUsersProps) {
  //A button that opens a dialog. In the dialog there are 3 inputs per row. Include a button to add more rows. Each row represent a user to invite.
  //When the user clicks the invite button, the users are invited and the dialog closes.

  const toast = useToast();

  const [isOpen, setIsOpen] = useState(false);
  const [rows, setRows] = useState(1);
  const [voters, setVoters] = useState<VoterInvitation[]>([]);

  const invite = async () => {
    try {
      const response = await fetch(
        "http://invite-jk8kgck.biso.no/api/voters/invite",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(voters),
        },
      ).then((res) => res.json());

      toast.toast({
        title: response.error ? "Error" : "Success",
        description: response.error
          ? response.error.message + " If the error persists, contact support."
          : "Voters invited.",
        variant: response.error ? "destructive" : "default",
      });
      setIsOpen(false);
    } catch (error) {
      toast.toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const addRow = () => {
    setRows(rows + 1);
  };

  const removeRow = () => {
    setRows(rows - 1);
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button>Invite voters</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Invite voters</DialogTitle>
            <DialogDescription>
              Invite voters to the election.
            </DialogDescription>
          </DialogHeader>
          {Array.from(Array(rows).keys()).map((row) => (
            <div className="flex flex-row space-x-4" key={row}>
              <Input
                placeholder="Email"
                type="email"
                onChange={(e) => {
                  const email = e.target.value;
                  setVoters((voters) => {
                    const voterIndex = voters.findIndex(
                      (voter, index) => index === row,
                    );
                    if (voterIndex !== -1) {
                      voters[voterIndex].email = email;
                      return [...voters];
                    } else {
                      return [...voters, { email, electionId, voteWeight: 1 }];
                    }
                  });
                }}
              />
              <Input
                placeholder="Name"
                type="text"
                onChange={(e) => {
                  const name = e.target.value;
                  setVoters((voters) => {
                    const voterIndex = voters.findIndex(
                      (voter, index) => index === row,
                    );
                    if (voterIndex !== -1) {
                      voters[voterIndex].name = name;
                      return [...voters];
                    } else {
                      return [...voters, { name, electionId, voteWeight: 1 }];
                    }
                  });
                }}
              />
              <Input
                placeholder="Vote weight"
                type="number"
                onChange={(e) => {
                  const voteWeight = Number(e.target.value);
                  setVoters((voters) => {
                    const voterIndex = voters.findIndex(
                      (voter, index) => index === row,
                    );
                    if (voterIndex !== -1) {
                      voters[voterIndex].voteWeight = voteWeight;
                      return [...voters];
                    } else {
                      return [...voters, { email: "", electionId, voteWeight }];
                    }
                  });
                }}
              />
            </div>
          ))}

          <div className="flex flex-row space-x-4">
            <Button onClick={addRow}>Add row</Button>
            <Button onClick={removeRow}>Remove row</Button>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button>Cancel</Button>
            </DialogClose>
            <Button onClick={() => invite(voters)}>Invite</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
