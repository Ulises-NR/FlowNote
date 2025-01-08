import { z } from "zod";

export const registerSchema = z.object({
  username: z
    .string({
      invalid_type_error: "Name must be a string of characters",
      required_error: "Name is required",
    })
    .min(4, {
      message: "Name must contain at least 4 characters",
    })
    .max(30, {
      message: "Name cannot exceed 30 characters",
    }),
  email: z
    .string({
      invalid_type_error: "Email must be a valid character string",
      required_error: "Email is a required field",
    })
    .email({
      message: "Email is not valid",
    }),
  password: z
    .string({
      invalid_type_error: "Password must be a string of characters",
      required_error: "Password is required",
    })
    .min(8, {
      message: "Password must contain at least 8 characters",
    })
    .max(30, {
      message: "Password cannot exceed 30 characters",
    }),
});

export const loginSchema = z.object({
  email: z
    .string({
      invalid_type_error: "Email must be a valid character string",
      required_error: "Email is a required field",
    })
    .email({
      message: "Email is not valid",
    }),
  password: z
    .string({
      invalid_type_error: "Password must be a string of characters",
      required_error: "Password is required",
    })
    .min(8, {
      message: "Password must contain at least 8 characters",
    })
    .max(30, {
      message: "Password cannot exceed 30 characters",
    }),
});
