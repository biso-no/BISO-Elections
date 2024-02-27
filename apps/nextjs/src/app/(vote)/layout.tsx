import { HeaderBar } from "./_components/header";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <HeaderBar />
      <main className="flex-1">{children}</main>
    </div>
  );
}
