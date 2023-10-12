import { Request, Response } from "express";
import {
  createCourseService,
  enrollAUserInACourseService,
  getAllCoursesService,
  getAllUsersFromACourseService,
  unenrollAUserFromACourseService,
} from "../services/courses.service";
import { TAllUsersCourse, TCourse } from "../interfaces/courses.interface";

export const createCourseController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const course: TCourse = await createCourseService(req.body);

  return res.status(201).json(course);
};

export const getAllCoursesController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const allCourses: TCourse[] = await getAllCoursesService();

  return res.status(200).json(allCourses);
};

export const enrollAUserInACourseController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { courseId, userId } = req.params;

  await enrollAUserInACourseService(courseId, userId);

  return res
    .status(201)
    .json({ message: "User successfully vinculed to course" });
};

export const unenrollAUserFromACourseController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { courseId, userId } = req.params;

  await unenrollAUserFromACourseService(courseId, userId);

  return res.status(204).json();
};

export const getAllUsersFromACourseController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const allUsersCourse: TAllUsersCourse[] = await getAllUsersFromACourseService(
    req.params.courseId
  );

  return res.status(200).json(allUsersCourse);
};
