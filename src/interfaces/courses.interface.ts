import { z } from "zod";
import {
  allUsersCourseSchema,
  coursesCreateSchema,
  coursesSchema,
  userCoursesSchema,
} from "../schemas/courses.schema";
import { QueryResult } from "pg";

export type TCourse = z.infer<typeof coursesSchema>;

export type TCourseCreate = z.infer<typeof coursesCreateSchema>;

export type TCourseReadAll = Array<TCourse>;

export type TUserCourses = z.infer<typeof userCoursesSchema>;

export type TAllUsersCourse = z.infer<typeof allUsersCourseSchema>;

export type TCourseResult = QueryResult<TCourse>;

export type TuserCourseResult = QueryResult<TUserCourses>;

export type TAllusersCourseResult = QueryResult<TAllUsersCourse>;
