import { api } from "~/trpc/server";
import { VotingBallot } from "../_components/voting-ballot";

export default async function VotingPage({
  params,
}: {
  params: { id: string };
}) {
  const initialSession = await api.voter.activeSession.query({
    id: params.id,
  });

  console.log("Initial session", initialSession?.sessions[0]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <VotingBallot
        electionId={params.id}
        initialSession={initialSession?.sessions[0]}
      />
    </div>
  );
}
