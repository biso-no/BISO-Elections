import Image from "next/image";
import Link from "next/link";

import { ModeToggle } from "~/components/theme-toggle";
import { Input } from "~/components/ui/input";
import { api } from "~/trpc/server";
import { ProfilePopover } from "./ProfileIcon";

//A dynamic alternative to the navbar below
export async function Navbar() {
  const user = await api.auth.me.query();

  const role = user?.user_metadata.role as string;

  console.log("User", user);

  return (
    <header className="py-4 shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4">
        <div className="flex items-center space-x-4">
          <Image
            alt="Logo"
            className="h-10"
            height="40"
            src="/icon.png"
            style={{
              aspectRatio: "40/40",
              objectFit: "cover",
            }}
            width="40"
          />
          <nav className="hidden space-x-4 md:flex">
            <Link
              className="text-sm font-semibold text-gray-700 hover:text-gray-900 hover:underline"
              href="#"
            >
              Home
            </Link>
            <Link
              className="text-sm font-semibold text-gray-700 hover:text-gray-900 hover:underline"
              href="#"
            >
              My Courses
            </Link>
          </nav>
        </div>
        <div className="flex items-center space-x-4">
          {role === "admin" && (
            <Link
              className="text-sm font-semibold text-gray-700 hover:text-gray-900 hover:underline"
              href="/admin/courses"
            >
              Admin
            </Link>
          )}
          <div className="flex items-center rounded-md bg-gray-100 px-3 py-1.5 dark:bg-gray-800">
            <SearchIcon className="h-4 w-4 text-gray-400" />
            <Input
              className="border-none bg-transparent text-sm"
              placeholder="Search..."
              type="search"
            />
          </div>
          <ModeToggle />
          <ProfilePopover />
        </div>
      </div>
    </header>
  );
}

function SearchIcon(props: React.SVGProps<SVGSVGElement>) {
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
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}
