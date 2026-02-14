import mongoose from "mongoose";

const EmployeeSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    department: { type: String, required: true },
    role: { type: String, required: true },
    faceDesc: {
      type: [Number],
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Employee ||mongoose.model("Employee", EmployeeSchema);
