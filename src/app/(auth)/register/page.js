'use client';
import { useState, useEffect } from 'react';
import SHA256 from 'crypto-js/sha256';
import { useRouter } from 'next/navigation';

export default function Register() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        nome: '',
        email: '',
        telefone: '',
        senha: ''
    });

    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [isFormValid, setIsFormValid] = useState(false);

    // Função para validar o formulário
    const validate = () => {
        let tempErrors = {};
        if (!formData.nome) tempErrors.nome = 'Nome é obrigatório';
        if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) tempErrors.email = 'Email inválido';
        if (!formData.telefone || formData.telefone.length < 12) tempErrors.telefone = 'Telefone inválido (mínimo 12 dígitos)';
        if (!formData.senha) {
            tempErrors.senha = 'A senha é obrigatória';
        } else if (formData.senha.length < 8) {
            tempErrors.senha = 'A senha deve ter pelo menos 8 caracteres';
        }
        
        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0; // Retorna verdadeiro se não houver erros
    };

    // Função para manipular as mudanças nos campos do formulário
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
        // Valida após cada mudança
        validate();
    };

    // useEffect para verificar a validade do formulário sempre que formData mudar
    useEffect(() => {
        setIsFormValid(validate());
    }, [formData]);

    // Função para lidar com o envio do formulário
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Se a validação falhar, interrompe o processo
        if (!isFormValid) return;

        setLoading(true);
        const hashedPassword = SHA256(formData.senha).toString();
        const formDataWithHash = { ...formData, senha: hashedPassword };

        try {
            const response = await fetch('http://localhost:8000/api/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formDataWithHash),
            });

            const data = await response.json();

            if (response.ok) {
                alert('Cadastro realizado com sucesso!');
                router.push('/login');
            } else {
                // Atualiza os erros para que sejam exibidos
                setErrors({ api: data.message });
            }
        } catch (error) {
            console.error('Erro ao enviar os dados:', error);
            alert('Erro ao cadastrar, tente novamente mais tarde.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full min-h-screen flex items-center justify-center align-middle bg-slate-900">
            <div className="box-register">
                <form id="register-form" autoComplete="off" onSubmit={handleSubmit}>
                    <h1>Cadastro</h1>

                    <div className="inputBox">
                        <input
                            type="text"
                            name="nome"
                            value={formData.nome}
                            onChange={handleChange}
                            required
                            className="input"
                        />
                        <span>Nome Completo</span>
                        <i></i>
                    </div>

                    <div className="inputBox">
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="input"
                        />
                        <span>Email</span>
                        <i></i>
                    </div>

                    <div className="inputBox">
                        <input
                            type="tel"
                            name="telefone"
                            value={formData.telefone}
                            onChange={handleChange}
                            required
                            className="input"
                        />
                        <span>Telefone</span>
                        <i></i>
                    </div>

                    <div className="inputBox">
                        <input
                            type="password"
                            name="senha"
                            value={formData.senha}
                            onChange={handleChange}
                            required
                            className="input"
                        />
                        <span>Senha</span>
                        <i></i>
                    </div>

                    <div className="links">
                        <a href="/login">Já tem uma conta? Login</a>
                    </div>

                    <div className="error-messages mt-4">
                        {/* Exibe erros de validação do formulário */}
                        {Object.values(errors).map((error, index) => (
                            <p key={index} className="text-red-500">{error}</p>
                        ))}
                    </div>

                    <button
                        type="submit"
                        className={`btn text-gray-500 ${loading ? 'opacity-50' : (isFormValid ? 'text-orange-500' : 'text-gray-400')} mt-4`}
                        disabled={loading || !isFormValid}>
                        {loading ? 'Cadastrando...' : 'Cadastrar'}
                    </button>
                </form>
            </div>
        </div>
    );
}
