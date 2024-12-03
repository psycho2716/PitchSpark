import Navbar from "@/components/navbar";
import { ToastProvider } from "@/components/ui/toast";

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <main className="font-work-sans">
      <Navbar />
      <ToastProvider>{children}</ToastProvider>
    </main>
  );
}
