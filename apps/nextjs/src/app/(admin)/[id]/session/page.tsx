"use client";

import { useElectionId } from "~/lib/hooks/useElectionId";
import { Session } from "./_components/session-table";

export default function SessionPage() {
  const electionId = useElectionId();

  if (!electionId) {
    return null;
  }

  return <Session id={electionId} />;
}
