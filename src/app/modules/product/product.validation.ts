import { z } from 'zod';

const VariantValidationSchema = z.object({
  type: z.string(),
  image: z.string()
});

const InventoryValidationSchema = z.object({
  quantity: z.number(),
  inStock: z.boolean()
});

const RatingValidationSchema = z.object({
  email: z.string(),
  rating: z.number(),
  comment: z.string().optional(),
})

const createProductValidation = z.object({
    body: z.object({
        name: z.string(),
        description: z.string(),
        price: z.number(),
        category: z.string(),
        tags: z.array(z.string()),
        variants: z.array(VariantValidationSchema),
        inventory: InventoryValidationSchema,
        image: z.string(),
        ratings: z.array(RatingValidationSchema).optional(),
    })
});
  


export const ProductsValidation ={
    createProductValidation,
};


