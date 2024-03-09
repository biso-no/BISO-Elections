import { Card, CardHeader } from "~/components/ui/card";
import { api } from "~/trpc/server";
import { SelectElection } from "./_components/select-election";

export default async function VotePage() {
  const elections = await api.voter.all();

  if (elections.length === 0) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center py-2">
        <Card>
          <CardHeader>
            <h3>No elections found</h3>
          </CardHeader>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <SelectElection elections={elections} />
    </div>
  );
}
