import { useState } from "react";
import { Eye, EyeOff, Lock, Mail, Loader2, Target, Smartphone } from 'lucide-react'; 
import type { ChangeEvent, FormEvent } from "react"
import { useNavigate, Link } from "react-router-dom"; 
import { useAuth } from "../hooks/useAuth";
import toast from "react-hot-toast";

export default function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const { signIn } = useAuth();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleLogin = async (e: FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await signIn(formData);
            toast.success("Acesso autorizado."); 
            navigate('/dashboard');
        } catch (error: any) {
            toast.error("Erro na autenticação corporativa.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-[#111418] relative overflow-hidden font-sans">
            
            {/* BACKGROUND: Grid e Formas Abstratas da Imagem */}
            <div className="absolute inset-0 opacity-20 bg-[linear-gradient(to_right,#2a2e35_1px,transparent_1px),linear-gradient(to_bottom,#2a2e35_1px,transparent_1px)] bg-[size:40px_40px]" />
            
            {/* Formas Circulares (Rastro atrás do card) */}
            <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
                <div className="w-[600px] h-[600px] border-[40px] border-dashed border-slate-500 rounded-full rotate-45" />
            </div>

            <div className="relative z-10 w-full max-w-[440px] px-6">
                
                {/* Barras de Dados Laterais (Saem do card como na imagem) */}
                <div className="absolute -left-16 top-1/3 space-y-2 opacity-40 hidden md:block">
                    {[60, 100, 80, 120].map((w, i) => (
                        <div key={i} style={{ width: w }} className="h-1 bg-amber-600 rounded-full" />
                    ))}
                </div>
                <div className="absolute -right-16 top-1/4 space-y-2 opacity-40 hidden md:block transform scale-x-[-1]">
                    {[80, 120, 60, 90].map((w, i) => (
                        <div key={i} style={{ width: w }} className="h-1 bg-amber-600 rounded-full" />
                    ))}
                </div>

                {/* CARD PRINCIPAL */}
                <div className="bg-[#1c2128] rounded-[2.5rem] p-10 shadow-2xl border border-slate-800/50 relative overflow-hidden">
                    
                    {/* Header com Ícone de Mira/Olho */}
                    <div className="text-center mb-10">
                        <div className="relative inline-block mb-6">
                            {/* Glow do Ícone */}
                            <div className="absolute inset-0 bg-amber-500/20 blur-2xl rounded-full" />
                            <div className="relative w-20 h-20 bg-[#2d333b] border-2 border-slate-700 rounded-[1.5rem] flex items-center justify-center shadow-inner">
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <Target className="text-amber-500/30 w-14 h-14" />
                                </div>
                                <div className="w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(245,158,11,0.4)]">
                                    <div className="w-3 h-3 bg-slate-900 rounded-full flex items-center justify-center">
                                        <div className="w-1 h-1 bg-white rounded-full" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <h1 className="text-3xl font-bold text-white tracking-tight">
                            Lemur <span className="text-amber-500">Analytics</span>
                        </h1>
                        <p className="text-slate-500 text-xs mt-2 font-medium">Vigilância e precisão em cada log.</p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-5">
                        <div className="space-y-1">
                            <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest ml-1">E-mail corporativo</label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                                <input
                                    name="email"
                                    type="email"
                                    required
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="Email corporativo"
                                    className="w-full pl-12 pr-4 py-3.5 bg-[#2d333b]/50 border border-slate-700/50 rounded-2xl text-white placeholder-slate-600 focus:border-amber-500/50 focus:ring-0 outline-none transition-all text-sm"
                                />
                            </div>
                        </div>

                        <div className="space-y-1">
                            <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest ml-1">Senha de acesso</label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                                <input
                                    name="password"
                                    type={showPassword ? "text" : "password"}
                                    required
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="Senha"
                                    className="w-full pl-12 pr-12 py-3.5 bg-[#2d333b]/50 border border-slate-700/50 rounded-2xl text-white placeholder-slate-600 focus:border-amber-500/50 focus:ring-0 outline-none transition-all text-sm"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-amber-500 transition-colors"
                                >
                                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-[#e3a651] hover:bg-[#d49540] text-slate-900 font-bold py-4 rounded-full shadow-lg shadow-amber-900/20 transition-all flex items-center justify-center gap-2 mt-4"
                        >
                            {loading ? (
                                <Loader2 className="animate-spin" size={20} />
                            ) : (
                                "Acessar"
                            )}
                            <div className="ml-2 w-6 h-6 bg-slate-900/10 rounded-full flex items-center justify-center">
                                <Smartphone size={14} />
                            </div>
                        </button>
                    </form>

                    <div className="mt-10 pt-6 border-t border-slate-800 flex flex-col items-center gap-4">
                        <div className="flex justify-between w-full text-[11px] font-bold">
                            <span className="text-slate-500 uppercase tracking-tighter">Não tem uma conta?</span>
                            <Link to="/register" className="text-amber-500 hover:underline">Criar conta agora</Link>
                        </div>
                        <div className="flex items-center gap-2 grayscale opacity-50">
                            <div className="w-2 h-2 bg-amber-500 rounded-full" />
                            <p className="text-[10px] text-slate-500 uppercase tracking-[0.3em]">Lemur Monitoring System</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}