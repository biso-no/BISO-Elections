import { api } from "~/trpc/server";
import { HeaderBar } from "../_components/HeaderBar";
import { VerticalBar } from "../_components/VerticalBar";

interface LayoutProps {
  children: React.ReactNode;
}

export default async function AdminLayout({ children }: LayoutProps) {
  return (
    <div className="grid min-h-screen w-full lg:grid-cols-[280px_1fr]">
      <VerticalBar />
      <div className="flex flex-col">
        <HeaderBar />
        <div className="flex flex-col">
          <div className="flex flex-col">
            <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
              {children}
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}
