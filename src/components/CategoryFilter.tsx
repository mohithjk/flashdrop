"use client";

import { motion } from "framer-motion";

interface CategoryFilterProps {
  categories: string[];
  activeCategory: string;
  onSelect: (cat: string) => void;
}

export function CategoryFilter({ categories, activeCategory, onSelect }: CategoryFilterProps) {
  return (
    <div className="w-full max-w-[1400px] mx-auto px-6 py-8 border-b border-white/10">
      <div className="flex items-center gap-4 overflow-x-auto no-scrollbar pb-4">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => onSelect(cat)}
            className={`whitespace-nowrap px-6 py-2.5 rounded-full text-xs font-bold tracking-[0.15em] uppercase transition-all ${
              activeCategory === cat 
                ? "bg-white text-black" 
                : "glass text-white/70 hover:text-white hover:bg-white/10"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>
    </div>
  );
}
