'use client';
import { useEffect, useState } from 'react';

export default function Header() {
    const [nome, setNome] = useState('');

    useEffect(() => {
        // Verifica se o token existe, caso contrário, redireciona para a página de login
        if (!sessionStorage.getItem('token')) {
            window.location.href = '/login';
        } else {
            // Recupera o nome do usuário do sessionStorage, caso o token exista
            const storedNome = sessionStorage.getItem('nome');
            if (storedNome) {
                setNome(storedNome); // Atualiza o estado com o nome do usuário
            }
        }
    }, []);

    const handleSupportClick = () => {
        const message = encodeURIComponent("Olá, estou tendo dúvidas a utilizar o sistema Gonzap!");
        const phoneNumber = "5574981396860"; // Sem o '+', apenas números
        const url = `https://wa.me/${phoneNumber}?text=${message}`;
        window.open(url, '_blank'); // Abre o WhatsApp em uma nova aba
    };

    const handleLogout = () => {
        // Remove o token e o nome do sessionStorage
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('nome');
        // Redireciona para a página de login
        window.location.href = '/login';
    };

    return (
        <header className="fixed z-10 w-full bg-slate-800 flex justify-between py-2 px-4 items-center shadow-md">
            <h2 className="text-lg">Olá, {nome}!</h2> {/* Exibe o nome do usuário */}
            <div className="flex items-center">
                <p className="mr-4">Dúvidas ao utilizar o painel de controle?</p>
                <button
                    onClick={handleSupportClick}
                    className="bg-orange-800 text-white px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-orange-300 transition-transform transform hover:scale-105 active:scale-95 mr-2">
                    Suporte
                </button>
                <button 
                    onClick={handleLogout} // Adiciona o handler para o botão Sair
                    className="bg-orange-800 text-white px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-orange-300 transition-transform transform hover:scale-105 active:scale-95">
                    Sair
                </button>
            </div>
        </header>
    );
}
