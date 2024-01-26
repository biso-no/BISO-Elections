import { Table } from "~/app/_components/Table";
import { Button } from "~/components/ui/button";

const data = [
  {
    id: 1,
    name: "John Doe",
    position: "President",
    votes: 0,
  },
  {
    id: 2,
    name: "Jane Doe",
    position: "Vice President",
    votes: 0,
  },
];

export default function Page() {
  return (
    <>
      <div className="flex items-center gap-4">
        <h2 className="text-lg font-semibold md:text-2xl">Candidates</h2>
        <Button className="ml-auto" size="sm">
          Add Candidate
        </Button>
      </div>
      <div className="rounded-lg border shadow-sm">
        <Table data={data} withActions />
      </div>
    </>
  );
}
