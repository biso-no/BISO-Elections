import { VoterTable } from "~/app/_components/voter-table";
import { api } from "~/trpc/server";
import { InviteUsers } from "./_components/invite-button";
import { Table } from "./_components/voter-table";

export default async function AdminVotersPage({
  params,
}: {
  params: { id: string };
}) {
  const voters = await api.elections.voters.query(params.id);

  //Construct the table data with name, email and vote_weight
  const tableData = voters.map((voter) => {
    return {
      name: voter.profile.name,
      email: voter.profile.email,
      vote_weight: voter.vote_weight,
    };
  });

  return (
    <div className="container mx-auto">
      <Table data={tableData} electionId={params.id} />
    </div>
  );
}
