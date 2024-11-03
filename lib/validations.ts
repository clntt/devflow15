import { z } from "zod";

export const SignInSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required." })
    .email({ message: "Please provide a valid email address." }),

  password: z
    .string()
    .min(6, { message: "Password must be atleast 6 characters long." })
    .max(100, { message: "Password must be at most 100 characters long." }),
});

export const SignUpSchema = z.object({
  username: z
    .string()
    .min(3, { message: "Username must be atleast 3 characters long." })
    .max(30, { message: "Username must be at most 30 characters long." })
    .regex(/^[a-zA-Z0-9_]*$/, {
      message: "Username must only contain letters, numbers, and underscores.",
    }),

  name: z
    .string()
    .min(1, { message: "Name is required." })
    .max(50, { message: "Name must be at most 50 characters long." })
    .regex(/^[a-zA-Z\s]*$/, {
      message: "Name must only contain letters and spaces.",
    }),

  email: z
    .string()
    .min(1, { message: "Email is required." })
    .max(100, { message: "Email must be at most 100 characters long." })
    .email({ message: "Please provide a valid email address." })
    .regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, {
      message: "Please provide a valid email address.",
    }),

  password: z
    .string()
    .min(6, { message: "Password must be atleast 6 characters long." })
    .max(100, { message: "Password must be at most 100 characters long." })
    .regex(/^[a-zA-Z0-9]*$/, {
      message: "Password must only contain letters and numbers.",
    })
    .regex(/^(?=.*[a-z])/, {
      message: "Password must contain atleast one lowercase letter.",
    })
    .regex(/^(?=.*[A-Z])/, {
      message: "Password must contain atleast one uppercase letter.",
    })
    .regex(/^(?=.*[0-9])/, {
      message: "Password must contain atleast one number.",
    }),
});