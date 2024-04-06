import mongoose, { trusted } from "mongoose";
import { Schema } from "mongoose";

// Creating a schema for the student model
const studentSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, trim: true },
    nationality: { type: String, required: true, trim: true },
    birthday: { type: String, required: true },
    department: { type: String, required: true },
    contact: { type: Number, required: true },
  },
  { timestamps: true }
);

// Create a model for each student

const Student =
  mongoose.models.Student || mongoose.model("Student", studentSchema);

export default Student;
