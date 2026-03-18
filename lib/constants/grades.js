export const GRADE_POINTS = {
  A: 4.0,
  "A-": 3.7,
  "B+": 3.3,
  B: 3.0,
  "B-": 2.7,
  "C+": 2.3,
  C: 2.0,
  "C-": 1.7,
  "D+": 1.3,
  D: 1.0,
  F: 0.0,
};

export const GRADE_COLOR = {
  A: "text-green-600",
  "A-": "text-green-500",
  "B+": "text-blue-600",
  B: "text-blue-500",
  "B-": "text-blue-400",
  "C+": "text-yellow-600",
  C: "text-yellow-500",
  "C-": "text-yellow-400",
  "D+": "text-orange-500",
  D: "text-orange-600",
  F: "text-red-600",
};

export function gpaColor(gpa) {
  const g = parseFloat(gpa);
  if (g >= 3.5) return "text-green-600";
  if (g >= 3.0) return "text-blue-600";
  if (g >= 2.5) return "text-yellow-600";
  return "text-red-500";
}