import Link from "next/link";

import { ModeToggle } from "~/components/theme-toggle";
import { getUser } from "../auth/actions";
import { CommandModal } from "./CommandModal";
import { NotificationCenter } from "./notification-center";
import { ProfileDropdown } from "./profile-dropdown";

export async function HeaderBar() {
  const { user } = await getUser();

  return (
    <>
      <header className="flex h-14 items-center gap-4 px-6">
        <Link className="lg:hidden" href="#">
          <VoteIcon className="h-6 w-6" />
          <span className="sr-only">Home</span>
        </Link>
        <div className="w-full flex-1">
          <form>
            <div className="relative">
              <CommandModal />
            </div>
          </form>
        </div>
        <ModeToggle />
        <NotificationCenter />
        <ProfileDropdown user={user} />
      </header>
    </>
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
