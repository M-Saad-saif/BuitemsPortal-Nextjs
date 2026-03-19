import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/db";
import User from "@/models/UserModel";
import { signToken } from "@/lib/jwt";

export async function POST(request) {
  try {
    await connectDB();

    const body = await request.json();
    const { name, email, password, rollNo, department, batch, program } = body;

    // Validation
    if (!name || !email || !password) {
      return NextResponse.json(
        { success: false, error: "Name, email and password are required" },
        { status: 400 },
      );
    }
    if (password.length < 4) {
      return NextResponse.json(
        { success: false, error: "Password must be at least 4 characters" },
        { status: 400 },
      );
    }

    // Check if user already exists
    const existing = await User.findOne({ email: email.toLowerCase() });
    if (existing) {
      return NextResponse.json(
        { success: false, error: "A user with this email already exists" },
        { status: 400 },
      );
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const user = await User.create({
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
      rollNo: rollNo || "",
      department: department || "",
      batch: batch || "",
      program: program || "",
    });

    const authToken = signToken(user._id.toString());
    return NextResponse.json({ success: true, authToken }, { status: 201 });
  } catch (error) {
    console.error("createuser error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 },
    );
  }
}
