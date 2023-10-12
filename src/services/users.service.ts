import format from "pg-format";
import { TUserCreate } from "../__tests__/mocks/interfaces";
import { client } from "../database";
import {
  TAllCoursesUser,
  TUserCourseResult,
  TUserResult,
  TUsersReturn,
} from "../interfaces/users.interface";
import { hash } from "bcryptjs";
import { userReadSchema, userReturnSchema } from "../schemas/users.schema";

export const createUserService = async (
  body: TUserCreate
): Promise<TUsersReturn> => {
  body.password = await hash(body.password, 10);

  const queryString = format(
    `INSERT INTO users (%I) VALUES (%L) RETURNING *;`,
    Object.keys(body),
    Object.values(body)
  );

  const user: TUserResult = await client.query(queryString);

  return userReturnSchema.parse(user.rows[0]);
};

export const getAllUsersService = async (): Promise<TUsersReturn[]> => {
  const allUsers: TUserResult = await client.query("SELECT * FROM users;");

  return userReadSchema.parse(allUsers.rows);
};

export const getAllCoursesUserService = async (
  param: string
): Promise<TAllCoursesUser[]> => {
  const queryString: string = format(
    `
  SELECT
    c.id AS "courseId",
    c.name AS "courseName",
    c.description AS "courseDescription",
    uc.active AS "userActiveInCourse",
    u.id AS "userId",
    u.name AS "userName"
  FROM courses AS c
  JOIN "userCourses" AS uc
    ON c.id = uc."courseId"
  JOIN users AS u
    ON u.id = uc."userId"
  WHERE u.id = $1;
  `
  );

  const allCourses: TUserCourseResult = await client.query(queryString, [
    param,
  ]);

  return allCourses.rows;
};
