"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MinusIcon, PlusIcon } from "@radix-ui/react-icons";

import { Button } from "~/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "~/components/ui/drawer";
import { useElectionId } from "~/lib/hooks/useElectionId";
import { api } from "~/trpc/react";
import { TeamSwitcher } from "./TeamSwitcher";

const bottomNavItems = [
  {
    name: "Users & Access",
    href: "/users",
    icon: UsersIcon, // Replace with your icon
  },
];

export function DrawerNav() {
  const pathname = usePathname();

  const electionId = useElectionId();

  const { data: user } = api.auth.me.useQuery();

  const isAdmin = user?.app_metadata.roles.includes("admin");

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

          {
            name: "Voters",
            href: "/voters",
            icon: UsersIcon,
          },
        ]
      : []),
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
    <Drawer>
      <DrawerTrigger>
        <DrawerIcon />
      </DrawerTrigger>
      <DrawerContent orientation="Left">
        <DrawerHeader>
          <TeamSwitcher />
        </DrawerHeader>
        <nav>
          <ul>
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={getHref(item.href)}
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-lg transition-all"
              >
                <item.icon className="h-4 w-4" />
                {item.name}
              </Link>
            ))}
          </ul>
        </nav>
      </DrawerContent>
    </Drawer>
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

function DrawerIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 15 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M14 12.85L1 12.85L1 14.15L14 14.15L14 12.85ZM14 8.85002L1 8.85002L1 10.15L14 10.15L14 8.85002ZM1 4.85003L14 4.85003L14 6.15003L1 6.15002L1 4.85003ZM14 0.850025L1 0.850025L1 2.15002L14 2.15002L14 0.850025Z"
        fill="currentColor"
        fillRule="evenodd"
        clipRule="evenodd"
      ></path>
    </svg>
  );
}
