import {  z } from "zod";

export const newUserSchema = z.object({
  id:z.string().optional(),
  first_name: z.string().min(2, "First name must be at least 2 characters."),
  last_name: z.string().min(2, "First name must be at least 2 characters."),
  email: z.string().email("Enter a vaild email address."),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters long.",
  }),
   confirmPassword: z
      .string()
      .min(6, "Confirm password must be at least 6 characters."),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

export const loginSchema = z.object({
  email: z.string().email("Enter a vaild email address."),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters long.",
  }),
});

