"use client";

import { motion, type Variants } from "framer-motion";
import { type Product } from "@/lib/db";

interface ProductCardProps {
  product: Product;
  onClick: () => void;
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { type: "spring", stiffness: 100, damping: 20 }
  }
};

export function ProductCard({ product, onClick }: ProductCardProps) {
  return (
    <motion.div 
      variants={itemVariants}
      onClick={onClick}
      className={`group cursor-pointer relative overflow-hidden rounded-2xl transition-all duration-500 bg-[#111] border border-white/5 hover:border-white/20 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.5)] ${
        product.isSoldOut ? "grayscale" : ""
      }`}
    >
      {/* Badge */}
      {product.badge && !product.isSoldOut && (
        <div className="absolute top-4 left-4 z-20 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[10px] font-bold tracking-widest uppercase text-white">
          {product.badge}
        </div>
      )}

      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden bg-[#0A0A0A] flex items-center justify-center p-8">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img 
          src={product.image} 
          alt={product.title}
          className={`w-full h-full object-contain transition-transform duration-700 ease-out group-hover:scale-110 ${product.isSoldOut ? "opacity-50" : ""}`}
        />
        {product.isSoldOut && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center z-10">
            <div className="px-6 py-2 bg-black border border-white/20 transform -rotate-12">
              <span className="text-white/80 font-bold tracking-widest text-sm uppercase">
                SOLD OUT
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6 relative">
        <h3 className="text-lg font-bold tracking-tight uppercase text-white mb-1">
          {product.title}
        </h3>
        <p className="text-white/50 text-sm font-medium tracking-wide">
          ${product.price}
        </p>

        {/* Quick View Button (Slides up on hover) */}
        <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 ease-out bg-gradient-to-t from-[#111] via-[#111] to-transparent">
          <button className="w-full py-3 bg-white text-black text-xs font-bold uppercase tracking-widest rounded-lg">
            Quick View
          </button>
        </div>
      </div>
    </motion.div>
  );
}
