"use client";

import { useState } from "react";

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
import { api } from "~/trpc/react";

interface InviteUsersProps {
  electionId: string;
  onInvite: (voters: VoterInvitation[], electionId: string) => void;
}

interface VoterInvitation {
  name: string;
  email: string;
  electionId: string;
  vote_weight: number;
}

export function InviteUsers({ electionId, onInvite }: InviteUsersProps) {
  //A button that opens a dialog. In the dialog there are 3 inputs per row. Include a button to add more rows. Each row represent a user to invite.
  //When the user clicks the invite button, the users are invited and the dialog closes.

  const utils = api.useUtils();
  const toast = useToast();

  const [isOpen, setIsOpen] = useState(false);
  const [voters, setVoters] = useState<VoterInvitation[]>([
    { name: "", email: "", electionId: "", vote_weight: 1 },
  ]);

  const addRow = () => {
    setVoters((prevVoters) => [
      ...prevVoters,
      { name: "", email: "", electionId: "", vote_weight: 1 },
    ]);
  };

  const removeRow = (rowIndex: number) => {
    setVoters((prevVoters) =>
      prevVoters.filter((_, index) => index !== rowIndex),
    );
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
          {voters.map((voter, index) => (
            <div key={index} className="flex space-x-4">
              <Input
                placeholder="Name"
                value={voter.name}
                onChange={(e) =>
                  setVoters((prevVoters) =>
                    prevVoters.map((v, i) =>
                      i === index ? { ...v, name: e.target.value } : v,
                    ),
                  )
                }
              />
              <Input
                placeholder="Email"
                value={voter.email}
                onChange={(e) =>
                  setVoters((prevVoters) =>
                    prevVoters.map((v, i) =>
                      i === index ? { ...v, email: e.target.value } : v,
                    ),
                  )
                }
              />
              <Input
                type="number"
                placeholder="Vote weight"
                value={voter.vote_weight}
                onChange={(e) =>
                  setVoters((prevVoters) =>
                    prevVoters.map((v, i) =>
                      i === index
                        ? { ...v, vote_weight: parseInt(e.target.value) } // Update property name to vote_weight
                        : v,
                    ),
                  )
                }
              />
              <Button onClick={() => removeRow(index)}>Remove</Button>
            </div>
          ))}
          <Button onClick={addRow}>Add row</Button>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="ghost">Cancel</Button>
            </DialogClose>
            <Button
              onClick={() => onInvite(voters, electionId)}
              disabled={voters.length === 0}
            >
              Invite
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
