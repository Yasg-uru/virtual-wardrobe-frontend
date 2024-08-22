import { z } from "zod";

const ResetPasswordSchema = z
  .object({
    token: z.string({ message: "Token is required" }),
    newPassword: z
      .string()
      .min(8, "Password must be at least 8 characters long")
      .max(128, "Password must be no more than 128 characters long")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[0-9]/, "Password must contain at least one number")
      .regex(
        /[@$!%*?&#]/,
        "Password must contain at least one special character"
      ),

    confirmPassword: z
      .string()
      .min(8, "Password must be at least 8 characters long")
      .max(128, "Password must be no more than 128 characters long"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"], // Specify which field the error message should apply to
  });

export { ResetPasswordSchema };
