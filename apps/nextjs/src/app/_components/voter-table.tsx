"use client";

import type { RealtimeChannel } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { api } from "~/trpc/react";

export function VoterTable({ electionId }: { electionId: string }) {
  const [onlineVoters, setOnlineVoters] = useState<string[]>([]);
  const { data: allVoters } = api.elections.voters.useQuery(electionId);
  const [channel, setChannel] = useState<RealtimeChannel>();

  const supabase = createClientComponentClient();

  //Create a channel for the election, and set the channel state
  useEffect(() => {
    if (electionId) {
      const channel = supabase.channel(`elections:${electionId}`);
      setChannel(channel);
    }
  }, [electionId]);

  //Subscribe to the channel
  useEffect(() => {
    if (channel) {
      channel
        .subscribe()
        .on("presence", { event: "sync" }, () => {
          const presenceState = channel.presenceState();

          const onlineVoters = Object.keys(presenceState)
            .map((presenceId) => {
              const presences = presenceState[presenceId] as unknown as {
                userId: string;
              }[];
              return presences.map((presence) => presence.userId);
            })
            .flat();
          setOnlineVoters(onlineVoters);
        })
        .on("presence", { event: "join" }, () => {
          const presenceState = channel.presenceState();

          const onlineVoters = Object.keys(presenceState)
            .map((presenceId) => {
              const presences = presenceState[presenceId] as unknown as {
                userId: string;
              }[];
              return presences.map((presence) => presence.userId);
            })
            .flat();
          setOnlineVoters(onlineVoters);
        });
      return () => {
        void channel.unsubscribe();
        setChannel(undefined);
      };
    }
  }, [channel]);

  //Render the online voters table
  return (
    <Table>
      <TableCaption>Online Voters</TableCaption>
      <TableHeader>
        <TableRow>
          <TableCell>Voter ID</TableCell>
          <TableCell>Name</TableCell>
          <TableCell>Online status</TableCell>
        </TableRow>
      </TableHeader>
      <TableBody>
        {allVoters?.map((voter) => (
          <TableRow key={voter.id}>
            <TableCell>{voter.profileId}</TableCell>
            <TableCell>{voter.profile.name}</TableCell>
            <TableCell>
              {onlineVoters.includes(voter.profileId) ? "Online" : "Offline"}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
