import { z } from "zod";

export const usersSchema = z.object({
  id: z.number().positive(),
  name: z.string().max(50).min(3),
  email: z.string().max(50).email(),
  password: z.string().max(120),
  admin: z.boolean().default(false),
});

export const usersCreateSchema = usersSchema.omit({ id: true });

usersCreateSchema.extend({
  admin: z.boolean().optional().default(false),
});

export const userReturnSchema = usersSchema.omit({ password: true });
export const userReadSchema = userReturnSchema.array();

export const allCoursesUserSchema = z.object({
  courseId: z.number().positive(),
  courseName: z.string().max(15),
  courseDescription: z.string(),
  userActiveInCourse: z.boolean(),
  userId: z.number().positive(),
  userName: z.string().max(50).min(3),
});
