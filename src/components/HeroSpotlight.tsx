"use client";

import { motion } from "framer-motion";

export function HeroSpotlight() {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center px-6 overflow-hidden max-w-[1400px] mx-auto w-full">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-white/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 w-full z-10 items-center">
        {/* Left Side: Typography */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col items-start gap-6"
        >
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 rounded-full border border-white/20 text-xs font-bold tracking-widest uppercase text-white/80 glass">
              Condition: Like New
            </span>
            <span className="text-neon-emerald font-mono text-sm tracking-wider">
              $999
            </span>
          </div>
          
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter uppercase leading-[0.9]">
            IPHONE 15 <br />
            <span className="text-white/50">PRO DROP</span>
          </h1>
          
          <p className="text-lg text-white/50 max-w-md font-light">
            Forged in titanium. Featuring the A17 Pro chip and a customizable Action button. Highly limited availability.
          </p>

          <button className="mt-4 group relative px-8 py-4 bg-neon-emerald text-black font-black uppercase tracking-widest rounded-none hover:scale-[1.02] transition-transform flex items-center gap-3">
            <div className="absolute inset-0 bg-neon-emerald blur-md opacity-50 group-hover:opacity-100 transition-opacity" />
            <span className="relative z-10">CLAIM VIA COD</span>
          </button>
        </motion.div>

        {/* Right Side: Floating Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative h-[50vh] md:h-[70vh] w-full flex items-center justify-center"
        >
          {/* Ambient Image Glow */}
          <div className="absolute inset-0 bg-white/10 blur-[100px] rounded-full" />
          
          <motion.img 
            animate={{ y: [0, -20, 0] }}
            transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
            src="https://images.unsplash.com/photo-1696446701796-da61225697cc?auto=format&fit=crop&q=80&w=800" 
            alt="Featured Drop"
            className="relative z-10 max-w-full max-h-full object-contain drop-shadow-[0_0_40px_rgba(255,255,255,0.15)]"
          />
        </motion.div>
      </div>
    </section>
  );
}
