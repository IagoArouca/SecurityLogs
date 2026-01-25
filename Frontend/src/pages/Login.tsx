import { useState } from "react";
import { Eye, EyeOff, Lock, Mail, Loader2, Fingerprint } from 'lucide-react'; 
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
            toast.success("Bem-vindo ao Lemur Analytics!"); 
            navigate('/dashboard');
        } catch (error: any) {
            toast.error(error.response?.data?.message || "Credenciais inválidas");
        } finally {
            setLoading(false);
        }
    }

    return (

        <div className="min-h-screen w-full flex items-center justify-center bg-[#0f172a] bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-slate-800 via-slate-900 to-slate-950 px-4">

            <div className="w-full max-w-md bg-white/5 backdrop-blur-lg rounded-3xl shadow-2xl p-8 border border-white/10">
                
                <div className="text-center mb-10">
                    <div className="bg-amber-500 w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-amber-500/20 ring-4 ring-amber-500/10">
                        <Fingerprint className="text-slate-900" size={28} />
                    </div>
                    <h1 className="text-3xl font-bold text-white tracking-tight">Lemur <span className="text-amber-500">Analytics</span></h1>
                    <p className="text-slate-400 mt-2">Vigilância e precisão em cada log.</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-6">

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-300 ml-1">E-mail corporativo</label>
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
                                className="block w-full pl-12 pr-4 py-3.5 bg-slate-800/50 border border-slate-700 rounded-2xl text-white placeholder-slate-500 focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 outline-none transition-all"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-300 ml-1">Senha de acesso</label>
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
                                className="block w-full pl-12 pr-12 py-3.5 bg-slate-800/50 border border-slate-700 rounded-2xl text-white placeholder-slate-500 focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 outline-none transition-all"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-500 hover:text-amber-500 transition-colors"
                            >
                                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold py-4 px-4 rounded-2xl transition-all shadow-xl shadow-amber-500/10 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed mt-4"
                    >
                        {loading ? (
                            <>
                                <Loader2 className="animate-spin" size={20} />
                                Verificando...
                            </>
                        ) : (
                            "Acessar Painel"
                        )}
                    </button>
                </form>

                <div className="mt-8 text-center space-y-4">
                    <p className="text-sm text-slate-400">
                        Não tem uma conta?{" "}
                        <Link to="/register" className="text-amber-500 font-bold hover:text-amber-400 transition-colors">
                            Criar conta agora
                        </Link>
                    </p>

                    <p className="text-xs text-slate-500 border-t border-slate-800 pt-4 uppercase tracking-widest">
                        Lemur Monitoring System &copy; 2026
                    </p>
                </div>
            </div>
        </div>
    );
}