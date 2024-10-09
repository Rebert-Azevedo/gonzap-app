'use client'
import { useState } from 'react';

export default function Login() {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:8000/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 
                    email: email,
                    senha: senha // Envia a senha diretamente
                })
            });

            // Verificar o status da resposta
            if (response.ok) {
                const data = await response.json();
                // Armazena o token JWT localmente
                localStorage.setItem('token', data.token);
                alert('Login realizado com sucesso!');
                window.location.href = '/dashboard'; // Redirecionamento
            } else {
                const errorData = await response.json();
                alert('Erro de autenticação: ' + errorData.message);
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
                        <a href="#">Forgot Password?</a>
                        <a href="/register">Signup</a>
                    </div>
                    <input type="submit" value="Login" />
                </form>
            </div>
        </div>
    );
}
