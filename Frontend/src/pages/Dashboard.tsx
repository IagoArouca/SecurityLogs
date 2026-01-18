import { useState, useEffect } from "react";
import { ShieldCheck, ShieldAlert, Globe, Users  } from "lucide-react";
import { generateMockLogs } from "../services/mockSecurityService";
import type { SecurityLog } from "../@types/security";

export default function Dashboard() {
    const [logs, setLogs] = useState<SecurityLog[]>([]);

    useEffect(() => {
        const data = generateMockLogs(100);
        setLogs(data);
    }, []);

    const stats = {
        total: logs.length,
        failed: logs.filter(l => l.event === 'LOGIN_FAILED').length,
        countries: new Set(logs.map(l => l.location)).size,
        critical: logs.filter(l => l.severity === 'HIGH').length,
    }

    return (
        <div className="p-8 bg-gray-50 min-h-screen">
            <header className="mb-8">
                <h1 className="text-2xl font-bold text-gray-800">Analytics de Segurança</h1>
                <p className="text-gray-500">Monitoramento de acessos em tempo real</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard title="Total de Acessos" value={stats.total} icon={<Users size={24} color="blue" />} />
                <StatCard title="Falhas de Login" value={stats.failed} icon={<ShieldAlert size={24}/>} color="orange" />
                <StatCard title="Países Ativos" value={stats.countries} icon={<Globe size={24}/>} color="green" />
                <StatCard title="Alertas Críticos" value={stats.critical} icon={<ShieldCheck size={24}/>} color="red" />
            </div>
        </div>
    ) 
};

function StatCard({ title, value, icon, color}: any) {
    const colors: any = {
        blue: "bg-blue-50 text-blue-600",
        orange: "bg-orange-50 text-orange-600",
        green: "bg-green-50 text-green-600",
        red: "bg-red-50 text-red-600",
    };

    return (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm font-medium text-gray-500">{title}</p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
                </div>
                <div className={`p-3 rounded-xl ${colors[color]}`}>
                    {icon}
                </div>
            </div>
        </div>
    );
}