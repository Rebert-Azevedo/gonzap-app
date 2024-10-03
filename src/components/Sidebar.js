import Link from "next/link";

export default function Sidebar() {
    return (
        <aside className="min-h-screen w-1/4 bg-orange-500 p-4">
            <div className="flex justify-center items-center mb-4">
                <img src="/teste.png" alt="Gonzap" className="w-40 h-40" />
            </div>
            <p className="text-sm mb-10">VERSÃO: 1.0.0</p>
            <ul className="space-y-4">
                <li>
                    <button
                        className="w-full bg-slate-800 p-2 text-left rounded focus:outline-none focus:ring-2 focus:ring-slate-300"
                    >
                        <Link href={'/dashboard'}>Início</Link>
                    </button>
                </li>
                <li>
                    <button
                        className="w-full bg-slate-800 p-2 text-left rounded focus:outline-none focus:ring-2 focus:ring-slate-300"
                    >
                        <Link href={'/mensagens'}>Mensagens</Link>
                    </button>
                </li>
                <li>
                    <button
                        className="w-full bg-slate-800 p-2 text-left rounded focus:outline-none focus:ring-2 focus:ring-slate-300"
                    >
                        <Link href={'/audios'}>Áudios</Link>
                    </button>
                </li>
                <li>
                    <button
                        className="w-full bg-slate-800 p-2 text-left rounded focus:outline-none focus:ring-2 focus:ring-slate-300"
                    >
                        <Link href={'/documentos'}>Documentos</Link>
                    </button>
                </li>
                <li>
                    <button
                        className="w-full bg-slate-800 p-2 text-left rounded focus:outline-none focus:ring-2 focus:ring-slate-300"
                    >
                        <Link href={'/funis'}>Funis</Link>
                    </button>
                </li>
                <li>
                    <button
                        className="w-full bg-slate-800 p-2 text-left rounded focus:outline-none focus:ring-2 focus:ring-slate-300"
                    >
                        <Link href={'/gatilhos'}>Gatilhos</Link>
                    </button>
                </li>
                <li>
                    <button
                        className="w-full bg-slate-800 p-2 text-left rounded focus:outline-none focus:ring-2 focus:ring-slate-300"
                    >
                        <Link href={'/backups'}>Backups</Link>
                    </button>
                </li>
            </ul>
        </aside>
    );
}
