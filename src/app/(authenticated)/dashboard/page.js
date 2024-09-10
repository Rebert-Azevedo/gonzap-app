import React from "react";

export default function Dashboard() {
    return (
        <div className="">
            {/* Main Content */}
            <main className="flex-1 p-6">
                {/* Dashboard Content */}
                <section>
                    <h3 className="text-2xl mb-4 text-zinc-600">Bem-vindo ao Gonzap Dashboard!</h3>
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
