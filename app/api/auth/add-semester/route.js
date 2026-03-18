import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import User from "@/models/UserModel";
import { getTokenFromRequest, verifyToken } from "@/lib/jwt";

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

    const { semesterName, subjects } = await request.json();

    if (!semesterName || !subjects || subjects.length === 0) {
      return NextResponse.json(
        { success: false, error: "Semester name and subjects are required" },
        { status: 400 },
      );
    }

    const gradeMap = {
      A: 4.0,
      "A-": 3.7,
      "B+": 3.3,
      B: 3.0,
      "B-": 2.7,
      "C+": 2.3,
      C: 2.0,
      "C-": 1.7,
      D: 1.0,
      F: 0.0,
    };

    let totalPoints = 0;
    let totalCredits = 0;

    const processedSubjects = subjects.map((sub) => {
      const gp = gradeMap[sub.grade] ?? 0;
      totalPoints += gp * sub.creditHours;
      totalCredits += Number(sub.creditHours);
      return {
        name: sub.name,
        creditHours: Number(sub.creditHours),
        grade: sub.grade,
      };
    });

    const gpa =
      totalCredits > 0
        ? Math.round((totalPoints / totalCredits) * 100) / 100
        : 0;

    const user = await User.findById(decoded.user.id);
    if (!user)
      return NextResponse.json(
        { success: false, error: "User not found" },
        { status: 404 },
      );

    user.semesters.push({
      semesterName,
      creditHours: totalCredits,
      gradePoints: totalPoints,
      gpa,
      subjects: processedSubjects,
    });

    await user.save();

    const updated = await User.findById(user._id).select(
      "-password -profilePicPublicId",
    );
    return NextResponse.json({ success: true, user: updated });
  } catch (error) {
    console.error("add-semester error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 },
    );
  }
}
