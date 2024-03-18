"use client";

import { useState } from "react";
import { MoreVertical } from "lucide-react";

import type { RouterOutputs } from "@acme/api";

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
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "~/components/ui/pagination";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
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
import { InviteUsers } from "./invite-button";

export function VoterTable({ id }: { id: string }) {
  const toast = useToast();

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [search, setSearch] = useState("");

  const utils = api.useUtils();

  const { data, isLoading } = api.elections.voters.useQuery({
    electionId: id,
    page,
    limit: pageSize,
  });

  const { mutateAsync: deleteVoter } = api.elections.deleteVoter.useMutation({
    onSuccess: async () => {
      toast.toast({
        title: "Voter deleted",
        description: "The voter has been deleted",
      });

      await utils.elections.voters.invalidate();
    },
  });

  const { mutateAsync: editVoter } = api.elections.updateVoter.useMutation({
    onSuccess: async () => {
      toast.toast({
        title: "Voter updated",
        description: "The voter has been updated",
      });

      await utils.elections.voters.invalidate();
    },
  });

  if (isLoading) return null;

  if (!data) return null;

  const totalPages = Math.ceil(data.totalCount / pageSize);

  // Disable "Previous" button on the first page
  const isOnFirstPage = page === 1;

  // Disable "Next" button on the last page
  const isOnLastPage = page >= totalPages;

  const editVoterStatus = async (
    voter: RouterOutputs["elections"]["voters"]["voters"][number],
  ) => {
    if (voter.status === "active") {
      await editVoter({
        status: "deactivated",
        id: voter.id,
      });
    } else {
      await editVoter({
        status: "active",
        id: voter.id,
      });
    }

    await utils.elections.voters.invalidate();
  };

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-left">Name</TableHead>
            <TableHead className="text-left">Email</TableHead>
            <TableHead className="text-left">Vote weight</TableHead>
            <TableHead className="text-left">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.voters.map((voter) => (
            <TableRow key={voter.id}>
              <TableCell className="text-left">{voter.profile.name}</TableCell>
              <TableCell className="text-left">{voter.profile.email}</TableCell>
              <TableCell className="text-left">{voter.vote_weight}</TableCell>
              <TableCell className="text-left">
                <Popover>
                  <PopoverTrigger>
                    <MoreVertical />
                  </PopoverTrigger>
                  <PopoverContent>
                    <Button
                      variant="outline"
                      onClick={async () => {
                        await editVoterStatus(voter);
                      }}
                    >
                      {voter.status === "active" ? "Deactivate" : "Activate"}
                    </Button>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button>Delete</Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Delete voter</DialogTitle>
                          <DialogDescription>
                            Are you sure you want to delete this voter?
                          </DialogDescription>
                        </DialogHeader>
                        <DialogFooter>
                          <DialogClose asChild>
                            <Button
                              variant="destructive"
                              onClick={async () => {
                                await deleteVoter({ id: voter.id });
                              }}
                            >
                              Delete
                            </Button>
                          </DialogClose>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </PopoverContent>
                </Popover>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <Button asChild disabled variant="outline">
              <PaginationPrevious onClick={() => setPage(page - 1)} />
            </Button>
          </PaginationItem>
          {/* Your code for page numbers could go here, if implemented */}
          <PaginationItem>
            <Button asChild disabled={isOnLastPage} variant="outline">
              <PaginationNext onClick={() => setPage(page + 1)} />
            </Button>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </>
  );
}
