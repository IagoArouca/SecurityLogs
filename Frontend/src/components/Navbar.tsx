// src/components/Navbar.tsx
import { ShieldCheck, LogOut } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

export function Navbar() {
  const { signOut, user } = useAuth();

  return (
    <nav className="bg-white border-b border-gray-200 px-8 py-4 flex items-center justify-between sticky top-0 z-10">
      <div className="flex items-center gap-3">
        <div className="bg-blue-600 p-1.5 rounded-lg text-white">
          <ShieldCheck size={20} />
        </div>
        <span className="font-bold text-gray-800 tracking-tight">Guardiana <span className="text-blue-600">Analytics</span></span>
      </div>

      <div className="flex items-center gap-6">
        <div className="flex items-center gap-3 text-right border-r border-gray-100 pr-6">
          <div className="hidden sm:block">
            <p className="text-sm font-bold text-gray-800">{user?.name}</p>
            <p className="text-[10px] text-gray-500 uppercase tracking-widest">Administrador</p>
          </div>
          <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center font-bold text-blue-700 text-sm">
            {user?.name?.charAt(0) || 'A'}
          </div>
        </div>

        <button 
          onClick={signOut}
          className="flex items-center gap-2 text-gray-500 hover:text-red-600 transition-colors font-medium text-sm group"
        >
          <span className="hidden sm:inline">Sair</span>
          <LogOut size={18} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </nav>
  );
}