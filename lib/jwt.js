// lib/jwt.js — JWT sign & verify helpers (replaces backend/middleware/fetchuser.js logic)
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "buitems_jwt_secret_2024";

/**
 * Sign a JWT token for a user id
 * @param {string} userId
 * @returns {string} token
 */
export function signToken(userId) {
  return jwt.sign({ user: { id: userId } }, JWT_SECRET, { expiresIn: "7d" });
}

/**
 * Verify a JWT token and return decoded payload
 * @param {string} token
 * @returns {{ user: { id: string } } | null}
 */
export function verifyToken(token) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch {
    return null;
  }
}

/**
 * Extract token from Authorization header or cookie
 * @param {Request} request - Next.js Request
 * @returns {string|null}
 */
export function getTokenFromRequest(request) {
  // Check Authorization header first
  const authHeader = request.headers.get("auth-token") ||
                     request.headers.get("authorization");
  if (authHeader) {
    return authHeader.replace("Bearer ", "");
  }
  // Fallback: cookies
  const cookieHeader = request.headers.get("cookie") || "";
  const match = cookieHeader.match(/auth-token=([^;]+)/);
  return match ? match[1] : null;
}
