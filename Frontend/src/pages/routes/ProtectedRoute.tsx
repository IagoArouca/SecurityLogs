import type { ReactNode } from "react";
import  {Navigate} from 'react-router-dom';
import { useAuth } from "../../hooks/useAuth";

interface ProtectedRouterProps {
    children: ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouterProps) {
    const { signed, loading } = useAuth();

    if (loading) {
        return <div>Carregando...</div>
    }

    if(!signed) {
        return <Navigate to="/login" replace/>
    }

    return <>{children}</>;
}