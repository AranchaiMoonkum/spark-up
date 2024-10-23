import { z } from "zod"

export const SignUpSchema = z
  .object({
    email: z
      .string()
      .email("Invalid email address")
      .min(1, "Email is required"),
    password: z
      .string()
      .min(1, "Password is required")
      .min(8, "Password should be at least 8 characters"),
    confirmPassword: z.string().min(1, "Confirm password is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  })

export const SignInSchema = z.object({
  email: z.string().email("Invalid email address").min(1, "Email is required"),
  password: z.string().min(1, "Password is required"),
})

export const UpdateFormSchema = z.object({
  firstName: z.string().min(1, { message: "Required a first name" }),
  lastName: z.string().min(1, { message: "Required a last name" }),
  address: z.string().min(1, { message: "Required an address" }),
  telephone: z.string().min(10, { message: "Required a telephone" }),
})

const fileSchema = z.instanceof(File, { message: "Required" })
const imageSchema = fileSchema.refine(
  (file) => file.size === 0 || file.type.startsWith("image/")
)

export const AddProductSchema = z.object({
  name: z.string().min(1, "Product name is required"),
  description: z.string().min(1, "Product description is required"),
  price: z.coerce.number().min(0, "Product price must be greater than 0"),
  category: z.string({
    required_error: "Please select a category to continue",
  }),
  image: imageSchema.refine((file) => file.size > 0, "Required"),
})
