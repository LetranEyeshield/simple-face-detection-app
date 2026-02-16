import { NextResponse } from "next/server";
import { connectDB } from "@/app/lib/mongodb";
import Employee from "@/app/models/Employee";
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

    const employees = await Employee.find();

    let matchedEmployee = null;
    let bestDistance = 1; // start high

    const faceapi = await import("face-api.js");

    for (const emp of employees) {
      const distance = faceapi.euclideanDistance(
        new Float32Array(emp.faceDesc),
        new Float32Array(descriptor)
      );

      if (distance < bestDistance) {
        bestDistance = distance;
        matchedEmployee = emp;
      }
    }

    // Threshold
    if (!matchedEmployee || bestDistance > 0.6) {
      return NextResponse.json(
        { error: "Face not recognized" },
        { status: 401 }
      );
    }

    await Attendance.create({
      employeeId: matchedEmployee._id,
      fullName: matchedEmployee.fullName,
      type,
    });

    return NextResponse.json({
      message: `${type} recorded for ${matchedEmployee.fullName}`,
      employee: matchedEmployee,
    });

  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}