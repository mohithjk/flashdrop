import Link from "next/link";
import { Search, MessageCircle } from "lucide-react";
import { LogoutButton } from "./LogoutButton";

export function Navbar() {
  return (
    <nav className="fixed top-8 left-0 right-0 z-50 glass border-b border-white/10 bg-black/40">
      <div className="max-w-[1400px] mx-auto px-6 h-16 flex items-center justify-between">
        
        <div className="flex items-center gap-6">
          <button className="text-white/70 hover:text-white transition-colors">
            <Search className="w-5 h-5" />
          </button>
          <div className="hidden md:flex items-center gap-6 text-xs font-bold tracking-[0.15em] uppercase text-white/70">
            <Link href="/" className="hover:text-white transition-colors">Store</Link>
            <LogoutButton />
          </div>
        </div>

        {/* Center: Logo */}
        <Link href="/" className="absolute left-1/2 -translate-x-1/2">
          <span className="text-2xl font-black tracking-tighter uppercase text-white">
            FLASH<span className="text-white/50">DROP</span>
          </span>
        </Link>

        {/* Right: WhatsApp Status */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-medium tracking-widest uppercase text-white/70">
            <div className="relative flex h-2 w-2">
              <span className="animate-pulse-fast absolute inline-flex h-full w-full rounded-full bg-[#25D366] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#25D366]"></span>
            </div>
            <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
            <span className="hidden sm:inline">Bot Online</span>
          </div>
        </div>
        
      </div>
    </nav>
  );
}
