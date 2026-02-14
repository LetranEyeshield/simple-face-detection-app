import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-blue-600 to-cyan-500 flex items-center justify-center px-6">
      <div className="bg-white/10 backdrop-blur-lg border border-white/20 shadow-2xl rounded-3xl p-8 md:p-12 max-w-xl w-full text-center text-white">
        
        <h1 className="text-3xl md:text-4xl font-bold leading-tight">
          Face Recognition <br />
          Employee Attendance
        </h1>

        <p className="mt-4 text-white/80 text-sm md:text-base">
          Secure, fast, and AI-powered daily time in & time out system.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row gap-4">
          <Link
            href="/register"
            className="flex-1 bg-white text-indigo-600 font-semibold py-3 rounded-xl hover:bg-gray-100 transition"
          >
            Register Employee
          </Link>

          <Link
            href="/attendance"
            className="flex-1 bg-indigo-900/70 border border-white/30 py-3 rounded-xl hover:bg-indigo-900 transition"
          >
            Attendance
          </Link>
        </div>
      </div>
    </div>
  );
}
