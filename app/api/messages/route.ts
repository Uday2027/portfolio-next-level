import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Message from '@/models/Message';

export async function GET() {
  try {
    await dbConnect();

    // Fetch all messages, sorted by most recent first
    const messages = await Message.find({}).sort({ createdAt: -1 });

    return NextResponse.json(
      { success: true, data: messages },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
