import mongoose from "mongoose";
import { Schema } from "mongoose";

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Must provide a username."],
      unique: [true, "Must be unique."],
    },
    email: {
      type: String,
      required: [true, "Must provide an email."],
      unique: [true, "Must be unique."],
    },
    password: {
      type: String,
    },
    role: {
      type: String,
      default: "user",
    },
  },
  { timestamps: true }
);

const User = mongoose.models.User || mongoose.model("User", UserSchema);

export default User;
