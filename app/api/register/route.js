import connectDB from "@/config/db";
import User from "@/models/UserModel";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    await connectDB();
    const { name, email, password } = await request.json();
    const exists = await User.findOne({ $or: [{ email }, { name }] });
    if (exists) {
      return NextResponse.json(
        { message: "User or email already exists" },
        { status: 500 }
      );
    }
    const userRole = "user";
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role: userRole,
    });
    await newUser.save();
    return NextResponse.json(
      { message: "User successfully registered" },
      { status: 201 }
    );
  } catch (err) {
    return NextResponse.json(
      { message: "Error occurred while registering the user" },
      { status: 500 }
    );
  }
}
