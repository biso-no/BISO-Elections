import { api } from "~/trpc/server";
import { UsersTable } from "./_components/users-table";

export default async function Page() {
  const users = await api.admin.all({
    page: 1,
  });

  if (!users) {
    return <div>Failed to load users</div>;
  }

  return (
    <>
      <div className="mt-8">
        <UsersTable users={users} />
      </div>
    </>
  );
}
