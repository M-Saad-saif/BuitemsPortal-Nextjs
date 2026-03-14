// models/UserModel.js — Mongoose user schema (same as original backend/models/UserModel.js)
import mongoose from "mongoose";

const SemesterSchema = new mongoose.Schema({
  semesterName: { type: String, required: true },   // e.g. "Semester 1"
  creditHours:  { type: Number, required: true },
  gradePoints:  { type: Number, required: true },   // total quality points (GPA * credits)
  gpa:          { type: Number, required: true },
  subjects: [
    {
      name:        { type: String },
      creditHours: { type: Number },
      grade:       { type: String },  // A, B+, B, C+, C, D, F
    },
  ],
});

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    rollNo: {
      type: String,
      default: "",
      trim: true,
    },
    department: {
      type: String,
      default: "",
    },
    batch: {
      type: String,
      default: "",
    },
    program: {
      type: String,
      default: "",    // BS, BE, MS, etc.
    },
    phone: {
      type: String,
      default: "",
    },
    profilePic: {
      type: String,
      default: "",   // Cloudinary URL
    },
    profilePicPublicId: {
      type: String,
      default: "",   // Cloudinary public_id for deletion
    },
    semesters: [SemesterSchema],
    cgpa: {
      type: Number,
      default: 0,
    },
    totalCreditHours: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

// Recalculate CGPA before saving
UserSchema.pre("save", function (next) {
  if (this.semesters && this.semesters.length > 0) {
    const totalPoints = this.semesters.reduce(
      (sum, s) => sum + s.gradePoints, 0
    );
    const totalCredits = this.semesters.reduce(
      (sum, s) => sum + s.creditHours, 0
    );
    this.totalCreditHours = totalCredits;
    this.cgpa = totalCredits > 0
      ? Math.round((totalPoints / totalCredits) * 100) / 100
      : 0;
  }
  next();
});

const User = mongoose.models.User || mongoose.model("User", UserSchema);

export default User;
