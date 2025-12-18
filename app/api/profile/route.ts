
import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Profile from "@/models/Profile";
import { getSession } from "@/lib/auth";

export async function GET() {
  try {
    await dbConnect();
    const profile = await Profile.findOne().sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: profile });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error("GET Profile Error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    await dbConnect();

    // Remove immutable or sensitive fields from body to be safe
    const { _id, createdAt, updatedAt, __v, ...updateData } = body;

    const profile = await Profile.findOneAndUpdate(
      {}, // find first profile
      { $set: updateData },
      { 
        upsert: true, 
        new: true, 
        runValidators: true,
        setDefaultsOnInsert: true 
      }
    );

    return NextResponse.json({ success: true, data: profile });
  } catch (error: any) {
    console.error("PUT Profile Error Detail:", {
      message: error.message,
      stack: error.stack,
      name: error.name
    });
    return NextResponse.json({ 
      success: false, 
      error: error.message || "Internal Server Error" 
    }, { status: 500 });
  }
}
