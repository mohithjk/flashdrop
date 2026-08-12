import { NextResponse } from "next/server";
import { readDB, writeDB } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const { orderId, otpCode } = await req.json();
    const db = await readDB();
    
    // Find the pending order
    const orderIndex = db.orders.findIndex(o => o.id === orderId);
    if (orderIndex === -1) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    const order = db.orders[orderIndex];

    if (order.status !== "Pending") {
      return NextResponse.json({ error: "Order is not pending" }, { status: 400 });
    }

    // Verify OTP
    if (order.otp !== otpCode) {
      return NextResponse.json({ error: "Invalid OTP code" }, { status: 400 });
    }

    // Find the associated product and mark it sold out
    const productIndex = db.products.findIndex(p => p.title === order.item);
    if (productIndex !== -1) {
      if (db.products[productIndex].isSoldOut) {
         // Corner case: Someone else confirmed first
         order.status = "Failed - Item Sold Out";
         await writeDB(db);
         return NextResponse.json({ error: "Too late, item already sold out" }, { status: 400 });
      }
      db.products[productIndex].isSoldOut = true;
    }

    // Mark order confirmed
    order.status = "Confirmed";
    await writeDB(db);

    return NextResponse.json({ success: true, order });
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
