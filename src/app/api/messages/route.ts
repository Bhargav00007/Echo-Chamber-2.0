import { NextResponse } from "next/server";
import Message from "../models/Message";
import dbConnect from "../lib/mongodb";

export async function GET() {
  try {
    await dbConnect();
    const messages = await Message.find({}).sort({ createdAt: 1 }).limit(50);
    return NextResponse.json(messages);
  } catch (error) {
    console.error("Error fetching messages:", error);
    return NextResponse.json(
      { error: "Failed to fetch messages" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    await dbConnect(); // Connect to MongoDB

    const { userId, userName, userImage, content } = await request.json();

    // Validate input
    if (!userId || !userName || !userImage || !content) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    const newMessage = new Message({ userId, userName, userImage, content });
    await newMessage.save();

    return NextResponse.json(newMessage, { status: 201 });
  } catch (error) {
    console.error("Error saving message:", error);
    return NextResponse.json(
      { error: "Failed to save message" },
      { status: 500 }
    );
  }
}
