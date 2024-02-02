import type { ClassValue } from "clsx";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function useInitials(fullName: string) {
  const names = fullName.split(" ");
  const initials = names.map((name) => name.charAt(0)).join("");
  return initials;
}
