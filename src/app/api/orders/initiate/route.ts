import { NextResponse } from "next/server";
import { readDB, writeDB, Order } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const { productId, phone } = await req.json();
    const db = await readDB();
    
    const product = db.products.find(p => p.id === productId);
    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    if (product.isSoldOut) {
      return NextResponse.json({ error: "Product sold out" }, { status: 400 });
    }

    // Generate a random 4-digit OTP
    const otp = Math.floor(1000 + Math.random() * 9000).toString();

    // Create pending order
    const newOrder: Order = {
      id: `ORD-${Math.random().toString(36).substr(2, 6).toUpperCase()}`,
      buyer: phone, // User's WhatsApp/SMS number
      item: product.title,
      status: "Pending", // Important: It's pending, item is NOT sold out yet
      time: new Date().toISOString().replace('T', ' ').substring(0, 19),
      otp: otp // Save OTP to verify later
    };

    db.orders.unshift(newOrder);
    await writeDB(db);

    console.log(`\n💬 [SMS API - OUTBOUND]`);
    console.log(`To: ${phone}`);
    console.log(`Message: Your FlashDrop code is ${otp}. Do not share this with anyone.\n`);

    // We return the OTP in the response SOLELY to simulate the SMS on the frontend.
    // In a real app, you would NEVER return the OTP in the API response.
    return NextResponse.json({ success: true, orderId: newOrder.id, simulatedOtp: otp });
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
