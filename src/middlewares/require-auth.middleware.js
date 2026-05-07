import { getAuth } from "@clerk/express";

export function protect(req, res, next) {
  const { userId } = getAuth(req);

  if (!userId) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }

  req.userId = userId;

  next();
}
