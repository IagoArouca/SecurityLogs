import { useState, useEffect } from "react";
import { ShieldCheck, ShieldAlert, Globe, Users  } from "lucide-react";
import { generateMockLogs } from "../services/mockSecurityService";
import type { SecurityLog } from "../@types/security";
import { BarChart, PieChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Pie, Cell, Legend} from 'recharts'
import { Navbar } from '../components/Navbar';

export default function Dashboard() {
    const [logs, setLogs] = useState<SecurityLog[]>([]);
    const [filter, setFilter] = useState('')

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

    const filteredLogs = logs.filter(log =>
        log.userEmail.toLowerCase().includes(filter.toLowerCase())
    );

    const severityData = [
        { name: 'Baixa', value: logs.filter(l => l.severity === 'LOW').length, color: '#3b82f6' },
        { name: 'Média', value: logs.filter(l => l.severity === 'MEDIUM').length, color: '#eab308' },
        { name: 'Alta', value: logs.filter(l => l.severity === 'HIGH').length, color: '#f97316' },
        { name: 'Crítica', value: logs.filter(l => l.severity === 'CRITICAL').length, color: '#ef4444' },
    ];

    const eventData = [
        { name: 'Sucesso', total: logs.filter(l => l.event === 'LOGIN_SUCESS').length },
        { name: 'Falha', total: logs.filter(l => l.event === 'LOGIN_FAILED').length },
        { name: 'Logout', total: logs.filter(l => l.event === 'LOGOUT').length },
    ];

    return (
        <>
        <Navbar />
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


            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <h3 className="text-gray-700 font-bold mb-6">Distribuição de Eventos</h3>
                    <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={eventData}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="total" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <h3 className="text-gray-700 font-bold mb-6">Níveis de Severidade</h3>
                    <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                        <Pie
                            data={severityData}
                            innerRadius={60}
                            outerRadius={80}
                            paddingAngle={5}
                            dataKey="value"
                        >
                            {severityData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                    </div>
                </div>
                </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <h2 className="text-lg font-bold text-gray-800">Logs de Auditoria</h2>
            
            <div className="relative">
                <input 
                type="text"
                placeholder="Filtrar por e-mail..."
                className="pl-4 pr-10 py-2 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 w-full md:w-64 transition-all"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                />
            </div>
            </div>

            <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
                <thead>
                <tr className="bg-gray-50/50 text-gray-500 text-xs uppercase tracking-wider">
                    <th className="px-6 py-4 font-semibold">Evento</th>
                    <th className="px-6 py-4 font-semibold">Usuário</th>
                    <th className="px-6 py-4 font-semibold">Localização / IP</th>
                    <th className="px-6 py-4 font-semibold">Severidade</th>
                    <th className="px-6 py-4 font-semibold text-right">Data</th>
                </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                {filteredLogs.map((log) => (
                    <tr key={log.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        log.event === 'LOGIN_SUCESS' ? 'bg-green-100 text-green-700' : 
                        log.event === 'LOGIN_FAILED' ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-700'
                        }`}>
                        {log.event.replace('_', ' ')}
                        </span>
                    </td>
                    <td className="px-6 py-4">
                        <div className="text-sm font-medium text-gray-900">{log.userEmail}</div>
                        <div className="text-xs text-gray-400">{log.userAgent}</div>
                    </td>
                    <td className="px-6 py-4">
                        <div className="text-sm text-gray-600 font-medium">{log.location}</div>
                        <div className="text-xs text-gray-400">{log.ip}</div>
                    </td>
                    <td className="px-6 py-4">
                        <SeverityBadge severity={log.severity} />
                    </td>
                    <td className="px-6 py-4 text-right text-sm text-gray-500 font-mono">
                        {new Date(log.createdAt).toLocaleString('pt-PT')}
                    </td>
                    </tr>
                ))}
                </tbody>
            </table>
            </div>
        </div>
            </div>
            </>
        ) 
};

function SeverityBadge({ severity }: {severity: string}) {
    const styles: any = {
    LOW: "bg-blue-100 text-blue-800",
    MEDIUM: "bg-yellow-100 text-yellow-800",
    HIGH: "bg-orange-100 text-orange-800",
    CRITICAL: "bg-red-100 text-red-800",
  };

  return (
    <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${styles[severity]}`}>
      {severity}
    </span>
  )
}

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