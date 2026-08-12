import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    // Simulate concurrent database save and webhook
    const dbSavePromise = new Promise((resolve) => setTimeout(resolve, 800));
    
    let webhookPromise: Promise<void> = Promise.resolve();
    if (body.publishImmediately) {
      const message = `🚨 New Drop: ${body.title} - $${body.price} | Buy here: https://flashdrop.app/product/new-drop`;
      // Simulate sending webhook to Telegram/WhatsApp API
      webhookPromise = new Promise((resolve) => {
        setTimeout(() => {
          console.log("\n================ WEBHOOK FIRED ================");
          console.log(`To: Telegram/WhatsApp Bot API`);
          console.log(`Payload: ${message}`);
          console.log("===============================================\n");
          resolve();
        }, 1200);
      });
    }

    // Wait for both operations to finish
    await Promise.all([dbSavePromise, webhookPromise]);

    return NextResponse.json({ success: true, message: "Drop created and published" });
  } catch (error) {
    console.error("Error creating drop:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
