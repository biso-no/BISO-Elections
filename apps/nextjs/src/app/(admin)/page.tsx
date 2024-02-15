import { DashboardStatistics } from "~/app/_components/DashboardStatistics";
import { DashboardQuickLinks } from "~/app/_components/QuickLinks";

export default function DashboardPage() {
  return (
    <div>
      <div className="mb-4 text-3xl font-bold">
        THIS PAGE IS WORK IN PROGRESS
      </div>
      <DashboardStatistics />
      <DashboardQuickLinks />
    </div>
  );
}
