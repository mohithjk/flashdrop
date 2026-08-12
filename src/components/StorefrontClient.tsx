"use client";

import { useState } from "react";
import { type Product } from "@/lib/db";
import { CategoryFilter } from "./CategoryFilter";
import { ProductCard } from "./ProductCard";
import { ProductFullScreen } from "./ProductFullScreen";

interface StorefrontClientProps {
  products: Product[];
}

export function StorefrontClient({ products }: StorefrontClientProps) {
  const [activeCategory, setActiveCategory] = useState("All Drops");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const categories = ["All Drops", "Smartphones", "Audio", "Laptops"];

  const filteredProducts = activeCategory === "All Drops"
    ? products
    : products.filter(p => p.category === activeCategory);

  return (
    <>
      <CategoryFilter 
        categories={categories} 
        activeCategory={activeCategory} 
        onSelect={setActiveCategory} 
      />
      
      <section className="w-full max-w-[1400px] mx-auto px-6 py-16">
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard 
                key={product.id} 
                product={product} 
                onClick={() => setSelectedProduct(product)} 
              />
            ))}
          </div>
        ) : (
          <div className="py-24 text-center text-white/50">
            No drops found for this category.
          </div>
        )}
      </section>

      <ProductFullScreen 
        product={selectedProduct} 
        isOpen={!!selectedProduct} 
        onClose={() => setSelectedProduct(null)} 
      />
    </>
  );
}
