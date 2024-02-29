import { ModeToggle } from "~/components/theme-toggle";
import { api } from "~/trpc/server";
import { getUser } from "../auth/actions";
import { DrawerNav } from "./drawer";
import { ProfileDropdown } from "./profile-dropdown";

export async function HeaderBar() {
  const { user } = await getUser();

  return (
    <header className="flex h-14 w-full items-center justify-between px-6">
      {/* Left side, visible on large screens or as a drawer on small screens */}
      <div className="flex items-center gap-4">
        <div className="lg:hidden">
          <DrawerNav />
        </div>
      </div>

      {/* Right side, always aligned to the right */}
      <div className="flex items-center gap-4">
        <ModeToggle />
        {user && <ProfileDropdown />}
      </div>
    </header>
  );
}
