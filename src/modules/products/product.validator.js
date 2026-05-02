import { z } from "zod";

export const createProductSchema = z.object({
  title: z.string().min(3),
  price: z.number().positive(),
  image: z.string().url(),
});

export const updateProductSchema = createProductSchema.partial();
