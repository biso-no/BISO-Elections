import { api } from "~/trpc/server";
import { SelectElection } from "./_components/select-election";

export default async function VotePage() {
  const elections = await api.voter.all.query();

  if (!elections) {
    return <div>No elections found</div>;
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <SelectElection elections={elections} />
    </div>
  );
}
