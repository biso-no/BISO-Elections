import { config, TamaguiProvider as TamUI } from "@acme/ui";

interface Props {
  children: React.ReactNode;
}

export function TamaguiProvider({ children }: Props) {
  return <TamUI config={config}>{children}</TamUI>;
}
