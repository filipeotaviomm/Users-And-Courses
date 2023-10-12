import { NextFunction, Request, Response } from "express";
import { client } from "../database";
import { AppError } from "../errors";

export const isUserEnrolled = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const userResult = await client.query(
    `SELECT * FROM "userCourses" WHERE "userId" = $1;`,
    [req.params.userId]
  );

  if (!userResult.rowCount) {
    throw new AppError("No course found", 404);
  }

  return next();
};
