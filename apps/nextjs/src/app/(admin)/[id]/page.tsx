import { DashboardStatistics } from "~/app/_components/DashboardStatistics";
import { DashboardQuickLinks } from "~/app/_components/QuickLinks";
import { VoterTable } from "~/app/_components/voter-table";

export default function DashboardPage({ params }: { params: { id: string } }) {
  // Election ID
  const { id } = params;

  return (
    <>
      <DashboardStatistics />
      <VoterTable electionId={id} />
    </>
  );
}
