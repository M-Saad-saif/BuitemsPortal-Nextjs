import { NextResponse } from "next/server";
import crypto from "crypto";
import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/db";
import User from "@/models/UserModel";

export async function POST(request) {
  try {
    await connectDB();

    const { token, password } = await request.json();

    if (!token) {
      return NextResponse.json(
        { success: false, error: "Reset token is missing" },
        { status: 400 },
      );
    }
    if (!password || password.trim().length < 4) {
      return NextResponse.json(
        { success: false, error: "Password must be at least 4 characters" },
        { status: 400 },
      );
    }

    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpiry: { $gt: Date.now() },
    });

    if (!user) {
      return NextResponse.json(
        { success: false, error: "Reset link is invalid or has expired" },
        { status: 400 },
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    user.resetPasswordToken = null;
    user.resetPasswordExpiry = null;
    await user.save();

    return NextResponse.json({
      success: true,
      message: "Password reset successfully",
    });
  } catch (error) {
    console.error("reset-password error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 },
    );
  }
}