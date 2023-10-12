import { z } from "zod";
import {
  allCoursesUserSchema,
  userReturnSchema,
  usersCreateSchema,
  usersSchema,
} from "../schemas/users.schema";
import { QueryResult } from "pg";

export type TUser = z.infer<typeof usersSchema>;

export type TUserCreate = z.infer<typeof usersCreateSchema>;

export type TUsersReturn = z.infer<typeof userReturnSchema>;

// export type TUserReadAll = Array<TUser>;

export type TAllCoursesUser = z.infer<typeof allCoursesUserSchema>;

export type TUserResult = QueryResult<TUser>;

export type TUserCourseResult = QueryResult<TAllCoursesUser>;
