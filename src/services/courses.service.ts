import format from "pg-format";
import { client } from "../database";
import {
  TCourseCreate,
  TCourseResult,
  TCourse,
  TUserCourses,
  TAllUsersCourse,
  TAllusersCourseResult,
} from "../interfaces/courses.interface";

export const createCourseService = async (
  body: TCourseCreate
): Promise<TCourse> => {
  const queryString: string = format(
    `INSERT INTO courses (%I) VALUES (%L) RETURNING *;`,
    Object.keys(body),
    Object.values(body)
  );

  const course: TCourseResult = await client.query(queryString);

  return course.rows[0];
};

export const getAllCoursesService = async (): Promise<TCourse[]> => {
  const allCourses: TCourseResult = await client.query(
    "SELECT * FROM courses;"
  );

  return allCourses.rows;
};

export const enrollAUserInACourseService = async (
  courseId: string,
  userId: string
): Promise<TUserCourses> => {
  const queryString: string = `
  INSERT INTO "userCourses" ("courseId", "userId", active)
  VALUES ($1, $2, true) RETURNING *;
  `;

  const result = await client.query(queryString, [courseId, userId]);

  return result.rows[0];
};

export const unenrollAUserFromACourseService = async (
  courseId: string,
  userId: string
): Promise<TUserCourses> => {
  const queryString: string = `
  INSERT INTO "userCourses" ("courseId", "userId", active)
  VALUES ($1, $2, false) RETURNING *;
  `;

  const result = await client.query(queryString, [courseId, userId]);

  return result.rows[0];
};

export const getAllUsersFromACourseService = async (
  courseId: string
): Promise<TAllUsersCourse[]> => {
  const queryString: string = `
    SELECT
      u.id AS "userId",
      u.name AS "userName",
      c.id AS "courseId",
      c.name AS "courseName",
      c.description AS "courseDescription",
      uc.active AS "userActiveInCourse"
    FROM users AS u
    JOIN "userCourses" AS uc
      ON u.id = uc."userId"
    JOIN courses AS c
      ON c.id = uc."courseId"
    WHERE c.id = $1;
    `;

  const AllusersCourse: TAllusersCourseResult = await client.query(
    queryString,
    [courseId]
  );

  return AllusersCourse.rows;
};
