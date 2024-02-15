import { VotingBallot } from "~/app/_components/voting-ballot";
import { api } from "~/trpc/server";

export default async function VotingPage({
  params,
}: {
  params: { id: string };
}) {
  const initialSession = await api.voter.activeSession.query();

  if (!initialSession) {
    return null;
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <VotingBallot />
    </div>
  );
}
