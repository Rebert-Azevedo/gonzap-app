export default function Login() {
    return (
        <div className="w-full min-h-screen flex items-center justify-center align-middle bg-slate-900">
            <div class="box">
                <form id="login-form" autocomplete="off" method="get">
                    <h1>Login</h1>
                    <div class="inputBox">
                        <input type="text" required="required" />
                        <span>Email</span>
                        <i></i>
                    </div>
                    <div class="inputBox">
                        <input type="password" required="required" />
                        <span>Password</span>
                        <i></i>
                    </div>
                    <div class="links">
                        <a href="#">Forgot Password ?</a>
                        <a href="../register/register.html">Signup</a>
                    </div>
                    <input type="submit" value="Login" />
                </form>
            </div>
        </div>
    )
}