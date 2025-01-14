import { z } from "zod"

export const ProductSchema = z.object({
  name: z.string(),
  description: z.string(),
  status: z.enum(["draft", "published", "archived"]),
  price: z.number().min(1, "El valor debe ser mayor o igual a 1"),
  images: z.array(z.string()).min(1, "Al menos una imagen es requerida"),
  category: z.enum(["man", "woman", "kids"]),
  isFeatured: z.boolean().optional(),
})

export const bannerSchema = z.object({
  title: z.string(),
  imageString: z.string(),
})