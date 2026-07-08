import { NextResponse } from "next/server";
import crypto from "crypto";
import { connectDB } from "@/lib/db";
import User from "@/models/UserModel";
import { sendResetPasswordEmail } from "@/lib/mailer";

export async function POST(request) {
  try {
    await connectDB();

    const { email } = await request.json();

    if (!email || !email.trim()) {
      return NextResponse.json(
        { success: false, error: "Email is required" },
        { status: 400 },
      );
    }

    const user = await User.findOne({ email: email.toLowerCase().trim() });

    if (!user) {
      return NextResponse.json({
        success: true,
        message:
          "If an account with that email exists, a reset link has been sent.",
      });
    }

    const rawToken = crypto.randomBytes(32).toString("hex");
    const hashedToken = crypto
      .createHash("sha256")
      .update(rawToken)
      .digest("hex");

    user.resetPasswordToken = hashedToken;
    user.resetPasswordExpiry = Date.now() + 10 * 60 * 1000;
    await user.save();

    const url = "http://localhost:3000" || process.env.NEXT_PUBLIC_APP_URL;
    const resetUrl = `${url}/reset-password/${rawToken}`;

    try {
      await sendResetPasswordEmail(user.email, resetUrl);
    } catch (mailErr) {
      console.error("reset email error:", mailErr);

      user.resetPasswordToken = null;
      user.resetPasswordExpiry = null;
      await user.save();
      return NextResponse.json(
        {
          success: false,
          error: "Could not send reset email. Try again later.",
        },
        { status: 500 },
      );
    }

    return NextResponse.json({
      success: true,
      message:
        "If an account with that email exists, a reset link has been sent.",
    });
  } catch (error) {
    console.error("forgot-password error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 },
    );
  }
}
