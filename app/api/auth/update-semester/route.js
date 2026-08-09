import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import User from "@/models/UserModel";
import { getTokenFromRequest, verifyToken } from "@/lib/jwt";

const GRADE_POINTS = {
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

export async function PUT(request) {
  try {
    await connectDB();

    const token = getTokenFromRequest(request);
    if (!token) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
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

    const { semesterId, semesterName, subjects } = await request.json();

    if (!semesterId || !semesterName?.trim() || !Array.isArray(subjects) || subjects.length === 0) {
      return NextResponse.json(
        {
          success: false,
          error: "Semester ID, semester name and subjects are required",
        },
        { status: 400 },
      );
    }

    const processedSubjects = [];
    let totalPoints = 0;
    let totalCredits = 0;

    for (const subject of subjects) {
      const name = subject?.name?.trim();
      const creditHours = Number(subject?.creditHours);
      const grade = subject?.grade;

      if (!name || !Number.isFinite(creditHours) || creditHours <= 0 || !(grade in GRADE_POINTS)) {
        return NextResponse.json(
          { success: false, error: "Every subject must have a valid name, credit hours and grade" },
          { status: 400 },
        );
      }

      totalCredits += creditHours;
      totalPoints += GRADE_POINTS[grade] * creditHours;
      processedSubjects.push({ name, creditHours, grade });
    }

    const user = await User.findById(decoded.user.id);
    if (!user) {
      return NextResponse.json(
        { success: false, error: "User not found" },
        { status: 404 },
      );
    }

    const semester = user.semesters.id(semesterId);
    if (!semester) {
      return NextResponse.json(
        { success: false, error: "Semester not found" },
        { status: 404 },
      );
    }

    semester.semesterName = semesterName.trim();
    semester.subjects = processedSubjects;
    semester.creditHours = totalCredits;
    semester.gradePoints = totalPoints;
    semester.gpa = Math.round((totalPoints / totalCredits) * 100) / 100;

    await user.save();

    const updated = await User.findById(user._id).select(
      "-password -profilePicPublicId",
    );

    return NextResponse.json({ success: true, user: updated });
  } catch (error) {
    console.error("update-semester error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 },
    );
  }
}
