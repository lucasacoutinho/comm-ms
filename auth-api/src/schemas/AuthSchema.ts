import { z } from "zod";

const AuthSchema = z.object({
  body: z.object({
    email: z.string().email(),
    password: z.string().min(6).max(20)
  })
});

export default AuthSchema;
