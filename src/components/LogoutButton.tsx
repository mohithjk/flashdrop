"use client";

import { LogOut } from "lucide-react";

export function LogoutButton() {
  const handleLogout = () => {
    localStorage.removeItem("flashdrop_session");
    window.location.href = "/";
  };

  return (
    <button 
      onClick={handleLogout}
      className="text-white/40 hover:text-white transition-colors flex items-center gap-2 text-xs font-bold tracking-[0.15em] uppercase"
    >
      <LogOut className="w-4 h-4" />
      <span className="hidden md:inline">Logout</span>
    </button>
  );
}
