import { NextFunction, Request, Response } from "express";
import { client } from "../database";
import { AppError } from "../errors";
import { TUserResult } from "../interfaces/users.interface";

export const isEmailUnique = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  if (!req.body.email) return next();

  const query: TUserResult = await client.query(
    `SELECT * FROM users WHERE email = $1;`,
    [req.body.email]
  );

  if (query.rowCount !== 0) {
    throw new AppError("Email already registered", 409);
  }

  next();
};
