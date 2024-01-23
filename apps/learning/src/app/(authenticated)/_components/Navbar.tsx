"use client";

import Link from "next/link";

import { ModeToggle } from "~/components/theme-toggle";
import {
  NavigationMenu,
  NavigationMenuLink,
  NavigationMenuList,
} from "~/components/ui/navigation-menu";
import { ProfilePopover } from "./ProfileIcon";

const navItems = [
  {
    name: "Video Tutorials",
    href: "#",
  },
  {
    name: "Quizzes",
    href: "#",
  },
  {
    name: "Text Guides",
    href: "#",
  },
];

//A dynamic alternative to the navbar below
export function Navbar() {
  return (
    <header className="flex h-20 w-full items-center justify-between px-4 md:px-6">
      {/* Left side content: Logo and Navigation Menu */}
      <div className="flex items-center">
        <Link className="mr-6" href="#">
          <MountainIcon className="h-6 w-6" />
          <span className="sr-only">BISO</span>
        </Link>
        <NavigationMenu className="hidden lg:flex">
          <NavigationMenuList>
            {navItems.map((item) => (
              <NavigationMenuLink asChild key={item.name}>
                <Link
                  className="group inline-flex h-9 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors"
                  href={item.href}
                >
                  {item.name}
                </Link>
              </NavigationMenuLink>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
      </div>

      {/* Right side content: ModeToggle and ProfilePopover */}
      <div className="flex items-center gap-4">
        <ModeToggle />
        <ProfilePopover />
      </div>
    </header>
  );
}

function MountainIcon(props: React.ComponentProps<"svg">) {
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
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
  );
}
