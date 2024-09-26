import Link from "next/link";
import Image from "next/image";

export default function Sidebar() {
    return (
        <aside className="min-h-screen w-1/4 bg-slate-800 p-4">
            <div className="flex items-center mb-4">
                <img
                    src="../../public/logo.png" 
                    width={50}
                    height={50}
                />
            </div>
            <p className="text-sm mb-8">VERSÃO: 1.0.0</p>
            <ul className="space-y-4">
                <li>
                    <button
                        className="w-full bg-orange-500 p-2 text-left rounded focus:outline-none focus:ring-2 focus:ring-orange-300"
                    >
                        <Link href={'/dashboard'}>Início</Link>
                    </button>
                </li>
                <li>
                    <button
                        className="w-full bg-orange-500 p-2 text-left rounded focus:outline-none focus:ring-2 focus:ring-orange-300"
                    >
                        <Link href={'/mensagens'}>Mensagens</Link>
                    </button>
                </li>
                <li>
                    <button
                        className="w-full bg-orange-500 p-2 text-left rounded focus:outline-none focus:ring-2 focus:ring-orange-300"
                    >
                        <Link href={'/audios'}>Áudios</Link>
                    </button>
                </li>
                <li>
                    <button
                        className="w-full bg-orange-500 p-2 text-left rounded focus:outline-none focus:ring-2 focus:ring-orange-300"
                    >
                        <Link href={'/documentos'}>Documentos</Link>
                    </button>
                </li>
                <li>
                    <button
                        className="w-full bg-orange-500 p-2 text-left rounded focus:outline-none focus:ring-2 focus:ring-orange-300"
                    >
                        <Link href={'/funis'}>Funis</Link>
                    </button>
                </li>
                <li>
                    <button
                        className="w-full bg-orange-500 p-2 text-left rounded focus:outline-none focus:ring-2 focus:ring-orange-300"
                    >
                        <Link href={'/gatilhos'}>Gatilhos</Link>
                    </button>
                </li>
                <li>
                    <button
                        className="w-full bg-orange-500 p-2 text-left rounded focus:outline-none focus:ring-2 focus:ring-orange-300"
                    >
                        <Link href={'/backups'}>Backups</Link>
                    </button>
                </li>
            </ul>
        </aside>
    );
}
