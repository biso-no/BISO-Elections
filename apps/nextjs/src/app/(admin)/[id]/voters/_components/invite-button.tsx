"use client";

import { useCallback, useState } from "react";
import Link from "next/link";
import * as XLSX from "xlsx";

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
}

interface VoterInvitation {
  name: string;
  email: string;
  electionId: string;
  vote_weight: number;
}

export function InviteUsers({ electionId }: InviteUsersProps) {
  //A button that opens a dialog. In the dialog there are 3 inputs per row. Include a button to add more rows. Each row represent a user to invite.
  //When the user clicks the invite button, the users are invited and the dialog closes.

  const utils = api.useUtils();
  const toast = useToast();

  const [isOpen, setIsOpen] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);
  const [voters, setVoters] = useState<VoterInvitation[]>([
    { name: "", email: "", electionId: "", vote_weight: 1 },
  ]);

  const { mutateAsync: inviteVoters } =
    api.elections.createMultipleVoters.useMutation({
      onSuccess: async () => {
        await utils.elections.voters.invalidate();
        toast.toast({
          title: "Voters invited",
          description: "The voters have been invited.",
        });
      },
      onError: (error) => {
        toast.toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
        });
      },
    });

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };
  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false); // Set drag over state to false
  };
  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(true); // Set drag over state to true
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();

    const files = event.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];
      const reader = new FileReader();

      reader.onload = (e) => {
        const data = new Uint8Array(e.target!.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: "array" });

        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const json = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

        // Process rows, skipping the first (header) and filtering out incomplete entries
        const newVoters = json
          .slice(1)
          .filter((row) => row[0] && row[1] && row[2])
          .map((validRow) => ({
            name: validRow[0],
            email: validRow[1],
            electionId: electionId,
            vote_weight: validRow[2],
          }));

        // Replace existing voters with new voters from Excel file
        setVoters(newVoters);
      };

      reader.readAsArrayBuffer(file);
    }
  };

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

  //A handle download helper. The template is stored in /public/tmpl/voter-import-template.xlsx
  const handleDownloadTemplate = () => {
    const templateFile = "/tmpl/voter-import-template.xlsx";
    const link = document.createElement("a");
    link.href = templateFile;
    link.download = "voter-import-template.xlsx";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleInvite = async () => {
    await inviteVoters({ voters, electionId });
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button>Invite voters</Button>
        </DialogTrigger>
        <DialogContent
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onDragLeave={handleDragLeave}
          onDragEnter={handleDragEnter}
        >
          <DialogHeader>
            <DialogTitle>Invite voters</DialogTitle>
            <DialogDescription>
              Invite voters to the election. You can also drag and drop an Excel
              document containing voter details here.
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
            <Button variant="outline" onClick={handleDownloadTemplate}>
              Download template
            </Button>
            <DialogClose asChild>
              <Button variant="ghost">Cancel</Button>
            </DialogClose>
            <Button
              onClick={() => handleInvite()}
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
