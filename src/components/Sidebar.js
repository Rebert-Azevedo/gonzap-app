import Link from "next/link";

export default function SidebarLayout({ children }) {
    return (
        <div className="flex min-h-screen">
            {/* Barra lateral fixa */}
            <aside className="fixed top-25 left-0 min-h-screen w-[18%] bg-orange-500 p-4">
                <div className="flex justify-center items-center mb-4">
                    <img src="/teste.png" alt="Gonzap" className="w-40 h-40" />
                </div>
                <p className="text-sm mb-10">VERSÃO: 1.0.0</p>
                <ul className="space-y-4">
                    <li>
                        <button className="w-full bg-slate-800 p-2 text-left rounded focus:outline-none focus:ring-2 focus:ring-slate-300 transition-transform transform hover:scale-105 active:scale-95">
                            <Link href={'/dashboard'}>Início</Link>
                        </button>
                    </li>
                    <li>
                        <button className="w-full bg-slate-800 p-2 text-left rounded focus:outline-none focus:ring-2 focus:ring-slate-300 transition-transform transform hover:scale-105 active:scale-95">
                            <Link href={'/mensagens'}>Mensagens</Link>
                        </button>
                    </li>
                    <li>
                        <button className="w-full bg-slate-800 p-2 text-left rounded focus:outline-none focus:ring-2 focus:ring-slate-300 transition-transform transform hover:scale-105 active:scale-95">
                            <Link href={'/audios'}>Áudios</Link>
                        </button>
                    </li>
                    <li>
                        <button className="w-full bg-slate-800 p-2 text-left rounded focus:outline-none focus:ring-2 focus:ring-slate-300 transition-transform transform hover:scale-105 active:scale-95">
                            <Link href={'/documentos'}>Documentos</Link>
                        </button>
                    </li>
                    <li>
                        <button className="w-full bg-slate-800 p-2 text-left rounded focus:outline-none focus:ring-2 focus:ring-slate-300 transition-transform transform hover:scale-105 active:scale-95">
                            <Link href={'/funis'}>Funis</Link>
                        </button>
                    </li>
                    <li>
                        <button className="w-full bg-slate-800 p-2 text-left rounded focus:outline-none focus:ring-2 focus:ring-slate-300 transition-transform transform hover:scale-105 active:scale-95">
                            <Link href={'/gatilhos'}>Gatilhos</Link>
                        </button>
                    </li>
                    <li>
                        <button className="w-full bg-slate-800 p-2 text-left rounded focus:outline-none focus:ring-2 focus:ring-slate-300 transition-transform transform hover:scale-105 active:scale-95">
                            <Link href={'/backups'}>Backups</Link>
                        </button>
                    </li>
                </ul>
            </aside>

            {/* Conteúdo centralizado */}
            <main className="ml-[17.5%] flex-grow flex items-center justify-center bg-gray-100">
                {children}
            </main>
        </div>
    );
}
