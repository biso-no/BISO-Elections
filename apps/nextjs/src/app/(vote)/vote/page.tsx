import { api } from "~/trpc/server";
import { SelectElection } from "./_components/select-election";

export default async function VotePage() {
  const me = await api.auth.me.query();

  console.log(me);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <SelectElection />
    </div>
  );
}
