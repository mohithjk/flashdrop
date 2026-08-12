"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export function SalesChart() {
  const [bars, setBars] = useState<number[]>(Array.from({ length: 20 }, () => Math.random() * 100));

  useEffect(() => {
    const interval = setInterval(() => {
      setBars(prev => {
        const newBars = [...prev.slice(1), Math.random() * 100];
        return newBars;
      });
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-end h-12 gap-1 mt-4">
      {bars.map((height, i) => (
        <motion.div
          key={i}
          initial={false}
          animate={{ height: `${height}%` }}
          className="w-full bg-neon-emerald rounded-t-sm opacity-80"
          transition={{ type: "spring", bounce: 0, duration: 0.8 }}
        />
      ))}
    </div>
  );
}
