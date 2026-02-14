"use client";

import { useState } from "react";

import FaceScanner from "@/app/components/FaceScanner";
import { api } from "@/app//lib/axios";

export default function RegisterPage() {
  const [fullname, setFullname] = useState("");
  const [department, setDepartment] = useState("");
  const [role, setRole] = useState("");
  const [faceDescriptor, setFaceDescriptor] = useState<number[] | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!faceDescriptor) {
      alert("Please capture your face first.");
      return;
    }

    try {
      setLoading(true)

      const res = await api.post("/register", {
        fullname,
        department,
        role,
        faceDescriptor,
      });

      alert(res.data.message);

      setFullname("");
      setDepartment("");
      setRole("");
      setFaceDescriptor(null);
    } catch (error: any) {
      alert(error.response?.data?.error || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md space-y-4">
        <h1 className="text-2xl font-bold text-center">
          Register Employee
        </h1>

        <input
          type="text"
          placeholder="Full Name"
          value={fullname}
          onChange={(e) => setFullname(e.target.value)}
          className="w-full border p-2 rounded"
        />

        <input
          type="text"
          placeholder="Department"
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
          className="w-full border p-2 rounded"
        />

        <input
          type="text"
          placeholder="Role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="w-full border p-2 rounded"
        />

        <FaceScanner onCapture={(descriptor) => setFaceDescriptor(descriptor)} />

        {faceDescriptor && (
          <p className="text-green-600 text-sm text-center">
            Face captured successfully ✅
          </p>
        )}

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          {loading ? "Registering..." : "Register"}
        </button>
      </div>
    </div>
  );
}
