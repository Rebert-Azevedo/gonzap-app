'use client';
import React, { useState, useEffect } from "react";

export default function Dashboard() {
    const [mensagemCount, setMensagensCount] = useState(0);
    const [audiosCount, setAudiosCount] = useState(0);
    const [documentosCount, setDocumentosCount] = useState(0);
    const [funisCount, setFunisCount] = useState(0);
    const [gatilhosCount, setGatilhosCount] = useState(0);


    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!sessionStorage.getItem('token')) {
            window.location.href = '/login';
        }
        const fetchCounts = async () => {
            setIsLoading(true);

            try {
                // Função para buscar contagem dos dados do dashboard
                const fetchddashboardCount = async () => {
                    const response = await fetch('http://localhost:8000/api/gridDashboard');
                    if (!response.ok) throw new Error('Erro ao buscar mensagens');
                    const data = await response.json();
                    setMensagensCount(data[0][0].count);
                    setAudiosCount(data[1][0].count);
                    setDocumentosCount(data[2][0].count);
                    /*
                    setFunisCount(data[3][0].count);
                    setGatilhosCount(data[4][0].count);
                    */
                };// Para adicionar FUNIS e GATILHOS no contador do dashboard, mudar na procedure "dashboard"

                // Chamadas das funções para buscar os dados
                await Promise.all([
                    fetchddashboardCount(),
                ]);

            } catch (error) {
                console.error('Erro ao buscar dados:', error);
            } finally {
                setIsLoading(false); // Define como false após a busca
            }
        };

        fetchCounts();
    }, []);

    return (
        <div className="">
            {/* Main Content */}
            <main className="ml-[18%] w-[82.5%] flex-1 p-5">
                {/* Dashboard Content */}
                <section>
                    <h3 className="text-2xl mb-4 text-zinc-600">Bem-vindo ao Gonzap Dashboard!</h3>
                    <div className="grid grid-cols-3 gap-4">
                        {/* Cards */}
                        <div className="bg-slate-800 p-6 rounded text-center">
                            <h4 className="text-xl font-bold mb-2">Mensagens:<br></br>{isLoading ? 'Carregando...' : mensagemCount}</h4>
                        </div>
                        <div className="bg-slate-800 p-6 rounded text-center">
                            <h4 className="text-xl font-bold mb-2">Áudios:<br></br>{isLoading ? 'Carregando...' : audiosCount}</h4>
                        </div>
                        <div className="bg-slate-800 p-6 rounded text-center">
                            <h4 className="text-xl font-bold mb-2">Documentos:<br></br>{isLoading ? 'Carregando...' : documentosCount}</h4>
                        </div>
                        <div className="bg-slate-800 p-6 rounded text-center">
                            <h4 className="text-xl font-bold mb-2">Funis:<br></br>{isLoading ? 'Carregando...' : funisCount}</h4>
                        </div>
                        <div className="bg-slate-800 p-6 rounded text-center">
                            <h4 className="text-xl font-bold mb-2">Gatilhos:<br></br>{isLoading ? 'Carregando...' : gatilhosCount}</h4>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}
