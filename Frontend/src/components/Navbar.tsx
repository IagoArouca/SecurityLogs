// src/components/Navbar.tsx
import { ShieldCheck, LogOut, User as UserIcon } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

export function Navbar() {
  const { signOut, user } = useAuth();

  return (
    <nav className="bg-[#0f172a]/80 backdrop-blur-md border-b border-white/5 px-8 py-4 flex items-center justify-between sticky top-0 z-50">

      <div className="flex items-center gap-3">
        <div className="bg-amber-500 p-2 rounded-xl text-slate-900 shadow-lg shadow-amber-500/20">
          <ShieldCheck size={20} strokeWidth={2.5} />
        </div>
        <div className="flex flex-col">
          <span className="font-black text-white tracking-tighter text-lg leading-none">
            LEMUR <span className="text-amber-500">Log</span>
          </span>
          <span className="text-[10px] text-slate-500 font-bold tracking-[0.2em] uppercase">
            Auditoria Ativa
          </span>
        </div>
      </div>

      <div className="flex items-center gap-4 md:gap-8">
        <div className="flex items-center gap-4 text-right border-r border-slate-800 pr-4 md:pr-8">
          <div className="hidden sm:block">
            <p className="text-sm font-bold text-slate-200">{user?.name || 'Operador'}</p>
            <p className="text-[10px] text-amber-500/80 font-black uppercase tracking-widest">
              Nível: Admin
            </p>
          </div>
          
          <div className="relative group cursor-default">
            <div className="absolute -inset-1 bg-amber-500 rounded-full opacity-20 group-hover:opacity-40 transition-opacity blur"></div>
            <div className="relative w-10 h-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center font-black text-amber-500 text-sm shadow-inner">
              {user?.name?.charAt(0).toUpperCase() || <UserIcon size={16} />}
            </div>
          </div>
        </div>

        <button 
          onClick={signOut}
          className="flex items-center gap-2 text-slate-400 hover:text-red-400 transition-all font-bold text-xs uppercase tracking-widest group"
        >
          <span className="hidden md:inline cursor-pointer">Encerrar</span>
          <div className="p-2 rounded-lg bg-slate-800 group-hover:bg-red-500/10 transition-colors">
            <LogOut size={18} className="group-hover:translate-x-1 transition-transform cursor-pointer" />
          </div>
        </button>
      </div>
    </nav>
  );
}