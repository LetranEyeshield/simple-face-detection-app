import { NextResponse } from "next/server";
import { connectDB } from "@/app/lib/mongodb";
import User from "@/app/models/Employee";

export async function POST(req: Request) {
  try {
    await connectDB();

    const { fullname, department, role, faceDescriptor } =
      await req.json();

    if (!fullname || !department || !role || !faceDescriptor) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // Optional: prevent duplicate fullname
    const existingUser = await User.findOne({ fullname });
    if (existingUser) {
      return NextResponse.json(
        { error: "User already registered" },
        { status: 400 }
      );
    }

    const user = await User.create({
      fullname,
      department,
      role,
      faceDescriptor,
    });

    return NextResponse.json({
      message: "User registered successfully",
      user,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}
