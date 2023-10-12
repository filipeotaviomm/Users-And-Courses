import { NextFunction, Request, Response } from "express";
import { client } from "../database";
import { AppError } from "../errors";
import { TUserResult } from "../interfaces/users.interface";
import { TCourseResult } from "../interfaces/courses.interface";

export const doesUserOrCourseExist = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { userId, courseId } = req.params;

  const userResult: TUserResult = await client.query(
    `SELECT * FROM users WHERE id = $1;`,
    [userId]
  );

  const courseResult: TCourseResult = await client.query(
    `SELECT * FROM courses WHERE id = $1;`,
    [courseId]
  );

  const user = userResult.rows[0];
  const course = courseResult.rows[0];

  if (!user || !course) {
    throw new AppError("User/course not found", 404);
  }

  next();
};
