import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import { UserProvider } from "@/components/UserContext"; // Importando o UserContext

export const metadata = {
  title: "Gonzap",
  description: "Gonzap messenger manager",
};

export default function RootLayout({ children }) {
  return (
    <UserProvider> {/* Envolvendo a aplicação com o UserProvider */}
      <main className="flex min-h-screen flex-col items-center bg-slate-200 text-white">
        <Header />
        <div className="w-full flex justify-start py-10">
          <Sidebar />
          <div className="w-full flex justify-center mt-4">
            {children}
          </div>
        </div>
      </main>
    </UserProvider>
  );
}