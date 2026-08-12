"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { motion, AnimatePresence } from "framer-motion";

interface SplashScreenProps {
  onComplete: () => void;
}

export function SplashScreen({ onComplete }: SplashScreenProps) {
  const lettersRef = useRef<(HTMLSpanElement | null)[]>([]);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        setTimeout(() => {
          setIsVisible(false);
          setTimeout(onComplete, 800); // Wait for fade out
        }, 1000);
      }
    });
    
    // Staggered letter reveal
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
    );
  }, [onComplete]);

  const title = "FLASHDROP".split("");

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div 
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] bg-[#050505] flex items-center justify-center perspective-[1000px]"
        >
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter uppercase flex justify-center text-white">
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
        </motion.div>
      )}
    </AnimatePresence>
  );
}
