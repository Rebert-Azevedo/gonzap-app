'use client'
import { useState } from 'react';
import SHA256 from 'crypto-js/sha256'; // Importa a função de hash

export default function Register() {
    const [formData, setFormData] = useState({
        nome: '',
        email: '',
        telefone: '',
        senha: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); // Impede o comportamento padrão

        // Hashing da senha usando SHA-256
        const hashedPassword = SHA256(formData.senha).toString(); 
        
        // Cria um novo objeto com os dados, substituindo a senha pelo hash
        const formDataWithHash = {
            ...formData,
            senha: hashedPassword
        };

        try {
            const response = await fetch('http://localhost:8000/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formDataWithHash), // Envia a senha com hash
            });

            const data = await response.json();

            if (response.ok) {
                alert('Cadastro realizado com sucesso!');
                // Aqui você pode redirecionar o usuário ou limpar o formulário
            } else {
                alert('Erro ao cadastrar: ' + data.message);
            }
        } catch (error) {
            console.error('Erro ao enviar os dados:', error);
            alert('Erro ao cadastrar, tente novamente mais tarde.');
        }
    };

    return (
        <div className="w-full min-h-screen flex items-center justify-center align-middle bg-slate-900">
            <div className="box-register">
                <form id="register-form" autoComplete="off" onSubmit={handleSubmit}>
                    <h1>Cadastro</h1>

                    <div className="inputBox">
                        <input type="text" name="nome" required onChange={handleChange} />
                        <span>Nome Completo</span>
                        <i></i>
                    </div>

                    <div className="inputBox">
                        <input type="email" name="email" required onChange={handleChange} />
                        <span>Email</span>
                        <i></i>
                    </div>

                    <div className="inputBox">
                        <input type="number" name="telefone" required onChange={handleChange} />
                        <span>Telefone</span>
                        <i></i>
                    </div>

                    <div className="inputBox">
                        <input type="password" name="senha" required onChange={handleChange} />
                        <span>Senha</span>
                        <i></i>
                    </div>

                    <div className="links">
                        <a href="/login">Já tem uma conta? Login</a>
                    </div>

                    <input type="submit" value="Cadastrar" />
                </form>
            </div>
        </div>
    );
}
