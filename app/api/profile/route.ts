
import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Profile from "@/models/Profile";
import { getSession } from "@/lib/auth";

export async function GET() {
  try {
    await dbConnect();
    const profile = await Profile.findOne().sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: profile });
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

    // Upsert: update if exists, otherwise create
    let profile = await Profile.findOne();
    if (profile) {
      // Remove immutable fields
      delete body._id;
      delete body.createdAt;
      delete body.updatedAt;
      delete body.__v;
      
      Object.assign(profile, body);
      await profile.save();
    } else {
      profile = await Profile.create(body);
    }

    return NextResponse.json({ success: true, data: profile });
  } catch (error: any) {
    console.error("PUT Profile Error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
