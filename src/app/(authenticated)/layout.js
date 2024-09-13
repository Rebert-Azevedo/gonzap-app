import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";

export const metadata = {
  title: "Gonzap",
  description: "Gonzap messenger manager",
};

export default function RootLayout({ children }) {
  return (
    <main className="flex min-h-screen flex-col items-center bg-slate-200 text-white">
      <Header />
      <div className="w-full flex justify-start py-10">
        <Sidebar />
        <div className="w-full flex justify-center mt-4">
          {children}
        </div>
      </div>
    </main>
  );
}