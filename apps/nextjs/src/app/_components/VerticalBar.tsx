"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "~/components/ui/card";
import { useElectionId } from "~/lib/hooks/useElectionId";
import { TeamSwitcher } from "./TeamSwitcher";

const bottomNavItems = [
  {
    name: "Elections",
    href: "/elections",
    icon: ElectionsIcon, // Replace with your icon
  },
  {
    name: "Users & Access",
    href: "/users-access",
    icon: UsersIcon, // Replace with your icon
  },
];

export function VerticalBar() {
  const pathname = usePathname();

  const electionId = useElectionId();

  const navItems = [
    {
      name: "Overview",
      href: "/",
      icon: HomeIcon,
    },
    ...(electionId
      ? [
          {
            name: "Sessions",
            href: "/session",
            icon: UsersIcon,
          },
        ]
      : []),
    {
      name: "Voters",
      href: "/voters",
      icon: UsersIcon,
    },
    {
      name: "Statistics",
      href: "#",
      icon: BarChartIcon,
    },
  ];

  const activatePath = (path: string) => {
    return path === pathname
      ? "bg-gray-200 dark:bg-gray-800/40 text-gray-900 dark:text-gray-100"
      : "text-gray-500 hover:bg-gray-200 dark:hover:bg-gray-800/40";
  };

  const getHref = (baseHref: string) => {
    // Append electionId to href for relevant links
    if (electionId && baseHref.startsWith("/")) {
      return `/${electionId}${baseHref}`;
    }
    return baseHref;
  };

  return (
    <div className="hidden lg:block">
      <Card className="flex h-full max-h-screen flex-col gap-2">
        <CardHeader className="flex h-[60px] items-center px-6">
          <TeamSwitcher />
        </CardHeader>
        <CardContent className="flex-1 overflow-auto py-2">
          <nav className="grid items-start gap-2 px-4 text-sm font-medium">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={getHref(item.href)}
                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-lg transition-all ${activatePath(
                  item.href,
                )}`}
              >
                <item.icon className="h-4 w-4" />
                {item.name}
              </Link>
            ))}
          </nav>
        </CardContent>
        <CardFooter className="sticky bottom-0">
          <nav className="grid items-start px-4 text-sm font-medium">
            {bottomNavItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${activatePath(
                  item.href,
                )}`}
              >
                <item.icon className="h-4 w-4" />
                {item.name}
              </Link>
            ))}
          </nav>
        </CardFooter>
      </Card>
    </div>
  );
}

function BarChartIcon(props: React.ComponentProps<"svg">) {
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
      <line x1="12" x2="12" y1="20" y2="10" />
      <line x1="18" x2="18" y1="20" y2="4" />
      <line x1="6" x2="6" y1="20" y2="16" />
    </svg>
  );
}

function HomeIcon(props: React.ComponentProps<"svg">) {
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
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
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

function ElectionsIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M12 6v6l4 2" />
    </svg>
  );
}
