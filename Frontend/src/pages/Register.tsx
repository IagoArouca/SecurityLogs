import { useState } from "react";
import { Eye, EyeOff, Lock, Mail, User, Loader2, ArrowLeft, ShieldCheck } from 'lucide-react';
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
            
            toast.success("Conta criada com sucesso! Faça login.");
            navigate('/'); 
        } catch (error: any) {
            toast.error(error.response?.data?.message || "Erro ao criar conta. Tente outro e-mail.");
        } finally {
            setLoading(false);
        }
    }

    return (

        <div className="min-h-screen w-full flex items-center justify-center bg-[#0f172a] bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-slate-800 via-slate-900 to-slate-950 px-4">

            <div className="w-full max-w-md bg-white/5 backdrop-blur-lg rounded-3xl shadow-2xl p-8 border border-white/10 my-8">
                
                <div className="mb-6">
                    <Link to="/" className="text-sm text-amber-500 flex items-center gap-2 hover:text-amber-400 transition-colors font-medium group">
                        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> 
                        Voltar para o login
                    </Link>
                </div>

                <div className="text-center mb-8">
                    <div className="bg-amber-500 w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-amber-500/20">
                        <ShieldCheck className="text-slate-900" size={24} />
                    </div>
                    <h1 className="text-3xl font-bold text-white tracking-tight">Criar Conta</h1>
                    <p className="text-slate-400 mt-2">Cadastre-se no sistema Lemur</p>
                </div>

                <form onSubmit={handleRegister} className="space-y-4">
                    
                    <div className="space-y-1.5">
                        <label className="text-sm font-medium text-slate-300 ml-1">Nome Completo</label>
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500 group-focus-within:text-amber-500 transition-colors">
                                <User size={18} />
                            </div>
                            <input
                                name="name"
                                type="text"
                                required
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Como devemos te chamar?"
                                className="block w-full pl-12 pr-4 py-3 bg-slate-800/50 border border-slate-700 rounded-2xl text-white placeholder-slate-500 focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 outline-none transition-all"
                            />
                        </div>
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-sm font-medium text-slate-300 ml-1">E-mail</label>
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500 group-focus-within:text-amber-500 transition-colors">
                                <Mail size={18} />
                            </div>
                            <input
                                name="email"
                                type="email"
                                required
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="seu@email.com"
                                className="block w-full pl-12 pr-4 py-3 bg-slate-800/50 border border-slate-700 rounded-2xl text-white placeholder-slate-500 focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 outline-none transition-all"
                            />
                        </div>
                    </div>
                    <div className="space-y-1.5">
                        <label className="text-sm font-medium text-slate-300 ml-1">Senha</label>
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500 group-focus-within:text-amber-500 transition-colors">
                                <Lock size={18} />
                            </div>
                            <input
                                name="password"
                                type={showPassword ? "text" : "password"}
                                required
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="••••••••"
                                className="block w-full pl-12 pr-12 py-3 bg-slate-800/50 border border-slate-700 rounded-2xl text-white placeholder-slate-500 focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 outline-none transition-all"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-500 hover:text-amber-500 transition-colors"
                            >
                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-sm font-medium text-slate-300 ml-1">Confirmar Senha</label>
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500 group-focus-within:text-amber-500 transition-colors">
                                <Lock size={18} />
                            </div>
                            <input
                                name="confirmPassword"
                                type={showPassword ? "text" : "password"}
                                required
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                placeholder="Repita a senha"
                                className="block w-full pl-12 pr-4 py-3 bg-slate-800/50 border border-slate-700 rounded-2xl text-white placeholder-slate-500 focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 outline-none transition-all"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold py-4 px-4 rounded-2xl transition-all shadow-xl shadow-amber-500/10 flex items-center justify-center gap-2 disabled:opacity-70 mt-6"
                    >
                        {loading ? (
                            <>
                                <Loader2 className="animate-spin" size={20} />
                                Criando acesso...
                            </>
                        ) : (
                            "Finalizar Cadastro"
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
}