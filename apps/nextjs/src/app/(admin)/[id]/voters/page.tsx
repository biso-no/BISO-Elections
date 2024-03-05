import { api } from "~/trpc/server";
import { InviteUsers } from "./_components/invite-button";
import { VoterTable } from "./_components/voter-table";

export default async function AdminVotersPage({
  params,
}: {
  params: { id: string };
}) {
  return (
    <div className="container mx-auto">
      <InviteUsers electionId={params.id} />
      <VoterTable id={params.id} />
    </div>
  );
}
