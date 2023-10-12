import { Router } from "express";
import {
  createUserController,
  getAllCoursesUserController,
  getAllUsersController,
} from "../controllers/users.controller";
import { validateBody } from "../middlewares/validateBody.middleware";
import { usersCreateSchema } from "../schemas/users.schema";
import { isEmailUnique } from "../middlewares/isEmailUnique.middleware";
import { verifyToken } from "../middlewares/verifyToken.middleware";
import { verifyPermission } from "../middlewares/verifyPermission.middleware";
import { isUserEnrolled } from "../middlewares/isUserEnrolled.middleware";

export const usersRouter: Router = Router();

usersRouter.post(
  "/",
  validateBody(usersCreateSchema),
  isEmailUnique,
  createUserController
);

usersRouter.use("/", verifyToken, verifyPermission);

usersRouter.get("/", getAllUsersController);
usersRouter.get(
  "/:userId/courses",
  isUserEnrolled,
  getAllCoursesUserController
);
