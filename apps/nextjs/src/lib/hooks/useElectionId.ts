import { usePathname } from "next/navigation";

export const useElectionId = () => {
  const pathname = usePathname();

  // Regex for UUID
  const uuidRegex =
    /\b[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}\b/;

  // Extract UUID from the pathname
  const match = pathname.match(uuidRegex);

  // If a UUID is found, it is returned, otherwise null
  return match ? match[0] : null;
};
