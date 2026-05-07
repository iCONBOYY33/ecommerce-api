import { getAuth } from "@clerk/express";

export function requireRole(role) {
  return (req, res, next) => {
    const { sessionClaims } = getAuth(req);

    const userRole = sessionClaims?.metadata?.role;

    if (userRole !== role) {
      return res.status(403).json({
        message: "Forbidden",
      });
    }

    next();
  };
}
