"use client";

import { Button } from "~/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";

export interface PopoverActionsProps {
  items: {
    id: string | number;
    icon: React.ReactNode;
    label: string;
    onClick: () => void;
  }[];
}

export function PopoverActions({ items }: PopoverActionsProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          className="rounded bg-transparent px-2 py-1 hover:bg-gray-200 hover:text-gray-700 active:bg-gray-300 active:text-gray-800"
          type="button"
        >
          <MoreVerticalIcon className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-40">
        {items.map((item) => (
          <button
            className="flex w-full items-center space-x-2 rounded-lg px-2 py-2 text-gray-500 hover:bg-gray-200 active:bg-gray-300"
            key={item.id}
            onClick={item.onClick}
          >
            {item.icon}
            <span className="text-sm font-medium">{item.label}</span>
          </button>
        ))}
      </PopoverContent>
    </Popover>
  );
}

function MoreVerticalIcon(props: React.ComponentProps<"svg">) {
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
      <circle cx="12" cy="12" r="1" />
      <circle cx="12" cy="5" r="1" />
      <circle cx="12" cy="19" r="1" />
    </svg>
  );
}
