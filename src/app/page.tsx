import { HeroSpotlight } from "@/components/HeroSpotlight";
import { StorefrontClient } from "@/components/StorefrontClient";

export const dynamic = "force-dynamic";

export default async function Home() {
  const { readDB } = await import("@/lib/db");
  const db = await readDB();
  const products = db.products;

  return (
    <main className="flex-1 flex flex-col pt-8">
      <HeroSpotlight />
      <div className="w-full bg-[#0A0A0A] border-t border-white/5 relative z-20">
        <StorefrontClient products={products} />
      </div>
    </main>
  );
}
