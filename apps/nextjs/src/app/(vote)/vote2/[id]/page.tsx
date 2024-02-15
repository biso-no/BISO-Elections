import { api } from "~/trpc/server";
import { VotingBallot } from "../_components/voting-ballot";

const sessions = [
  {
    title: "Mayor Voting Session",
    description: "Choose one candidate for Mayor.",
    candidates: [
      { id: 1, name: "Sarah Thompson" },
      { id: 2, name: "Alex Rodriguez" },
      { id: 3, name: "Mei Chen" },
    ],
  },
  {
    title: "Controller Voting Session",
    description: "Choose one candidate for Controller.",
    candidates: [
      { id: 1, name: "John Smith" },
      { id: 2, name: "Emily Davis" },
      { id: 3, name: "Michael Johnson" },
    ],
  },
];

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
      <VotingBallot sessions={sessions} />
    </div>
  );
}
