import mongoose from "mongoose";
import { z } from "zod";

export const OrderFindByIdSchema = z
  .object({
    params: z.object({
      id: z.string().refine((val) => {
        return mongoose.Types.ObjectId.isValid(val);
      })
    })
  })
  .required();

export const OrderSaveSchema = z.object({
  body: z.object({
    products: z.array(
      z.object({
        product_id: z.coerce.number(),
        quantity: z.coerce.number()
      })
    )
  })
});
