"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Lock, User, Smartphone, KeyRound } from "lucide-react";

interface LoginScreenProps {
  onLogin: (data: { name?: string; phone?: string; role: "customer" | "admin" }) => void;
}

export function LoginScreen({ onLogin }: LoginScreenProps) {
  const [isAdminMode, setIsAdminMode] = useState(false);
  
  // Customer State
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  
  // Admin State
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCustomerSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || isSubmitting) return;
    
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone })
      });
      if (res.ok) {
        onLogin({ name, phone, role: "customer" });
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAdminSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "admin123") {
      onLogin({ role: "admin" });
    } else {
      setError("Invalid master password");
      setTimeout(() => setError(""), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-[1000] bg-black flex items-center justify-center overflow-hidden">
      {/* Cinematic Background Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-white/5 blur-[120px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-neon-emerald/5 blur-[120px]" />

      <div className="relative z-10 w-full max-w-md p-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-black uppercase tracking-[0.2em] mb-2">FlashDrop</h1>
          <p className="text-white/40 text-sm font-bold tracking-widest uppercase">Secure Authentication</p>
        </div>

        <div className="relative bg-[#0A0A0A] border border-white/10 rounded-2xl p-8 shadow-2xl overflow-hidden backdrop-blur-xl">
          <AnimatePresence mode="wait">
            {!isAdminMode ? (
              <motion.form 
                key="customer"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
                onSubmit={handleCustomerSubmit}
                className="space-y-6"
              >
                <div>
                  <label className="block text-[10px] font-bold tracking-widest uppercase text-white/50 mb-2">Full Name</label>
                  <div className="relative flex items-center bg-[#111] border border-white/10 rounded-lg overflow-hidden focus-within:border-white/30 transition-colors">
                    <div className="pl-4 pr-2 text-white/40"><User className="w-4 h-4" /></div>
                    <input 
                      type="text" 
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-transparent p-3 text-white placeholder-white/20 focus:outline-none"
                      placeholder="John Doe"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold tracking-widest uppercase text-white/50 mb-2">WhatsApp Number</label>
                  <div className="relative flex items-center bg-[#111] border border-white/10 rounded-lg overflow-hidden focus-within:border-white/30 transition-colors">
                    <div className="pl-4 pr-2 text-white/40"><Smartphone className="w-4 h-4" /></div>
                    <input 
                      type="tel" 
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-transparent p-3 text-white placeholder-white/20 focus:outline-none font-mono"
                      placeholder="+1 (555) 000-0000"
                    />
                  </div>
                </div>

                <button disabled={isSubmitting} type="submit" className="w-full h-12 bg-white text-black font-bold uppercase tracking-widest rounded-lg flex items-center justify-center gap-2 hover:bg-slate-200 transition-colors mt-4 group disabled:opacity-50">
                  {isSubmitting ? "Authenticating..." : "Enter Store"}
                  {!isSubmitting && <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />}
                </button>
              </motion.form>
            ) : (
              <motion.form 
                key="admin"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                onSubmit={handleAdminSubmit}
                className="space-y-6"
              >
                <div>
                  <label className="block text-[10px] font-bold tracking-widest uppercase text-neon-emerald/70 mb-2 flex items-center gap-2">
                    <Lock className="w-3 h-3" /> Master Override
                  </label>
                  <div className="relative flex items-center bg-[#111] border border-white/10 rounded-lg overflow-hidden focus-within:border-neon-emerald/50 transition-colors">
                    <div className="pl-4 pr-2 text-white/40"><KeyRound className="w-4 h-4" /></div>
                    <input 
                      type="password" 
                      required
                      autoFocus
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full bg-transparent p-3 text-white placeholder-white/20 focus:outline-none tracking-widest font-mono"
                      placeholder="••••••••"
                    />
                  </div>
                  {error && <p className="text-red-500 text-xs mt-2 font-bold tracking-wider">{error}</p>}
                </div>

                <button type="submit" className="w-full h-12 bg-neon-emerald text-black font-bold uppercase tracking-widest rounded-lg flex items-center justify-center gap-2 hover:bg-emerald-400 transition-colors mt-4">
                  Access Terminal
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>

        {/* Toggle Mode */}
        <div className="mt-8 text-center">
          <button 
            onClick={() => {
              setIsAdminMode(!isAdminMode);
              setError("");
              setPassword("");
            }}
            className="text-[10px] font-bold tracking-[0.2em] uppercase text-white/30 hover:text-white/70 transition-colors"
          >
            {isAdminMode ? "Return to Customer Login" : "I am an Admin"}
          </button>
        </div>
      </div>
    </div>
  );
}
