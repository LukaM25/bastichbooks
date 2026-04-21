import { z } from "zod";

export const categorySchema = z.object({
  id: z.string().optional(),
  name: z.string().min(2, "Category names need at least 2 characters."),
  slug: z.string().optional(),
  description: z.string().min(10, "Add a short editorial description."),
});

export const bookSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(3, "Titles need at least 3 characters."),
  slug: z.string().optional(),
  subtitle: z.string().optional(),
  shortDescription: z
    .string()
    .min(24, "Short descriptions should carry a bit of mood."),
  description: z.string().min(120, "Write a fuller editorial description."),
  featuredQuote: z.string().optional(),
  isbn: z.string().optional(),
  pageCount: z.coerce.number().int().positive().optional(),
  price: z.coerce.number().positive(),
  status: z.enum(["DRAFT", "PUBLISHED", "ARCHIVED"]),
  featured: z.boolean().default(false),
  releaseDate: z.string().optional(),
  sampleUrl: z.string().url().optional().or(z.literal("")),
  categoryIds: z.array(z.string()).default([]),
});
