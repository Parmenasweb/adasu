import mongoose, { trusted } from "mongoose";
import { Schema } from "mongoose";

// Creating a schema for the student model
const leaderSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, trim: true },
    position: { type: String, required: true, trim: true },
    contact: { type: Number, required: true },
  },
  { timestamps: true }
);

// Create a model for each student

const Leader = mongoose.models.Leader || mongoose.model("Leader", leaderSchema);

export default Leader;
