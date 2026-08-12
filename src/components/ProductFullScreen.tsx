"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { type Product } from "@/lib/db";
import { CheckoutButton } from "./CheckoutButton";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

interface ProductFullScreenProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ProductFullScreen({ product, isOpen, onClose }: ProductFullScreenProps) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setActiveImageIndex(0);
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  if (!product || !mounted) return null;

  // Simulate an image gallery
  const mockGallery = [
    { src: product.image, style: {} },
    { src: product.image, style: { transform: "scale(1.5) translate(10%, 10%)" } },
    { src: product.image, style: { transform: "scale(2) translate(-10%, -10%)" } },
    { src: product.image, style: { filter: "contrast(1.2) brightness(0.9)" } },
  ];

  const modalContent = (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 100 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[9999] bg-[#050505] flex flex-col md:flex-row h-screen overflow-hidden"
        >
          {/* Back Button */}
          <button 
            onClick={onClose}
            className="absolute top-8 left-8 z-[10000] flex items-center gap-3 text-white/50 hover:text-white transition-colors group"
          >
            <div className="p-3 rounded-full bg-white/5 border border-white/10 group-hover:bg-white/10 transition-colors">
              <ArrowLeft className="w-5 h-5" />
            </div>
            <span className="font-bold tracking-widest text-sm uppercase hidden md:block">Back to Store</span>
          </button>

          {/* Left Side: Image Gallery */}
          <div className="w-full md:w-3/5 h-[50vh] md:h-screen bg-[#0A0A0A] border-r border-white/5 flex flex-col items-center justify-center relative p-8">
            <motion.div 
              key={activeImageIndex}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="relative w-full h-[60%] md:h-[70%] max-w-2xl flex items-center justify-center"
            >
              {product.isSoldOut && (
                <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
                  <span className="px-8 py-3 bg-black border border-white/20 font-black tracking-[0.3em] text-xl md:text-2xl uppercase transform -rotate-12 text-white/80">
                    SOLD OUT
                  </span>
                </div>
              )}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                src={mockGallery[activeImageIndex].src}
                style={mockGallery[activeImageIndex].style}
                alt={`${product.title} view ${activeImageIndex + 1}`}
                className={`w-full h-full object-contain transition-all duration-700 ${product.isSoldOut ? 'opacity-30 grayscale' : ''}`}
              />
            </motion.div>

            {/* Thumbnail Navigation */}
            <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-4 px-4 z-10">
              {mockGallery.map((img, idx) => (
                <button 
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`relative w-16 h-16 md:w-20 md:h-20 rounded-xl overflow-hidden border-2 transition-all bg-black ${
                    activeImageIndex === idx ? "border-white" : "border-white/10 hover:border-white/40"
                  }`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img 
                    src={img.src} 
                    style={img.style}
                    alt="" 
                    className={`w-full h-full object-cover ${product.isSoldOut ? 'opacity-30 grayscale' : ''}`}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Right Side: Product Details */}
          <div className="w-full md:w-2/5 h-[50vh] md:h-screen p-6 md:p-12 flex flex-col overflow-y-auto no-scrollbar">
            <div className="max-w-xl mx-auto w-full flex-1 flex flex-col justify-center">
              <div className="mb-6 mt-4 md:mt-0">
                <span className="inline-block px-3 py-1 md:px-4 md:py-1.5 rounded-full border border-white/20 text-[10px] md:text-xs font-bold tracking-widest uppercase text-white/80 bg-white/5 mb-4">
                  {product.condition}
                </span>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-black uppercase tracking-tighter mb-2 md:mb-4 leading-none">
                  {product.title}
                </h1>
                <p className="text-2xl md:text-3xl font-mono text-white/70">${product.price}</p>
              </div>

              <div className="space-y-6 md:space-y-8 my-4 md:my-8 flex-1">
                <div>
                  <h3 className="text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase text-white/40 mb-3 md:mb-4 border-b border-white/10 pb-2 md:pb-4">
                    Product Specifications
                  </h3>
                  <ul className="space-y-2 md:space-y-4">
                    {product.specs.map((spec, i) => (
                      <li key={i} className="flex items-start gap-3 md:gap-4 text-sm md:text-base text-white/80">
                        <span className="w-1 h-1 md:w-1.5 md:h-1.5 rounded-full bg-white/40 mt-2 shrink-0" />
                        <span className="font-light tracking-wide">{spec}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase text-white/40 mb-3 md:mb-4 border-b border-white/10 pb-2 md:pb-4">
                    Authentication & Warranty
                  </h3>
                  <p className="text-xs md:text-sm font-light text-white/70 leading-relaxed tracking-wide">
                    Every drop is rigorously authenticated by our internal experts. This item includes a 30-day limited warranty covering functional defects. Ships securely within 24 hours via our premium logistics partners.
                  </p>
                </div>
              </div>

              <div className="mt-auto pb-4 md:pb-0 pt-4 md:pt-8 border-t border-white/5 md:border-none">
                <CheckoutButton productId={product.id} isSoldOut={product.isSoldOut} />
                <p className="text-center text-[10px] md:text-xs text-white/30 uppercase tracking-widest mt-4 font-bold">
                  All Sales Final. Cash on Delivery.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return createPortal(modalContent, document.body);
}
