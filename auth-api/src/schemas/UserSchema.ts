import { z } from "zod";

const UserSchema = z.object({
  body: z.object({
    name: z.coerce.string().min(3).max(50),
    email: z.coerce.string().email(),
    password: z.coerce.string().min(6).max(20)
  })
});

const UserFindByIdSchema = z.object({
  params: z.object({
    id: z.coerce.number()
  })
});

export { UserSchema, UserFindByIdSchema };
