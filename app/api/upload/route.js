import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import User from "@/models/UserModel";
import cloudinary from "@/lib/cloudinary";
import { getTokenFromRequest, verifyToken } from "@/lib/jwt";

export const dynamic = "force-dynamic";

export async function POST(request) {
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

    const formData = await request.formData();
    const file = formData.get("profilePic");

    if (!file) {
      return NextResponse.json(
        { success: false, error: "No file provided" },
        { status: 400 },
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64 = `data:${file.type};base64,${buffer.toString("base64")}`;

    const user = await User.findById(decoded.user.id);
    if (!user)
      return NextResponse.json(
        { success: false, error: "User not found" },
        { status: 404 },
      );

    if (user.profilePicPublicId) {
      await cloudinary.uploader.destroy(user.profilePicPublicId);
    }

    const result = await cloudinary.uploader.upload(base64, {
      folder: "buitems_profiles",
      transformation: [
        { width: 400, height: 400, crop: "fill", gravity: "face" },
      ],
    });

    user.profilePic = result.secure_url;
    user.profilePicPublicId = result.public_id;
    await user.save();

    return NextResponse.json({ success: true, profilePic: result.secure_url });
  } catch (error) {
    console.error("upload error:", error);
    return NextResponse.json(
      { success: false, error: "Upload failed" },
      { status: 500 },
    );
  }
}
