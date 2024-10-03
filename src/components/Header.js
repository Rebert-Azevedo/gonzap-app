export default function Header() {
    return (
        <header className="fixed z-10 w-full bg-orange-900 flex justify-between py-2 px-4 items-center shadow-md">
            <h2 className="text-lg">Olá, Rebert!</h2>
            <div className="flex items-center">
                <p className="mr-4">Dúvidas ao utilizar o painel de controle?</p>
                <button className="bg-slate-800 text-white px-4 py-2 rounded">Fale com nosso suporte</button>
            </div>
        </header>
    )
}