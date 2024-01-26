import { VotingBallot } from "~/app/_components/voting-ballot";
import { getUser } from "~/app/auth/actions";

export default async function VotingPage({
  params,
}: {
  params: { id: string };
}) {
  const { user } = await getUser();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <VotingBallot electionId={params.id} userId={user?.id} />
    </div>
  );
}
