import { NextResponse } from 'next/server'
import { connectDB } from '@/app/lib/mongodb'
import Attendance from '@/app/models/Attendance'

export async function GET() {
  try {
    await connectDB()

    const attendance = await Attendance.find().sort({ createdAt: -1 })

    return NextResponse.json(attendance, { status: 200 })

  } catch (error) {
    console.error('❌ Failed to fetch time logs:', error)

    return NextResponse.json(
      { error: 'Failed to fetch time logs' },
      { status: 500 }
    )
  }
}
