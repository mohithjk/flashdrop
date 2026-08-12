"use client";

import Link from "next/link";
import { LayoutDashboard, PackagePlus, Settings, LogOut, Users } from "lucide-react";
import { AdminGuard } from "@/components/AdminGuard";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AdminGuard>
      <div className="flex h-screen overflow-hidden bg-[#020202]">
        {/* Sidebar Navigation */}
        <aside className="w-64 glass border-r border-slate-800/50 flex flex-col z-20 shrink-0">
          <div className="p-6">
            <Link href="/admin" className="text-xl font-black tracking-widest uppercase">
              Admin<span className="text-neon-emerald">.OS</span>
            </Link>
          </div>

          <nav className="flex-1 px-4 py-6 space-y-2">
            <Link 
              href="/admin" 
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-300 hover:text-white hover:bg-white/5 transition-colors"
            >
              <LayoutDashboard className="w-5 h-5 text-neon-blue" />
              <span className="font-medium">Command Center</span>
            </Link>
            <Link 
              href="/admin/create" 
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-300 hover:text-white hover:bg-white/5 transition-colors"
            >
              <PackagePlus className="w-5 h-5 text-neon-emerald" />
              <span className="font-medium">New Drop</span>
            </Link>
            <Link 
              href="/admin/users" 
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-300 hover:text-white hover:bg-white/5 transition-colors"
            >
              <Users className="w-5 h-5 text-purple-400" />
              <span className="font-medium">Customers</span>
            </Link>
            <Link 
              href="/admin/settings" 
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-300 hover:text-white hover:bg-white/5 transition-colors"
            >
              <Settings className="w-5 h-5 text-slate-400" />
              <span className="font-medium">Settings</span>
            </Link>
          </nav>

          <div className="p-4 border-t border-slate-800/50">
            <button 
              onClick={() => {
                localStorage.removeItem("flashdrop_session");
                window.location.href = "/";
              }}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-slate-400 hover:text-white transition-colors"
            >
              <LogOut className="w-5 h-5" />
              <span className="font-medium">Sign Out</span>
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto overflow-x-hidden relative">
          <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_top_right,_rgba(59,130,246,0.15)_0%,_transparent_50%)]" />
          <div className="p-8 max-w-6xl mx-auto relative z-10">
            {children}
          </div>
        </main>
      </div>
    </AdminGuard>
  );
}
