import { usersSchema } from "./users.schema";

export const sessionSchema = usersSchema.pick({
  email: true,
  password: true,
});
