"use client";

import * as React from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  CaretSortIcon,
  CheckIcon,
  PlusCircledIcon,
} from "@radix-ui/react-icons";

import type { RouterOutputs } from "@acme/api";

import { Button } from "~/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "~/components/ui/command";
import { Dialog, DialogTrigger } from "~/components/ui/dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { cn } from "~/lib/utils";
import { api } from "~/trpc/react";
import { CreateElection } from "./CreateElection";

type PopoverTriggerProps = React.ComponentPropsWithoutRef<
  typeof PopoverTrigger
>;

type TeamSwitcherProps = PopoverTriggerProps;

export function TeamSwitcher({ className }: TeamSwitcherProps) {
  const { data: elections } = api.elections.mine.useQuery();

  const pathname = usePathname();

  const electionId = pathname.split("/")[1] || ""; // Ensure electionId is always a string

  if (!electionId) {
    console.log("No election id found");
  }

  const { data: election } = api.elections.byId.useQuery({ id: electionId });

  const router = useRouter();

  const [open, setOpen] = React.useState(false);
  const [showNewTeamDialog, setShowNewTeamDialog] = React.useState(false);

  const onElectionSelect = (
    election: RouterOutputs["elections"]["mine"][number],
  ) => {
    router.push(`/${election.id}`);
  };

  const [selectedElection, setSelectedElection] =
    React.useState<RouterOutputs["elections"]["mine"][number]>();

  return (
    <Dialog open={showNewTeamDialog} onOpenChange={setShowNewTeamDialog}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="ghost"
            role="combobox"
            aria-expanded={open}
            aria-label="Select an Election"
            className={cn("w-[200px] justify-between", className)}
          >
            {election?.name ?? "Select an Election"}
            <CaretSortIcon className="ml-auto h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandList>
              <CommandInput placeholder="Search election..." />
              <CommandEmpty>No election found.</CommandEmpty>
              <CommandGroup key="my-elections" heading="My Elections">
                {elections?.map((election) => (
                  <CommandItem
                    key={election.name}
                    onSelect={() => {
                      setSelectedElection(election);
                      onElectionSelect(election);
                      setOpen(false);
                    }}
                    className="text-sm"
                  >
                    {election.name}
                    <CheckIcon
                      className={cn(
                        "ml-auto h-4 w-4",
                        selectedElection?.name === election.name
                          ? "opacity-100"
                          : "opacity-0",
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
            <CommandSeparator />
            <CommandList>
              <CommandGroup>
                <DialogTrigger asChild>
                  <CommandItem
                    onSelect={() => {
                      setOpen(false);
                      setShowNewTeamDialog(true);
                    }}
                  >
                    <PlusCircledIcon className="mr-2 h-5 w-5" />
                    Create Election
                  </CommandItem>
                </DialogTrigger>
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      <CreateElection onClose={setShowNewTeamDialog} />
    </Dialog>
  );
}
