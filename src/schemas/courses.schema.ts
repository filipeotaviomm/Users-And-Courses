import { z } from "zod";

export const coursesSchema = z.object({
  id: z.number().positive(),
  name: z.string().max(15),
  description: z.string(),
});

export const coursesCreateSchema = coursesSchema.omit({ id: true });

export const userCoursesSchema = z.object({
  id: z.number().positive(),
  active: z.boolean(),
  userId: z.number().positive(),
  courseId: z.number().positive(),
});

export const allUsersCourseSchema = z.object({
  userId: z.number().positive(),
  userName: z.string().max(50).min(3),
  courseId: z.number().positive(),
  courseName: z.string().max(15),
  courseDescription: z.string(),
  userActiveInCourse: z.boolean(),
});
