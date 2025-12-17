
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Message from '@/models/Message';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    await dbConnect();

    const message = await Message.create(body);

    return NextResponse.json(
      { success: true, data: message },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}
