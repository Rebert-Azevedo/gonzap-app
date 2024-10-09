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
                // Função para buscar contagem de mensagens
                const fetchMensagensCount = async () => {
                    const response = await fetch('/api/gridMensagens');
                    if (!response.ok) throw new Error('Erro ao buscar mensagens');
                    const data = await response.json();
                    setMensagensCount(data.count); // Acessa a chave correta
                };

                // Função para buscar contagem de áudios
                const fetchAudiosCount = async () => {
                    const response = await fetch('/api/gridAudios');
                    if (!response.ok) throw new Error('Erro ao buscar audios');
                    const data = await response.json();
                    setAudiosCount(data.count); // Acessa a chave correta
                };

                // Função para buscar contagem de documentos
                const fetchDocumentosCount = async () => {
                    const response = await fetch('/api/gridMensagem');
                    if (!response.ok) throw new Error('Erro ao buscar documentos');
                    const data = await response.json();
                    setDocumentosCount(data.count); // Acessa a chave correta
                };

                // Função para buscar contagem de funis
                const fetchFunisCount = async () => {
                    const response = await fetch('/api/gridMensagem');
                    if (!response.ok) throw new Error('Erro ao buscar funis');
                    const data = await response.json();
                    setFunisCount(data.count); // Acessa a chave correta
                };

                // Função para buscar contagem de gatilhos
                const fetchGatilhosCount = async () => {
                    const response = await fetch('/api/gridMensagem');
                    if (!response.ok) throw new Error('Erro ao buscar gatilhos');
                    const data = await response.json();
                    setGatilhosCount(data.count); // Acessa a chave correta
                };

                // Chamadas das funções para buscar os dados
                await Promise.all([
                    fetchMensagensCount(),
                    fetchAudiosCount(),
                    fetchDocumentosCount(),
                    fetchFunisCount(),
                    fetchGatilhosCount()
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
                            <h4 className="text-xl font-bold mb-2">Mensagens: {isLoading ? 'Carregando...' : mensagemCount}</h4>
                        </div>
                        <div className="bg-slate-800 p-6 rounded text-center">
                            <h4 className="text-xl font-bold mb-2">Áudios: {isLoading ? 'Carregando...' : audiosCount}</h4>
                        </div>
                        <div className="bg-slate-800 p-6 rounded text-center">
                            <h4 className="text-xl font-bold mb-2">Documentos: {isLoading ? 'Carregando...' : documentosCount}</h4>
                        </div>
                        <div className="bg-slate-800 p-6 rounded text-center">
                            <h4 className="text-xl font-bold mb-2">Funis: {isLoading ? 'Carregando...' : funisCount}</h4>
                        </div>
                        <div className="bg-slate-800 p-6 rounded text-center">
                            <h4 className="text-xl font-bold mb-2">Gatilhos: {isLoading ? 'Carregando...' : gatilhosCount}</h4>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}
