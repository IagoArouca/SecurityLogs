import { useState, useEffect } from "react";
import { ShieldCheck, ShieldAlert, Globe, Users, Search, Activity, Loader2 } from "lucide-react";
import { useInView } from 'react-intersection-observer'; 
import { generateMockLogs } from "../services/mockSecurityService";
import type { SecurityLog } from "../@types/security";
import { BarChart, PieChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Pie, Cell, Legend } from 'recharts'
import { Navbar } from '../components/Navbar';

export default function Dashboard() {
    const [logs, setLogs] = useState<SecurityLog[]>([]);
    const [filter, setFilter] = useState('');

    const [page, setPage] = useState(1);
    const LOGS_PER_PAGE = 15;
    const { ref, inView } = useInView({ threshold: 0.1 });

    useEffect(() => {
        const data = generateMockLogs(500); 
        setLogs(data);
    }, []);


    const allFilteredLogs = logs.filter(log =>
        log.userEmail.toLowerCase().includes(filter.toLowerCase())
    );

    const visibleLogs = allFilteredLogs.slice(0, page * LOGS_PER_PAGE);

    useEffect(() => {
        if (inView && visibleLogs.length < allFilteredLogs.length) {
            setPage(prev => prev + 1);
        }
    }, [inView]);

    useEffect(() => {
        setPage(1);
    }, [filter]);
    // ----------------------------------------------

    const stats = {
        total: logs.length,
        failed: logs.filter(l => l.event === 'LOGIN_FAILED').length,
        countries: new Set(logs.map(l => l.location)).size,
        critical: logs.filter(l => l.severity === 'HIGH').length,
    }

    const severityData = [
        { name: 'Baixa', value: logs.filter(l => l.severity === 'LOW').length, color: '#94a3b8' },
        { name: 'Média', value: logs.filter(l => l.severity === 'MEDIUM').length, color: '#fbbf24' },
        { name: 'Alta', value: logs.filter(l => l.severity === 'HIGH').length, color: '#f59e0b' },
        { name: 'Crítica', value: logs.filter(l => l.severity === 'CRITICAL').length, color: '#ef4444' },
    ];

    const eventData = [
        { name: 'Sucesso', total: logs.filter(l => l.event === 'LOGIN_SUCESS').length },
        { name: 'Falha', total: logs.filter(l => l.event === 'LOGIN_FAILED').length },
        { name: 'Logout', total: logs.filter(l => l.event === 'LOGOUT').length },
    ];

    return (
        <div className="min-h-screen bg-[#0f172a] text-slate-200">
            <Navbar />
            
            <main className="p-4 md:p-8 max-w-7xl mx-auto">
                <header className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-white tracking-tight flex items-center gap-2">
                            <Activity className="text-amber-500" />
                             <span className="text-amber-500">Analytics</span>
                        </h1>
                        <p className="text-slate-400">Monitoramento de auditoria em tempo real</p>
                    </div>
                    <div className="bg-slate-800/40 border border-slate-700 px-4 py-2 rounded-2xl backdrop-blur-md">
                        <span className="text-xs font-bold uppercase tracking-widest text-slate-500">Status: </span>
                        <span className="text-xs font-bold text-green-400 uppercase tracking-tighter">Ativo</span>
                    </div>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <StatCard title="Total de Acessos" value={stats.total} icon={<Users size={20} />} color="amber" />
                    <StatCard title="Falhas de Login" value={stats.failed} icon={<ShieldAlert size={20} />} color="red" />
                    <StatCard title="Países Ativos" value={stats.countries} icon={<Globe size={20} />} color="blue" />
                    <StatCard title="Alertas Críticos" value={stats.critical} icon={<ShieldCheck size={20} />} color="orange" />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                    <div className="bg-slate-900/50 p-6 rounded-3xl border border-white/5 backdrop-blur-sm h-80">
                         <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={eventData}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1e293b" />
                                <XAxis dataKey="name" stroke="#64748b" fontSize={12} />
                                <YAxis stroke="#64748b" fontSize={12} />
                                <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '12px' }} />
                                <Bar dataKey="total" fill="#fbbf24" radius={[6, 6, 0, 0]} barSize={40} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="bg-slate-900/50 p-6 rounded-3xl border border-white/5 backdrop-blur-sm h-80">
                         <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie data={severityData} innerRadius={70} outerRadius={90} paddingAngle={8} dataKey="value">
                                    {severityData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />)}
                                </Pie>
                                <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '12px' }} />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="bg-slate-900/50 rounded-3xl border border-white/5 backdrop-blur-sm overflow-hidden">
                    <div className="p-6 border-b border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <h2 className="text-lg font-bold text-white">Logs de Auditoria</h2>
                        <div className="relative group">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                            <input 
                                type="text"
                                placeholder="Filtrar por e-mail..."
                                className="pl-10 pr-4 py-2 bg-slate-800/50 border border-slate-700 rounded-xl outline-none focus:ring-2 focus:ring-amber-500/50 w-full md:w-80 text-sm text-white"
                                value={filter}
                                onChange={(e) => setFilter(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-white/5 text-slate-400 text-xs uppercase tracking-[0.2em] font-semibold">
                                    <th className="px-6 py-4">Evento</th>
                                    <th className="px-6 py-4">Usuário</th>
                                    <th className="px-6 py-4">Localização / IP</th>
                                    <th className="px-6 py-4">Severidade</th>
                                    <th className="px-6 py-4 text-right">Data</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {visibleLogs.map((log) => (
                                    <tr key={log.id} className="hover:bg-white/[0.02] transition-colors group">
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex items-center px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest ${
                                                log.event === 'LOGIN_SUCESS' ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 
                                                log.event === 'LOGIN_FAILED' ? 'bg-red-500/10 text-red-400 border border-red-500/20' : 
                                                'bg-slate-500/10 text-slate-400 border border-slate-500/20'
                                            }`}>
                                                {log.event.replace('_', ' ')}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="text-sm font-medium text-slate-200">{log.userEmail}</div>
                                            <div className="text-[10px] text-slate-500 mt-1">{log.userAgent}</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="text-sm text-slate-300">{log.location}</div>
                                            <div className="text-xs text-slate-500 font-mono">{log.ip}</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <SeverityBadge severity={log.severity} />
                                        </td>
                                        <td className="px-6 py-4 text-right text-xs text-slate-500 font-mono">
                                            {new Date(log.createdAt).toLocaleString('pt-PT')}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        <div ref={ref} className="p-10 flex justify-center items-center w-full border-t border-white/5">
                            {visibleLogs.length < allFilteredLogs.length ? (
                                <div className="flex items-center gap-2 text-amber-500/50 font-bold text-xs uppercase tracking-[0.2em]">
                                    <Loader2 className="animate-spin" size={16} />
                                    Carregando registros...
                                </div>
                            ) : (
                                <div className="text-slate-600 text-[10px] font-black uppercase tracking-[0.3em]">
                                    Base de dados completa
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    ) 
}

function SeverityBadge({ severity }: {severity: string}) {
    const styles: any = {
        LOW: "bg-slate-800 text-slate-400 border-slate-700",
        MEDIUM: "bg-amber-900/30 text-amber-500 border-amber-800/50",
        HIGH: "bg-orange-900/30 text-orange-500 border-orange-800/50",
        CRITICAL: "bg-red-900/30 text-red-400 border-red-800/50",
    };
    return (
        <span className={`px-2 py-1 rounded-md text-[9px] font-black border tracking-tighter ${styles[severity]}`}>
            {severity}
        </span>
    )
}

function StatCard({ title, value, icon, color}: any) {
    const colors: any = {
        amber: "text-amber-500 bg-amber-500/10 border-amber-500/20",
        red: "text-red-500 bg-red-500/10 border-red-500/20",
        blue: "text-blue-500 bg-blue-500/10 border-blue-500/20",
        orange: "text-orange-500 bg-orange-500/10 border-orange-500/20",
    };
    return (
        <div className="bg-slate-900/50 p-6 rounded-3xl border border-white/5 backdrop-blur-sm group hover:border-amber-500/30 transition-all">
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">{title}</p>
                    <p className="text-3xl font-black text-white mt-1 group-hover:text-amber-500 transition-colors">{value}</p>
                </div>
                <div className={`p-3 rounded-2xl border ${colors[color]}`}>
                    {icon}
                </div>
            </div>
        </div>
    );
}