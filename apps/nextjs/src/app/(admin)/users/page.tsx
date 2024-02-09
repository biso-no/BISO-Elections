import { Toggle } from "~/components/ui/toggle";
import { api } from "~/trpc/server";
import { UsersTable } from "./_components/users-table";

export default async function Page() {
  const users = await api.admin.all.query({
    page: 1,
  });

  if (!users) {
    return <div>Failed to load users</div>;
  }

  return (
    <>
      <div className="mt-8 flex gap-4">
        <fieldset>
          <legend className="mb-4 text-sm font-semibold">Filters</legend>
          <div className="flex items-center gap-2">
            <Toggle aria-label="Filter by Admin">
              <UsersIcon className="h-4 w-4" />
              <span className="text-xs">Admin</span>
            </Toggle>
            <Toggle aria-label="Filter by Election Participant">
              <VoteIcon className="h-4 w-4" />
              <span className="text-xs">Election Participant</span>
            </Toggle>
            <Toggle aria-label="Filter by User">
              <UserIcon className="h-4 w-4" />
              <span className="text-xs">User</span>
            </Toggle>
          </div>
        </fieldset>
      </div>
      <div className="mt-8">
        <UsersTable users={users} />
      </div>
    </>
  );
}

function UserIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

function UsersIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

function VoteIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m9 12 2 2 4-4" />
      <path d="M5 7c0-1.1.9-2 2-2h10a2 2 0 0 1 2 2v12H5V7Z" />
      <path d="M22 19H2" />
    </svg>
  );
}
