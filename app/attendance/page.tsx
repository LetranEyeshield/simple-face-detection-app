"use client";

import { useEffect, useState } from "react";
import FaceScanner from "@/app/components/FaceScanner";
import { api } from "@/app/lib/axios";

type Attendance = {
  employeeId: string;
  fullName: string;
  type: "TIME_IN" | "TIME_OUT";
  createdAt: string;
};


export default function AttendancePage() {
  const [loading, setLoading] = useState(false);
  const [type, setType] = useState<"TIME_IN" | "TIME_OUT">("TIME_IN");
  const [attendance, setAttendance] = useState<Attendance[]>([]);

  const handleCapture = async (descriptor: number[]) => {
    try {
      setLoading(true);

      const res = await api.post("/attendance", {
        descriptor,
        type,
      });
fetchAttendance();
      alert(res.data.message);


      // Optional: Refresh attendance list after successful scan
      fetchAttendance();

    } catch (error: any) {
      alert(error.response?.data?.error || "Recognition failed");
    } finally {
      setLoading(false);
    }
  };

  const fetchAttendance = async () => {
    try {
      const res = await api.get<Attendance[]>("/timelogs");
      setAttendance(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchAttendance();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center px-4 py-8 gap-8">

      <div className="bg-white w-full max-w-lg rounded-3xl shadow-xl p-6 md:p-8 space-y-6">

        <h1 className="text-2xl md:text-3xl font-bold text-center text-gray-800">
          Face Attendance
        </h1>

        <select
          value={type}
          onChange={(e) =>
            setType(e.target.value as "TIME_IN" | "TIME_OUT")
          }
          className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none"
        >
          <option value="TIME_IN">Time In</option>
          <option value="TIME_OUT">Time Out</option>
        </select>

        <div className="flex justify-center">
          <FaceScanner onCapture={handleCapture} />
        </div>

        {loading && (
          <p className="text-center text-indigo-600 font-medium">
            Validating face...
          </p>
        )}
      </div>

      {/* Attendance Logs */}
      <div className="bg-white w-full max-w-lg rounded-3xl shadow-xl p-6">
        <h2 className="text-lg font-semibold mb-4">Recent Logs</h2>

        {attendance.length === 0 ? (
          <p className="text-gray-500 text-sm">No attendance records yet.</p>
        ) : (
          <ul className="space-y-3">
            {attendance.map((attend, index) => (
              <li
                key={index}
                className="border rounded-xl p-3 flex justify-between text-sm"
              >
                <span>{attend.fullName}</span>
                <span className="font-medium">{attend.type}</span>
                <span>
  {new Date(attend.createdAt).toLocaleString()}
</span>
              </li>
            ))}
          </ul>
        )}
      </div>

    </div>
  );
}
