import { z } from "zod";

const OrderSchema = z.object({
  body: z.object({
    products: z.array(
      z.object({
        product_id: z.string(),
        quantity: z.number()
      })
    )
  })
});

export default OrderSchema;
