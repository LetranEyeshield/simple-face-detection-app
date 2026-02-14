import mongoose from "mongoose";

const EmployeeSchema = new mongoose.Schema(
  {
    fullname: { type: String, required: true },
    department: { type: String, required: true },
    role: { type: String, required: true },
    faceDescriptor: {
      type: [Number],
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.models.User ||mongoose.model("Employee", EmployeeSchema);
