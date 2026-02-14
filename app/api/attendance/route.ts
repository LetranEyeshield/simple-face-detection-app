import { NextResponse } from "next/server";
import { connectDB } from "@/app/lib/mongodb";
import User from "@/app/models/Employee";
import Attendance from "@/app/models/Attendance";

export async function POST(req: Request) {
  try {
    await connectDB();

    const { descriptor, type } = await req.json();

    if (!descriptor || !type) {
      return NextResponse.json(
        { error: "Missing data" },
        { status: 400 }
      );
    }

    const users = await User.find();

    let matchedUser = null;
    let bestDistance = 1; // start high

    const faceapi = await import("face-api.js");

    for (const user of users) {
      const distance = faceapi.euclideanDistance(
        new Float32Array(user.faceDescriptor),
        new Float32Array(descriptor)
      );

      if (distance < bestDistance) {
        bestDistance = distance;
        matchedUser = user;
      }
    }

    // Threshold
    if (!matchedUser || bestDistance > 0.6) {
      return NextResponse.json(
        { error: "Face not recognized" },
        { status: 401 }
      );
    }

    await Attendance.create({
      userId: matchedUser._id,
      type,
    });

    return NextResponse.json({
      message: `${type} recorded for ${matchedUser.fullname}`,
      user: matchedUser,
    });

  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}
