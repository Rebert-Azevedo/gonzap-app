'use client';
import { useState } from 'react';
import SHA256 from 'crypto-js/sha256';

export default function Login() {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();

        const hashedPassword = SHA256(senha).toString();

        try {
            const response = await fetch('http://localhost:8000/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email,
                    senha: hashedPassword
                })
            });

            const data = await response.json();

            if (!data || data.length === 0) {
                alert('Erro ao tentar login. Verifique suas credenciais.');
            } else {
                sessionStorage.setItem('token', data[0].id);
                sessionStorage.setItem('email', email);

                alert('Login bem-sucedido!');
                window.location.href = '/dashboard';
            }
        } catch (error) {
            console.error('Erro ao verificar o login:', error);
            alert('Erro ao tentar login. Tente novamente mais tarde.');
        }
    };

    return (
        <div className="w-full min-h-screen flex items-center justify-center align-middle bg-slate-900">
            <div className="box-login">
                <form id="login-form" autoComplete="off" onSubmit={handleLogin}>
                    <h1 className="text-2xl font-bold text-center mb-4">Login</h1>
                    <div className="inputBox mb-4">
                        <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full p-2 rounded-md focus:outline-none" 
                            aria-label="Email"
                        />
                        <span className="text-gray-600">Email</span>
                        <i></i>
                    </div>
                    <div className="inputBox mb-4">
                        <input
                            type="password"
                            required
                            value={senha}
                            onChange={(e) => setSenha(e.target.value)}
                            className="w-full p-2 rounded-md focus:outline-none"
                            aria-label="Senha"
                        />
                        <span className="text-gray-600">Senha</span>
                        <i></i>
                    </div>
                    <div className="links mb-4 flex justify-between">
                        <a href="#" className="text-blue-500 hover:underline">Recuperar senha</a>
                        <a href="/register" className="text-blue-500 hover:underline">Criar usuário</a>
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-orange-500 text-white focus:ring-2 focus:ring-slate-400 py-2 rounded-md  transition duration-200"
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
}
