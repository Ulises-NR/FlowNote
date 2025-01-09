import { z } from "zod";

export const createNoteSchema = z.object({
  title: z
    .string({
      invalid_type_error: "Title must be a string of characters",
      required_error: "Title is required",
    })
    .min(4, {
      message: "Title must contain at least 4 characters",
    })
    .max(30, {
      message: "Title cannot exceed 30 characters",
    }),
  content: z
    .string({
      invalid_type_error: "Title must be a string of characters",
      required_error: "Title is required",
    })
    .max(255, {
      message: "Title cannot exceed 30 characters",
    }),
});

export const updateNoteSchema = createNoteSchema.partial();
