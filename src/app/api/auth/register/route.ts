import { NextResponse } from "next/server";
import { readDB, writeDB, User } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const { name, phone } = await req.json();
    if (!name || !phone) {
      return NextResponse.json({ error: "Name and phone required" }, { status: 400 });
    }

    const db = await readDB();
    
    // Ensure users array exists (for backwards compatibility if database.json doesn't have it yet)
    if (!db.users) {
      db.users = [];
    }

    // Check if user already exists based on phone number
    const existingUser = db.users.find(u => u.phone === phone);
    
    if (existingUser) {
      // User exists, just log them in
      return NextResponse.json({ success: true, message: "Welcome back", user: existingUser });
    }

    // New user
    const newUser: User = {
      name,
      phone,
      joinedAt: new Date().toISOString().replace('T', ' ').substring(0, 19)
    };

    db.users.unshift(newUser);
    await writeDB(db);

    console.log(`\n👤 [NEW USER REGISTERED] ${name} (${phone})\n`);

    return NextResponse.json({ success: true, message: "Registered successfully", user: newUser });
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
