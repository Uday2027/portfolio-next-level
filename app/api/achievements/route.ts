
import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Achievement from "@/models/Achievement";
import { getSession } from "@/lib/auth";

export async function GET() {
  try {
    await dbConnect();
    const achievements = await Achievement.find().sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: achievements });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    await dbConnect();

    const achievement = await Achievement.create(body);

    return NextResponse.json({ success: true, data: achievement });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
