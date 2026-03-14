import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "buitems_jwt_secret_2024";

export function signToken(userId) {
  return jwt.sign({ user: { id: userId } }, JWT_SECRET, { expiresIn: "7d" });
}

export function verifyToken(token) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch {
    return null;
  }
}

export function getTokenFromRequest(request) {
  const authHeader =
    request.headers.get("auth-token") || request.headers.get("authorization");
  if (authHeader) {
    return authHeader.replace("Bearer ", "");
  }
  const cookieHeader = request.headers.get("cookie") || "";
  const match = cookieHeader.match(/auth-token=([^;]+)/);
  return match ? match[1] : null;
}
