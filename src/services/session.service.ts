import "dotenv/config";
import {
  TSessionCreate,
  TSessionReturn,
} from "../interfaces/session.interface";
import { client } from "../database";
import { TUser, TUserResult } from "../interfaces/users.interface";
import { AppError } from "../errors";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";

export const loginService = async (
  body: TSessionCreate
): Promise<TSessionReturn> => {
  const query: TUserResult = await client.query(
    `SELECT * FROM users WHERE email = $1;`,
    [body.email]
  );

  if (query.rowCount === 0) {
    throw new AppError("Wrong email/password", 401);
  }

  const user: TUser = query.rows[0];

  const verifyPass: boolean = await compare(body.password, user.password);

  if (!verifyPass) {
    throw new AppError("Wrong email/password", 401);
  }

  const token: string = sign(
    { name: user.name, admin: user.admin },
    process.env.SECRET_KEY!,
    { subject: user.id.toString(), expiresIn: process.env.EXPIRES_IN }
  );

  return { token };
};
