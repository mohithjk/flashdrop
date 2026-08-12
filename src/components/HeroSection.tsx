"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export function HeroSection() {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const lettersRef = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const tl = gsap.timeline();
    
    // Staggered letter reveal for "FLASHDROP"
    tl.fromTo(
      lettersRef.current,
      { y: 100, opacity: 0, rotateX: -90 },
      { 
        y: 0, 
        opacity: 1, 
        rotateX: 0,
        duration: 0.8, 
        stagger: 0.05,
        ease: "back.out(1.7)",
        delay: 0.2
      }
    ).fromTo(
      subRef.current,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" },
      "-=0.4"
    );
  }, []);

  const title = "FLASHDROP".split("");

  return (
    <section className="relative min-h-[70vh] flex flex-col items-center justify-center text-center px-4 overflow-hidden">
      {/* Background radial gradient */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,_var(--color-slate-800)_0%,_var(--color-background)_70%)] opacity-50" />
      
      {/* Live Drops Indicator */}
      <div className="absolute top-12 flex items-center gap-3 glass px-4 py-2 rounded-full border border-slate-700/50">
        <div className="relative flex h-3 w-3">
          <span className="animate-pulse-fast absolute inline-flex h-full w-full rounded-full bg-neon-emerald opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-neon-emerald"></span>
        </div>
        <span className="text-sm font-medium tracking-widest text-slate-300 uppercase">Live Drops</span>
      </div>

      <div className="relative z-10 perspective-[1000px]">
        <h1 
          ref={headingRef} 
          className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter uppercase mb-6 drop-shadow-2xl flex justify-center"
        >
          {title.map((char, index) => (
            <span
              key={index}
              ref={(el) => {
                lettersRef.current[index] = el;
              }}
              className={index > 4 ? "text-neon-emerald inline-block origin-bottom" : "inline-block origin-bottom"}
              style={{ opacity: 0 }}
            >
              {char}
            </span>
          ))}
        </h1>
        <p 
          ref={subRef}
          className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto opacity-0 font-light"
        >
          Secure exclusive, highly limited drops before they vanish. 
          Once they're gone, they're gone forever.
        </p>
      </div>
    </section>
  );
}
