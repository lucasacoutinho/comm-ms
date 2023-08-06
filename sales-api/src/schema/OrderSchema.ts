import mongoose from "mongoose";
import { z } from "zod";

const FindByIdSchema = z
  .object({
    params: z
      .object({
        id: z.string().refine((val) => {
          return mongoose.Types.ObjectId.isValid(val);
        })
      })
      .required()
  })
  .required();

const FindByProductIdSchema = z
  .object({
    params: z
      .object({
        id: z.coerce.number()
      })
      .required()
  })
  .required();

const SaveSchema = z
  .object({
    body: z
      .object({
        products: z.array(
          z.object({
            product_id: z.coerce.number(),
            quantity: z.coerce.number()
          })
        )
      })
      .required()
  })
  .required();

export { FindByIdSchema, FindByProductIdSchema, SaveSchema };
