import { createContext, useState, useContext } from 'react';

// Cria o contexto do usuário
const UserContext = createContext();

// Componente Provider que envolve a aplicação
export function UserProvider({ children }) {
    const [user, setUser] = useState(null); // Estado para o usuário logado

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
}

// Hook para acessar o contexto
export function useUser() {
    return useContext(UserContext);
}
