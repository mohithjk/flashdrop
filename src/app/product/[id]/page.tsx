import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { readDB } from "@/lib/db";
import { CheckoutButton } from "@/components/CheckoutButton";

export const dynamic = "force-dynamic";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const db = await readDB();
  const product = db.products.find((p) => p.id === id);

  if (!product) {
    notFound();
  }

  return (
    <main className="min-h-screen pb-24 md:pb-0 flex flex-col md:flex-row pt-16">
      {/* Mobile Back Button */}
      <Link 
        href="/" 
        className="md:hidden fixed top-20 left-4 z-40 glass p-2 rounded-full text-white"
      >
        <ArrowLeft className="w-6 h-6" />
      </Link>

      {/* Left: Image Viewer */}
      <div className="w-full md:w-1/2 md:h-[calc(100vh-4rem)] md:sticky top-16 bg-slate-900 relative">
        <Link 
          href="/" 
          className="hidden md:flex absolute top-8 left-8 z-40 items-center gap-2 text-slate-300 hover:text-white transition-colors glass px-4 py-2 rounded-full"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-medium tracking-widest text-sm uppercase">Back to Drops</span>
        </Link>
        
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={product.image}
          alt={product.title}
          className={`w-full h-[60vh] md:h-full object-cover ${product.isSoldOut ? "grayscale" : ""}`}
        />
        {product.isSoldOut && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
             <div className="transform -rotate-12 border-4 border-red-500 px-8 py-3">
                <span className="text-red-500 font-black text-5xl tracking-widest uppercase drop-shadow-lg">
                  Sold Out
                </span>
              </div>
          </div>
        )}
      </div>

      {/* Right: Details */}
      <div className="w-full md:w-1/2 px-6 py-12 md:p-16 lg:p-24 flex flex-col justify-center">
        <div className="max-w-xl mx-auto w-full">
          <div className="mb-8">
            <h1 className="text-4xl md:text-6xl font-black tracking-tighter uppercase mb-4">
              {product.title}
            </h1>
            <p className="text-2xl font-mono text-neon-emerald">
              ${product.price}
            </p>
          </div>

          <div className="space-y-6 mb-12">
            <div>
              <h3 className="text-sm font-bold tracking-widest uppercase text-slate-400 mb-3 border-b border-slate-800 pb-2">
                Specifications
              </h3>
              <ul className="space-y-3">
                {product.specs.map((spec, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-lg font-light">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-600" />
                    {spec}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Desktop Checkout */}
          <div className="hidden md:block">
            <CheckoutButton productId={product.id} isSoldOut={product.isSoldOut} />
          </div>
        </div>
      </div>

      {/* Mobile Sticky Bottom Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 glass border-t border-slate-800 p-4 z-50">
        <CheckoutButton productId={product.id} isSoldOut={product.isSoldOut} />
      </div>
    </main>
  );
}
