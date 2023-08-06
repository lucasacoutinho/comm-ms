import { z } from "zod";

const UserStoreSchema = z
  .object({
    body: z
      .object({
        name: z.string().min(3).max(50),
        email: z.string().email(),
        password: z.string().min(6).max(20)
      })
      .required()
  })
  .required();

const UserFindByIdSchema = z
  .object({
    params: z
      .object({
        id: z.coerce.number()
      })
      .required()
  })
  .required();

export { UserStoreSchema, UserFindByIdSchema };
