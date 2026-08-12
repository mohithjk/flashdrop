import { NextResponse } from "next/server";
import { readDB, writeDB, Product } from "@/lib/db";

export async function GET() {
  const db = await readDB();
  return NextResponse.json(db.products);
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const db = await readDB();
    
    const newProduct: Product = {
      id: `drop-${Date.now()}`,
      title: body.title,
      price: Number(body.price),
      image: body.image || "https://images.unsplash.com/photo-1552346154-21d32810baa3?auto=format&fit=crop&q=80&w=800",
      isSoldOut: false,
      specs: body.specs ? body.specs.split(",").map((s: string) => s.trim()) : [],
      category: body.category || "General",
      condition: body.condition || "Condition: New",
      badge: body.badge || ""
    };

    db.products.push(newProduct);
    await writeDB(db);

    if (body.publishImmediately) {
      console.log(`\n🚨 WEBHOOK FIRED: New Drop: ${body.title} - $${body.price}\n`);
    }

    return NextResponse.json({ success: true, product: newProduct });
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
