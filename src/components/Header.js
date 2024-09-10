export default function Header() {
    return (
        <header className="fixed z-10 w-full bg-slate-600 flex justify-between py-2 px-4 items-center shadow-md">
            <h2 className="text-lg">Olá, Rebert!</h2>
            <div className="flex items-center">
                <p className="mr-4">Dúvidas ao utilizar o painel de controle?</p>
                <button className="bg-orange-500 text-white px-4 py-2 rounded">Fale com nosso suporte</button>
            </div>
        </header>
    )
}