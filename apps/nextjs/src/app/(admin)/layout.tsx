import { HeaderBar } from "../_components/HeaderBar";
import { VerticalBar } from "../_components/VerticalBar";

interface LayoutProps {
  children: React.ReactNode;
}

export default async function AdminLayout({ children }: LayoutProps) {
  return (
    <div className="top-5 grid h-screen min-h-screen w-full lg:grid-cols-[280px_1fr]">
      <VerticalBar />
      <div className="flex h-screen flex-col">
        <HeaderBar />
        <div className="flex h-screen flex-col">
          <div className="flex h-screen flex-col">
            <main className="flex h-screen flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
              {children}
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}
