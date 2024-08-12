import { z } from "zod";
const LoginSchema = z.object({
  email: z
    .string()
    .min(1, "email is required")
    .email({ message: "Invalid Email" }),
  password: z.string().min(5, "password must be atleast 5 characters"),
});
export default LoginSchema;
