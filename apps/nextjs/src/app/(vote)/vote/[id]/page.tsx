import { api } from "~/trpc/server";
import { VotingBallot } from "../_components/voting-ballot";

export default async function VotingPage({
  params,
}: {
  params: { id: string };
}) {
  const initialSession = await api.voter.activeSession.query();

  if (!initialSession) {
    return null;
  }

  const hasVoted = false;

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <VotingBallot
        initialSession={initialSession}
        initialHasVoted={hasVoted}
      />
    </div>
  );
}
