import { z } from "zod";

const SignUpSchema = z.object({
  username: z.string().min(1, { message: "Username is required" }),
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Invalid email address" }),

  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" }),

  profile: z.enum(["Student", "Instructor", "Admin"], {
    required_error: "Profile is required",
  }),

  profilePicture: z
    .instanceof(File)
    .optional()
    .refine((file) => {
      if (file) {
        const allowedExtensions = ["image/jpeg", "image/png", "image/gif"];
        return allowedExtensions.includes(file.type);
      }
      return true;
    }, "Only .jpg, .png, and .gif formats are allowed."),
});

export default SignUpSchema;
