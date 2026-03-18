import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/db";
import User from "@/models/UserModel";
import { getTokenFromRequest, verifyToken } from "@/lib/jwt";

// ========= GET /api/auth/profile =========
export async function GET(request) {
  try {
    await connectDB();

    const token = getTokenFromRequest(request);
    if (!token) {
      return NextResponse.json(
        { success: false, error: "No token provided" },
        { status: 401 },
      );
    }

    const decoded = verifyToken(token);
    if (!decoded) {
      return NextResponse.json(
        { success: false, error: "Invalid token" },
        { status: 401 },
      );
    }

    const user = await User.findById(decoded.user.id).select(
      "-password -profilePicPublicId",
    );
    if (!user) {
      return NextResponse.json(
        { success: false, error: "User not found" },
        { status: 404 },
      );
    }

    return NextResponse.json({ success: true, user });
  } catch (error) {
    console.error("profile GET error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 },
    );
  }
}

// =============== PUT /api/auth/profile ===============
export async function PUT(request) {
  try {
    await connectDB();

    const token = getTokenFromRequest(request);
    if (!token) {
      return NextResponse.json(
        { success: false, error: "No token provided" },
        { status: 401 },
      );
    }

    const decoded = verifyToken(token);
    if (!decoded) {
      return NextResponse.json(
        { success: false, error: "Invalid token" },
        { status: 401 },
      );
    }

    const body = await request.json();
    const {
      name,
      rollNo,
      department,
      batch,
      program,
      phone,
      currentPassword,
      newPassword,
    } = body;

    const user = await User.findById(decoded.user.id);
    if (!user) {
      return NextResponse.json(
        { success: false, error: "User not found" },
        { status: 404 },
      );
    }

    // Update basic fields
    if (name) user.name = name;
    if (rollNo !== undefined) user.rollNo = rollNo;
    if (department !== undefined) user.department = department;
    if (batch !== undefined) user.batch = batch;
    if (program !== undefined) user.program = program;
    if (phone !== undefined) user.phone = phone;

    // Password change (optional)
    if (newPassword) {
      if (!currentPassword) {
        return NextResponse.json(
          { success: false, error: "Current password required" },
          { status: 400 },
        );
      }
      const isMatch = await bcrypt.compare(currentPassword, user.password);
      if (!isMatch) {
        return NextResponse.json(
          { success: false, error: "Current password is incorrect" },
          { status: 400 },
        );
      }
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(newPassword, salt);
    }

    await user.save();
    const updated = await User.findById(user._id).select(
      "-password -profilePicPublicId",
    );
    return NextResponse.json({ success: true, user: updated });
  } catch (error) {
    console.error("profile PUT error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 },
    );
  }
}
