import mongoose from "mongoose";

const AttendanceSchema = new mongoose.Schema(
  {
    employeeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
      required: true,
    },
    fullName: { type: String, required: true },
    type: {
      type: String,
      enum: ["TIME_IN", "TIME_OUT"],
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Attendance || mongoose.model("Attendance", AttendanceSchema);
