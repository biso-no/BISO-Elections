"use client";

import type { PopoverActionsProps } from "~/components/popover-actions";
import { PopoverActions } from "~/components/popover-actions";
import {
  Table as DefaultTable,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { useToast } from "~/components/ui/use-toast";
import { api } from "~/trpc/react";
import { InviteUsers } from "./invite-button";

export interface TableProps<T> {
  electionId: string;
  data: T[];
  withActions?: boolean;
  actions?: PopoverActionsProps["items"];
}
interface VoterInvitation {
  name: string;
  email: string;
  electionId: string;
  vote_weight: number;
}

function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const popoverItems: PopoverActionsProps["items"] = [
  {
    id: "edit",
    icon: <EditIcon className="h-4 w-4" />,
    label: "Edit",
    onClick: () => {
      console.log("edit");
    },
  },
  {
    id: "delete",
    icon: <DeleteIcon className="h-4 w-4" />,
    label: "Delete",
    onClick: () => {
      console.log("delete");
    },
  },
];

export function Table<T extends Record<string, unknown>>({
  electionId,
  data,
  withActions = false,
  actions = popoverItems,
}: TableProps<T>) {
  // Infer headers from the keys of the first data object
  const headers = Object.keys(data[0] ?? {});
  const toast = useToast();
  // Optional: Verify that all data objects have the same structure
  const allDataHasSameStructure = data.every(
    (item) => JSON.stringify(Object.keys(item)) === JSON.stringify(headers),
  );

  if (!allDataHasSameStructure) {
    console.error("All data items must have the same structure");
    return null;
  }

  const utils = api.useUtils();

  const { mutateAsync: inviteVoters } =
    api.elections.createMultipleVoters.useMutation({
      onSuccess: async () => {
        await utils.elections.voters.invalidate();
        toast.toast({
          title: "Voters invited",
          description: "The voters have been invited.",
          variant: "default",
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

  const onInvite = async (voters: VoterInvitation[], electionId: string) => {
    await inviteVoters({
      electionId,
      voters,
    });
  };

  return (
    <>
      <InviteUsers electionId={electionId} onInvite={onInvite} />
      <DefaultTable>
        <TableHeader>
          <TableRow>
            {headers.map((header) => (
              <TableHead key={header}>
                {capitalizeFirstLetter(header)}
              </TableHead>
            ))}
            {withActions && <TableHead>Actions</TableHead>}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((row, index) => (
            <TableRow key={String(row.id ?? index)}>
              {headers.map((header) => (
                <TableCell key={header}>{String(row[header])}</TableCell>
              ))}
              {withActions && (
                <TableCell className="hidden md:table-cell">
                  <PopoverActions items={actions} />
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </DefaultTable>
    </>
  );
}

function EditIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 13.5V4a2 2 0 0 1 2-2h8.5L20 7.5V20a2 2 0 0 1-2 2h-5.5" />
      <polyline points="14 2 14 8 20 8" />
      <path d="M10.42 12.61a2.1 2.1 0 1 1 2.97 2.97L7.95 21 4 22l.99-3.95 5.43-5.44Z" />
    </svg>
  );
}

function DeleteIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 5H9l-7 7 7 7h11a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2Z" />
      <line x1="18" x2="12" y1="9" y2="15" />
      <line x1="12" x2="18" y1="9" y2="15" />
    </svg>
  );
}
