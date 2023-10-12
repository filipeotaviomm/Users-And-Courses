import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors";

export const verifyPermission = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const { admin, sub } = res.locals.decoded;

  if (admin) return next();

  if (req.params.userId !== sub) {
    throw new AppError("Insufficient permission", 403);
  }

  next();
};
