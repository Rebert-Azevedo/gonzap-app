import React from "react";

export default function Dashboard() {
    return (
        <div className="w-full min-h-screen flex bg-slate-900 text-white">
            {/* Sidebar */}
            <aside className="w-1/5 bg-slate-800 p-4">
                <h1 className="text-2xl font-bold text-orange-500 mb-4">GONZAP</h1>
                <p className="text-sm mb-8">versão: 1.0.0</p>
                <ul className="space-y-4">
                    <li><button className="w-full bg-orange-500 p-2 text-left rounded">Início</button></li>
                    <li><button className="w-full bg-orange-500 p-2 text-left rounded">Mensagens</button></li>
                    <li><button className="w-full bg-orange-500 p-2 text-left rounded">Áudios</button></li>
                    <li><button className="w-full bg-orange-500 p-2 text-left rounded">Mídias</button></li>
                    <li><button className="w-full bg-orange-500 p-2 text-left rounded">Documentos</button></li>
                    <li><button className="w-full bg-orange-500 p-2 text-left rounded">Funis</button></li>
                    <li><button className="w-full bg-orange-500 p-2 text-left rounded">Gatilhos</button></li>
                    <li><button className="w-full bg-orange-500 p-2 text-left rounded">Backups</button></li>
                </ul>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-6">
                {/* Header */}
                <div className="flex justify-between items-center bg-slate-700 p-4 rounded mb-6">
                    <h2 className="text-3xl">Olá, Rebert!</h2>
                    <div>
                        <p className="mb-2">Dúvidas ao utilizar o painel de controle?</p>
                        <button className="bg-orange-500 text-white px-4 py-2 rounded">Fale com nosso suporte</button>
                    </div>
                </div>

                {/* Dashboard Content */}
                <section>
                    <h3 className="text-2xl mb-4">Bem-vindo ao Gonzap Dashboard!</h3>
                    <div className="grid grid-cols-3 gap-4">
                        {/* Cards */}
                        <div className="bg-slate-800 p-6 rounded text-center">
                            <h4 className="text-xl font-bold mb-2">Mensagens: 0</h4>
                        </div>
                        <div className="bg-slate-800 p-6 rounded text-center">
                            <h4 className="text-xl font-bold mb-2">Áudios: 0</h4>
                        </div>
                        <div className="bg-slate-800 p-6 rounded text-center">
                            <h4 className="text-xl font-bold mb-2">Mídias: 0</h4>
                        </div>
                        <div className="bg-slate-800 p-6 rounded text-center">
                            <h4 className="text-xl font-bold mb-2">Documentos: 0</h4>
                        </div>
                        <div className="bg-slate-800 p-6 rounded text-center">
                            <h4 className="text-xl font-bold mb-2">Funis: 0</h4>
                        </div>
                        <div className="bg-slate-800 p-6 rounded text-center">
                            <h4 className="text-xl font-bold mb-2">Gatilhos: 0</h4>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}
