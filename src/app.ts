import "express-async-errors";
import express, { Application } from "express";
import { handleErrors } from "./errors";
import { usersRouter } from "./routes/users.router";
import { sessionRouter } from "./routes/session.router";
import { coursesRouter } from "./routes/courses.router";

const app: Application = express();

app.use(express.json());

app.use("/users", usersRouter);
app.use("/login", sessionRouter);
app.use("/courses", coursesRouter);

app.use(handleErrors);

export default app;
