import { NextResponse } from "next/server";
import { connectDB } from "@/app/lib/mongodb";
import Employee from "@/app/models/Employee";

export async function POST(req: Request) {
  try {
    await connectDB();

    const { fullName, department, role, faceDesc } =
      await req.json();

    if (!fullName || !department || !role || !faceDesc) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // Optional: prevent duplicate fullname
    const existingEmployee = await Employee.findOne({ fullName });
    if (existingEmployee) {
      return NextResponse.json(
        { error: "Employee already registered" },
        { status: 400 }
      );
    }

    const user = await Employee.create({
      fullName,
      department,
      role,
      faceDesc,
    });

    return NextResponse.json({
      message: "Employee registered successfully",
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
