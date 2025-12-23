
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

    // Find the existing profile or create a new one
    let profile = await Profile.findOne();
    
    // Remove immutable fields to avoid conflicts
    const { _id, createdAt, updatedAt, __v, ...updateData } = body;

    if (profile) {
      // Update existing
      Object.assign(profile, updateData);
    } else {
      // Create new
      profile = new Profile(updateData);
    }

    await profile.save();
    return NextResponse.json({ success: true, data: profile });
    
  } catch (error: any) {
    const bodyKeys = Object.keys(body || {}).join(", ") || "keys in body unknown";
    console.error("PUT Profile Error Detail:", {
      message: error.message,
      name: error.name,
      keys: Object.keys(body || {})
    });
    
    return NextResponse.json({ 
      success: false, 
      error: `Validation or Server Error: ${error.message}. Received keys: ${Object.keys(body || {}).join(", ")}`
    }, { status: 500 });
  }
}
