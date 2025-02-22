import { z } from "zod";

// Validation schema for login
export const loginSchema = z.object({
  email: z.string().trim().email({ message: "Invalid email format" }),
  password: z
    .string()
    .trim()
    .min(8, { message: "Password must be at least 8 characters long" })
    .min(1, { message: "Password cannot be empty or spaces only" }),
});

// Data type derived from the schema to be used in the form
export type LoginSchemaType = z.infer<typeof loginSchema>;

// Validation schema for register
export const registerSchema = z
  .object({
    userName: z.string().trim().min(1, { message: "Username cannot be empty" }),
    email: z.string().trim().email({ message: "Invalid Email format" }),
    password: z.string().trim().min(8, { message: "Password must be at least 8 characters long" }),
    confirmPassword: z.string().trim().min(8, { message: "Password must be at least 8 characters long" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

// Data type derived from the schema to be used in the form
export type RegisterSchemaType = z.infer<typeof registerSchema>;

export const forgotPasswordSchema = z.object({
  email: z.string().trim().email({ message: "Invalid email format" }),
});

export type ForgotPasswordSchemaType = z.infer<typeof forgotPasswordSchema>;

// Validation schema for reset password
export const resetPasswordSchema = z
  .object({
    password: z.string().trim().min(8, { message: "Password must be at least 8 characters long" }),
    confirmPassword: z.string().trim().min(8, { message: "Password must be at least 8 characters long" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

// Data type derived from the schema to be used in the form
export type ResetPasswordSchemaType = z.infer<typeof resetPasswordSchema>;
