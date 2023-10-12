import { Router } from "express";
import {
  createCourseController,
  enrollAUserInACourseController,
  getAllCoursesController,
  getAllUsersFromACourseController,
  unenrollAUserFromACourseController,
} from "../controllers/courses.controller";
import { validateBody } from "../middlewares/validateBody.middleware";
import { coursesCreateSchema } from "../schemas/courses.schema";
import { verifyToken } from "../middlewares/verifyToken.middleware";
import { verifyPermission } from "../middlewares/verifyPermission.middleware";
import { doesUserOrCourseExist } from "../middlewares/doesUserOrCourseExist.middleware";

export const coursesRouter: Router = Router();

coursesRouter.get("/", getAllCoursesController);

coursesRouter.use("/", verifyToken, verifyPermission);

coursesRouter.post(
  "/",
  validateBody(coursesCreateSchema),
  createCourseController
);

coursesRouter.post(
  "/:courseId/users/:userId",
  doesUserOrCourseExist,
  enrollAUserInACourseController
);

coursesRouter.delete(
  "/:courseId/users/:userId",
  doesUserOrCourseExist,
  unenrollAUserFromACourseController
);

coursesRouter.get("/:courseId/users", getAllUsersFromACourseController);
