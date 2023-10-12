import { Request, Response } from "express";
import {
  createUserService,
  getAllCoursesUserService,
  getAllUsersService,
} from "../services/users.service";

export const createUserController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const user = await createUserService(req.body);

  return res.status(201).json(user);
};

export const getAllUsersController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const users = await getAllUsersService();

  return res.status(200).json(users);
};

export const getAllCoursesUserController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const courses = await getAllCoursesUserService(req.params.userId);

  return res.status(200).json(courses);
};
