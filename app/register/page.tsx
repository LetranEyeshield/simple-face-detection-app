"use client";

import { useState } from "react";
import FaceScanner from "@/app/components/FaceScanner";
import { api } from "@/app/lib/axios";

type Employee = {
  fullName: string;
  department: string;
  role: string;
  faceDesc: number[] | null;
};

const roleArr: string[] = [
  "Doctor",
  "Nurse",
  "Midwife",
  "Pharmacist",
  "Dentist",
  "Medical Technologist",
  "Information Technology",
  "Programmer/Web Developer",
  "Administrative Aide",
];

const deptArr: string[] = [
  "Doctor's Office",
  "Pharmacy",
  "Midwives",
  "Laboratory",
  "TB Dots",
  "Dental",
  "IT Department",
  "Sanitary",
];

export default function RegisterPage() {
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState<Employee>({
    fullName: "",
    department: "",
    role: "",
    faceDesc: null,
  });

  const handleSubmit = async () => {
    if (!form.faceDesc) {
      alert("Please capture your face first.");
      return;
    }

    try {
      setLoading(true);

      const res = await api.post("/register", form);

      alert(res.data.message);

      setForm({
        fullName: "",
        department: "",
        role: "",
        faceDesc: null,
      });

    } catch (error: any) {
      alert(error.response?.data?.error || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-8">
      <div className="bg-white w-full max-w-lg rounded-3xl shadow-xl p-6 md:p-8 space-y-6">

        <h1 className="text-2xl md:text-3xl font-bold text-center text-gray-800">
          Register Employee
        </h1>

        <div className="space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            value={form.fullName}
            name="fullName"
            onChange={handleChange}
            className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />

          <select
            name="department"
            value={form.department}
            onChange={handleChange}
            className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          >
            <option value="">Select Department</option>
            {deptArr.map((dep) => (
              <option key={dep} value={dep}>
                {dep}
              </option>
            ))}
          </select>

          <select
            name="role"
            value={form.role}
            onChange={handleChange}
            className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          >
            <option value="">Select Role</option>
            {roleArr.map((role) => (
              <option key={role} value={role}>
                {role}
              </option>
            ))}
          </select>
        </div>

        <div className="flex justify-center">
          <FaceScanner
            onCapture={(descriptor: number[]) => {
              setForm((prev) => ({
                ...prev,
                faceDesc: descriptor,
              }));
            }}
          />
        </div>

        {form.faceDesc && (
          <div className="text-green-600 text-center text-sm font-medium">
            ✅ Face captured successfully
          </div>
        )}

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full bg-indigo-600 text-white py-3 rounded-xl font-semibold hover:bg-indigo-700 transition disabled:opacity-50"
        >
          {loading ? "Registering..." : "Register Employee"}
        </button>
      </div>
    </div>
  );
}
