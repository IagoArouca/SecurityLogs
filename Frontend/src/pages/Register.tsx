import { useState } from "react";
import { Eye, EyeOff, Lock, Mail, User, Loader2, ArrowLeft, ShieldCheck, Smartphone } from 'lucide-react';
import type { ChangeEvent, FormEvent } from "react"
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../services/api"; 

export default function Register() {
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleRegister = async (e: FormEvent) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            return toast.error("As senhas não coincidem!");
        }

        setLoading(true);

        try {
            await api.post('/users', { 
                name: formData.name, 
                email: formData.email, 
                password: formData.password 
            });
            
            toast.success("Credenciais registradas com sucesso!");
            navigate('/'); 
        } catch (error: any) {
            toast.error(error.response?.data?.message || "Erro ao criar conta.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-[#111418] relative overflow-hidden font-sans py-12">
            
            {/* BACKGROUND: Grid e Círculo (Igual ao Login) */}
            <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#30363d_1px,transparent_1px),linear-gradient(to_bottom,#30363d_1px,transparent_1px)] bg-[size:30px_30px]" />
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
                <div className="w-[600px] h-[600px] border-[50px] border-slate-700/30 rounded-full border-dotted -rotate-12" />
            </div>

            <div className="relative z-10 w-full max-w-[460px] px-6">
                
                {/* Barras de Dados Laterais */}
                <div className="absolute -left-12 top-1/2 space-y-2 opacity-60 hidden md:block">
                    {[80, 50, 110].map((w, i) => (
                        <div key={i} style={{ width: w }} className="h-[2px] bg-amber-600/60 rounded-full" />
                    ))}
                </div>
                <div className="absolute -right-12 top-1/3 space-y-2 opacity-60 hidden md:block transform scale-x-[-1]">
                    {[60, 120, 70].map((w, i) => (
                        <div key={i} style={{ width: w }} className="h-[2px] bg-amber-600/60 rounded-full" />
                    ))}
                </div>

                <div className="bg-[#161b22] rounded-[2.5rem] p-10 shadow-[0_0_50px_rgba(0,0,0,0.5)] border border-white/5">
                    
                    {/* Botão Voltar */}
                    <Link to="/" className="inline-flex items-center gap-2 text-xs text-slate-500 hover:text-amber-500 transition-colors mb-8 group uppercase tracking-widest font-bold">
                        <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
                        Voltar
                    </Link>

                    {/* Header: Ícone Shield com Glow */}
                    <div className="text-center mb-10">
                        <div className="relative inline-block mb-6">
                            <div className="absolute inset-0 bg-amber-500/20 blur-2xl rounded-full" />
                            <div className="relative w-16 h-16 bg-[#21262d] border border-slate-700 rounded-2xl flex items-center justify-center shadow-2xl">
                                <ShieldCheck className="text-amber-500" size={28} />
                            </div>
                        </div>
                        <h1 className="text-3xl font-bold text-white tracking-tight">Criar <span className="text-amber-500/90 font-semibold">Conta</span></h1>
                        <p className="text-slate-500 text-[11px] mt-2 font-medium tracking-wide uppercase">Registro de novo operador Lemur</p>
                    </div>

                    <form onSubmit={handleRegister} className="space-y-4">
                        
                        <div className="space-y-1.5">
                            <label className="text-[10px] text-slate-400 font-bold ml-4 uppercase tracking-widest">Nome Completo</label>
                            <div className="relative">
                                <User className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
                                <input
                                    name="name"
                                    type="text"
                                    required
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Ex: Usuario"
                                    className="w-full pl-12 pr-4 py-3 bg-[#2d333b] border-transparent rounded-full text-white text-sm placeholder-slate-600 focus:bg-[#30363d] transition-all outline-none"
                                />
                            </div>
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-[10px] text-slate-400 font-bold ml-4 uppercase tracking-widest">E-mail</label>
                            <div className="relative">
                                <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
                                <input
                                    name="email"
                                    type="email"
                                    required
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="email@corporativo.com"
                                    className="w-full pl-12 pr-4 py-3 bg-[#2d333b] border-transparent rounded-full text-white text-sm placeholder-slate-600 focus:bg-[#30363d] transition-all outline-none"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                            <div className="space-y-1.5">
                                <label className="text-[10px] text-slate-400 font-bold ml-4 uppercase tracking-widest">Senha</label>
                                <div className="relative">
                                    <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
                                    <input
                                        name="password"
                                        type={showPassword ? "text" : "password"}
                                        required
                                        value={formData.password}
                                        onChange={handleChange}
                                        placeholder="••••"
                                        className="w-full pl-11 pr-4 py-3 bg-[#2d333b] border-transparent rounded-full text-white text-sm placeholder-slate-600 focus:bg-[#30363d] transition-all outline-none"
                                    />
                                </div>
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-[10px] text-slate-400 font-bold ml-4 uppercase tracking-widest">Confirmar</label>
                                <div className="relative">
                                    <input
                                        name="confirmPassword"
                                        type={showPassword ? "text" : "password"}
                                        required
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        placeholder="••••"
                                        className="w-full px-5 py-3 bg-[#2d333b] border-transparent rounded-full text-white text-sm placeholder-slate-600 focus:bg-[#30363d] transition-all outline-none"
                                    />
                                    <button 
                                        type="button" 
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-600"
                                    >
                                        {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="relative flex items-center gap-2 mt-8">
                            <button
                                type="submit"
                                disabled={loading}
                                className="flex-1 bg-[#e3a651] hover:bg-[#d49540] text-slate-950 font-bold py-4 rounded-full transition-all text-sm shadow-lg shadow-amber-900/20 uppercase tracking-widest"
                            >
                                {loading ? <Loader2 className="animate-spin mx-auto" size={20} /> : "Finalizar Cadastro"}
                            </button>
                            <div className="w-14 h-14 bg-[#2d333b] border border-slate-700 rounded-full flex items-center justify-center text-slate-400 shadow-xl shrink-0">
                                <Smartphone size={20} />
                            </div>
                        </div>
                    </form>

                    <div className="mt-8 pt-6 border-t border-slate-800/50 flex flex-col items-center gap-4">
                        <div className="flex items-center gap-2 opacity-30">
                            <div className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-pulse" />
                            <span className="text-[9px] text-white uppercase tracking-[0.4em] font-medium">Lemur Security Protocol</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}