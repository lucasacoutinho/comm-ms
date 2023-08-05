import mongoose from "mongoose";
import { z } from "zod";

const OrderFindByIdSchema = z
  .object({
    params: z.object({
      id: z.string().refine((val) => {
        return mongoose.Types.ObjectId.isValid(val);
      })
    })
  })
  .required();

const OrderFindByProductIdSchema = z
  .object({
    params: z.object({
      id: z.coerce.number()
    })
  })
  .required();

const OrderSaveSchema = z
  .object({
    body: z.object({
      products: z.array(
        z.object({
          product_id: z.coerce.number(),
          quantity: z.coerce.number()
        })
      )
    })
  })
  .required();

export { OrderFindByIdSchema, OrderFindByProductIdSchema, OrderSaveSchema };
