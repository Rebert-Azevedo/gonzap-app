'use client'
import { useState } from 'react';
import SHA256 from 'crypto-js/sha256'; // Certifique-se de instalar crypto-js: npm install crypto-js

export default function Login() {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();

        // Hashing da senha usando SHA-256
        const hashedPassword = SHA256(senha).toString(); // Corrigido para usar a variável correta

        try {
            const response = await fetch('http://localhost:8000/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email,
                    senha: hashedPassword // Corrigido para usar o hash gerado
                })
            });

            const data = await response.json();

            if (!data || data.length === 0) {
                alert('Erro ao tentar login.');
            } else {
                alert('Login!!');
                window.location.href = '/dashboard';
                sessionStorage.setItem('token', data[0].id);
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
                    <h1>Login</h1>
                    <div className="inputBox">
                        <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <span>Email</span>
                        <i></i>
                    </div>
                    <div className="inputBox">
                        <input
                            type="password"
                            required
                            value={senha}
                            onChange={(e) => setSenha(e.target.value)}
                        />
                        <span>Password</span>
                        <i></i>
                    </div>
                    <div className="links">
                        <a href="#">Recuperar senha</a>
                        <a href="/register">Criar usuário</a>
                    </div>
                    <input type="submit" value="Login" />
                </form>
            </div>
        </div>
    );
}
