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
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md space-y-4">
        <h1 className="text-2xl font-bold text-center">
          Face Attendance
        </h1>

        <select
          value={type}
          onChange={(e) =>
            setType(e.target.value as "TIME_IN" | "TIME_OUT")
          }
          className="w-full border p-2 rounded"
        >
          <option value="TIME_IN">Time In</option>
          <option value="TIME_OUT">Time Out</option>
        </select>

        <FaceScanner onCapture={handleCapture} />

        {loading && (
          <p className="text-center text-blue-600">
            Validating face...
          </p>
        )}
      </div>
    </div>
  );
}
