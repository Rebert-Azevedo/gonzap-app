'use client';
import { useState } from 'react';
import { useRouter } from 'next/router'; // Para redirecionamento
import SHA256 from 'crypto-js/sha256'; 
import { useUser } from '@/components/UserContext'; // Importando o UserContext para salvar o usuário

export default function Login() {
    const { setUser } = useUser(); // Pega a função para definir o usuário no contexto
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const router = useRouter(); // Hook do Next.js para redirecionamento

    const handleLogin = async (e) => {
        e.preventDefault();

        // Hashing da senha antes de enviar
        const hashedPassword = SHA256(senha).toString();

        try {
            const response = await fetch('http://localhost:8000/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 
                    email: email,
                    senha: hashedPassword // Envia a senha com hash
                })
            });

            const data = await response.json();

            if (response.ok) {
                // Atualizando o usuário logado no contexto
                setUser({ name: data.name, email: data.email });

                alert('Login realizado com sucesso!');
                router.push('/dashboard'); // Redireciona para o dashboard
            } else {
                alert('Credenciais incorretas: ' + data.message);
            }
        } catch (error) {
            console.error('Erro ao verificar o login:', error);
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
