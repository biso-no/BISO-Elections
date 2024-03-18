import { VotingBallot } from "~/app/_components/voting-ballot";
import { Card, CardHeader, CardTitle } from "~/components/ui/card";
import { api } from "~/trpc/server";

export default async function VotingPage({
  params,
}: {
  params: { id: string };
}) {
  const status = await api.voter.me();

  //If no status or status is not active, display "Your account is not active, if this is an error, please contact support"

  if (!status || status.status !== "active") {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center py-2">
        <Card>
          <CardHeader>
            <CardTitle>
              Your account is not active, if this is an error, please contact
              support
            </CardTitle>
          </CardHeader>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <VotingBallot />
    </div>
  );
}
