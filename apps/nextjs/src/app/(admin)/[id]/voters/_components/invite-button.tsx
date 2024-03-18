"use client";

import { useState } from "react";
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

interface VoterRow {
  0: string; // name
  1: string; // email
  2: number; // vote_weight
}

export function InviteUsers({ electionId }: InviteUsersProps) {
  //A button that opens a dialog. In the dialog there are 3 inputs per row. Include a button to add more rows. Each row represent a user to invite.
  //When the user clicks the invite button, the users are invited and the dialog closes.

  const utils = api.useUtils();
  const toast = useToast();

  const [isOpen, setIsOpen] = useState(false);
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
  };
  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
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
        if (sheetName) {
          const worksheet = workbook.Sheets[sheetName];
          if (worksheet) {
            // Ensure worksheet is defined before using it
            // Now TypeScript knows worksheet is not undefined
            const json = XLSX.utils.sheet_to_json(worksheet, {
              header: 1,
            }) as unknown as VoterRow[];

            const newVoters = json
              .slice(1) // Assuming the first row is headers
              .filter((row: VoterRow) => row[0] && row[1] && row[2]) // Ensure all required fields are present
              .map((validRow: VoterRow) => ({
                name: validRow[0],
                email: validRow[1],
                electionId: electionId, // Ensure electionId is defined somewhere in your component
                vote_weight: validRow[2],
              }));

            setVoters(newVoters); // Ensure setVoters is defined and can accept the array of newVoters
          }
        }
      };

      reader.readAsArrayBuffer(file as Blob); // Safe to assert 'file' as 'Blob' after checking files.length > 0
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
          {/* Use TailwindCSS for scrollable area */}
          <div className="max-h-[400px] overflow-y-auto">
            {voters.map((voter, index) => (
              // Add margin-bottom to each row, adjust "mb-4" to increase/decrease space
              <div key={index} className="mb-4 flex space-x-4">
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
                          ? { ...v, vote_weight: parseInt(e.target.value) || 0 } // Ensure empty input doesn't result in NaN
                          : v,
                      ),
                    )
                  }
                />
                <Button onClick={() => removeRow(index)}>Remove</Button>
              </div>
            ))}
            <Button onClick={addRow}>Add row</Button>
          </div>

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
