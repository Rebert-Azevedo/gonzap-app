'use client';
import { useEffect, useState } from 'react';

export default function Header() {
    const [email, setEmail] = useState('');

    useEffect(() => {
        // Verifica se o token existe, caso contrário, redireciona para a página de login
        if (!sessionStorage.getItem('token')) {
            window.location.href = '/login';
        } else {
            // Recupera o e-mail do usuário do sessionStorage, caso o token exista
            const storedEmail = sessionStorage.getItem('email');
            console.log('Email armazenado:', storedEmail); // Adiciona log para verificar se o email é capturado
            if (storedEmail) {
                setEmail(storedEmail); // Atualiza o estado com o e-mail do usuário
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
        // Remove o token e o e-mail do sessionStorage
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('email');
        // Redireciona para a página de login
        window.location.href = '/login';
    };

    return (
        <header className="fixed z-10 w-full bg-slate-800 flex justify-between py-2 px-4 items-center shadow-md">
            <h2 className="text-lg">Olá, {email ? email : 'Usuário'}!</h2> {/* Exibe o e-mail do usuário */}
            <div className="flex items-center space-x-2"> {/* Adiciona espaço entre os botões */}
                <p className="mr-4">Dúvidas ao utilizar o painel de controle?</p>
                <div className="flex space-x-2"> {/* Contêiner flexível para os botões */}
                    <button
                        onClick={handleSupportClick}
                        className="bg-orange-800 text-white w-32 py-2 rounded focus:outline-none focus:ring-2 focus:ring-orange-300 transition-transform transform hover:scale-105 active:scale-95">
                        Suporte
                    </button>
                    <button 
                        onClick={handleLogout} // Adiciona o handler para o botão Sair
                        className="bg-orange-800 text-white w-32 py-2 rounded focus:outline-none focus:ring-2 focus:ring-orange-300 transition-transform transform hover:scale-105 active:scale-95">
                        Sair
                    </button>
                </div>
            </div>
        </header>
    );
}
