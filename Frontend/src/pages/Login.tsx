import { useState,  } from "react";
import { Eye, EyeOff, Lock, Mail } from 'lucide-react';
import type {ChangeEvent, FormEvent} from "react"
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import toast from "react-hot-toast";

export default function Login(){
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const { signIn} = useAuth();
    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const handleChange = (e:ChangeEvent<HTMLInputElement>) => {
        const {name,  value} = e.target;
        setFormData(prev => ({...prev, [name]: value }))
    }

    const handleLogin = async (e: FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            await signIn(formData);
            navigate('/dashboard')
        } catch (error: any) {
            toast.error(error.response?.data?.message || "Credenciais inválidas" )
        } finally {
            setLoading(false);
        }        
    } 

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-gray-50 px-4">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 border border-gray-100 ">
                <div className="text-center mb-10">
                    <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Bem vindo de volta</h1>
                    <p className="text-gray-500 mt-2">Insira seus dados para acessar a plataforma</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-6">
                    {/*Grupo EMAIL*/}
                    <div className="space-y-1">
                        <label className="text-sm font-semibold text-gray-700 ml-1">E-mail</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                                <Mail size={18} />
                            </div>
                            <input 
                            name="email"
                            type="email"
                            required
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="seu@email.com"
                            className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all bg-gray-50/50"    
                            />
                        </div>
                    </div>


                    {/* Grupo Senha */}

                    <div className="space-y-1">
                        <label className="text-sm font-semibold text-gray-700 ml-1">Senha</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                                <Lock size={18} />
                            </div>
                            <input 
                            name="password"
                            type="password"
                            required
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="ººººººººººº"
                            className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all bg-gray-50/50"    
                            />
                        </div>
                    </div>

                    
                </form>
            </div>
        </div>
    )

    
}
