import {createContext, useEffect, useState } from "react";
import api from "../services/api";
import type {ReactNode} from 'react'
import type { User, LoginResponse } from "../@types/auth";


interface AuthContextData {
    user: User | null;
    signed: boolean;
    loading: boolean;
    signIn(credentials: object): Promise<void>;
}

interface AuthProviderProps {
    /** Componentes que terão acesso aos dados de autenticação */
    children: ReactNode
}

export const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider = ({ children }: AuthProviderProps) => {

    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        function loadStorageData() {
            const storageUser = localStorage.getItem('@App:user');
            const storageToken = localStorage.getItem('@App:token');

            if (storageUser && storageToken ) {
                setUser(JSON.parse(storageUser));
                api.defaults.headers.Authorization = `Bearer ${storageToken}`;
            }

            setLoading(false);
        }

        loadStorageData();
    }, []);



    async function signIn(credentials: object) {
        const response = await api.post<LoginResponse>('/login', credentials);
        const { token, user: userResponse } = response.data;

        setUser(userResponse);
        api.defaults.headers.Authorization = `Bearer ${token}`;
        localStorage.setItem('@App:token', token);
        localStorage.setItem('@App:user', JSON.stringify(userResponse));
    }

    return (
        <AuthContext.Provider value={{signed: !!user, user, loading, signIn}}>
            {children}
        </AuthContext.Provider>
    )

}