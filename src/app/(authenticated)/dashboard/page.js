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
                const response = await fetch('http://localhost:8000/api/gridDashboard');
                if (!response.ok) throw new Error('Erro ao buscar mensagens');
                const data = await response.json();
                setMensagensCount(data[0][0].count);
                setAudiosCount(data[1][0].count);
                setDocumentosCount(data[2][0].count);
                setFunisCount(data[3][0].count);
                setGatilhosCount(data[4][0].count);
            } catch (error) {
                console.error('Erro ao buscar dados:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchCounts();
    }, []);

    return (
        <div className="ml-[18%] w-[82.5%] p-8 min-h-screen flex flex-col items-center bg-gray-100">
            <section className="flex flex-col items-center text-center">
                <h3 className="text-4xl font-bold mb-8 text-gray-900">Bem-vindo ao Gonzap Dashboard!</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full justify-items-center">
                    <Card title="Mensagens" count={mensagemCount} isLoading={isLoading}/>
                    <Card title="Áudios" count={audiosCount} isLoading={isLoading}/>
                    <Card title="Documentos" count={documentosCount} isLoading={isLoading}/>
                    <Card title="Funis" count={funisCount} isLoading={isLoading}/>
                    <Card title="Gatilhos" count={gatilhosCount} isLoading={isLoading}/>
                </div>
            </section>
        </div>
    );
}

function Card({ title, count, isLoading }) {
    return (
        <div className="bg-slate-800 p-6 rounded-xl shadow-lg w-64 transition-transform transform hover:scale-105">
            <h4 className="text-2xl font-bold text-white mb-4">{title}:</h4>
            <div className="text-4xl font-extrabold text-orange-500">
                {isLoading ? <Spinner/> : count}
            </div>
        </div>
    );
}

function Spinner() {
    return (
        <div className="flex justify-center items-center">
            <svg className="animate-spin h-8 w-8 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
            </svg>
        </div>
    );
}
