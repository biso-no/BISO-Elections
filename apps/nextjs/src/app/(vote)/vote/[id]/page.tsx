import { VotingBallot } from "~/app/_components/voting-ballot";
import { getUser } from "~/app/auth/actions";
import { api } from "~/trpc/server";

export default async function VotingPage({
  params,
}: {
  params: { id: string };
}) {
  const { user } = await getUser();

  const initialSession = await api.voter.sessionById.query({
    id: params.id,
  });

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <VotingBallot
        electionId={params.id}
        userId={user?.id}
        initialSessionId={initialSession?.id}
      />
    </div>
  );
}
