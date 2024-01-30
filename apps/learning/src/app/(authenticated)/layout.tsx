//import { Footer } from "../_components/Footer";
import { Footer } from "./_components/footer";
import { Navbar } from "./_components/Navbar";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout(props: LayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      {props.children}
      <Footer />
    </div>
  );
}
