import { SocketProvider } from "~/components/socket-provider";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <SocketProvider url="http://localhost:3001">{children}</SocketProvider>
  );
}
