export default function Register() {
    return (
        <div className="w-full min-h-screen flex items-center justify-center align-middle bg-slate-900">
            <div className="box-register">
                <form id="register-form" autoComplete="off" method="post">
                    <h1>Cadastro</h1>

                    <div className="inputBox">
                        <input type="text" required="required" />
                        <span>Nome Completo</span>
                        <i></i>
                    </div>

                    <div className="inputBox">
                        <input type="email" required="required" />
                        <span>Email</span>
                        <i></i>
                    </div>

                    <div className="inputBox">
                        <input type="number" required="required" />
                        <span>Telefone</span>
                        <i></i>
                    </div>

                    <div className="inputBox">
                        <input type="password" required="required" />
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
