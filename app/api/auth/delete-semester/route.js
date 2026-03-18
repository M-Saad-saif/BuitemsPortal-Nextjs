import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import User from "@/models/UserModel";
import { getTokenFromRequest, verifyToken } from "@/lib/jwt";

export async function DELETE(request) {
  try {
    await connectDB();

    const token = getTokenFromRequest(request);
    if (!token)
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 },
      );
    const decoded = verifyToken(token);
    if (!decoded)
      return NextResponse.json(
        { success: false, error: "Invalid token" },
        { status: 401 },
      );

    const { semesterId } = await request.json();

    const user = await User.findById(decoded.user.id);
    if (!user)
      return NextResponse.json(
        { success: false, error: "User not found" },
        { status: 404 },
      );

    user.semesters = user.semesters.filter(
      (s) => s._id.toString() !== semesterId,
    );
    await user.save();

    const updated = await User.findById(user._id).select(
      "-password -profilePicPublicId",
    );
    return NextResponse.json({ success: true, user: updated });
  } catch (error) {
    console.error("delete-semester error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 },
    );
  }
}
