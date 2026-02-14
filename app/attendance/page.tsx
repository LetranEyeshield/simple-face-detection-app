"use client";

import { useState } from "react";
import FaceScanner from "@/app/components/FaceScanner";
import { api } from "@/app/lib/axios";

export default function AttendancePage() {
  const [loading, setLoading] = useState(false);
  const [type, setType] = useState<"TIME_IN" | "TIME_OUT">("TIME_IN");

  const handleCapture = async (descriptor: number[]) => {
    try {
      setLoading(true);

      const res = await api.post("/attendance", {
        descriptor,
        type,
      });

      alert(res.data.message);
    } catch (error: any) {
      alert(error.response?.data?.error || "Recognition failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-8">
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
    </div>
  );
}
