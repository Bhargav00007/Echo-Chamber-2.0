import { getServerSession } from "next-auth";
import { authOptions } from "../../../../lib/authOptions"; // Ensure this path is correct
import dbConnect from "../lib/mongodb";
import Highscore from "../models/highscoreDB"; // Ensure this path is correct
import { NextRequest, NextResponse } from "next/server";

// Handle POST request for submitting highscores
export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
  }

  await dbConnect();

  try {
    const { score } = await req.json();
    const newHighscore = await Highscore.create({
      username: session.user?.name,
      score,
    });

    return NextResponse.json(newHighscore, { status: 201 });
  } catch {
    return NextResponse.json(
      { message: "Error saving highscore" },
      { status: 500 }
    );
  }
}

// Handle GET request for fetching highscores
export async function GET() {
  await dbConnect();

  try {
    const highscores = await Highscore.find().sort({ score: -1 }).limit(10);
    return NextResponse.json(highscores);
  } catch {
    return NextResponse.json(
      { message: "Error fetching highscores" },
      { status: 500 }
    );
  }
}
