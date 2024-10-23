"use client"

import { SignInSchema } from "@/schemas"
import { zodResolver } from "@hookform/resolvers/zod"
import { SubmitHandler, useForm } from "react-hook-form"
import { z } from "zod"
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { MoveUpRight } from "lucide-react"
import { useState } from "react"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"

export default function SignInForm() {
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  const signInForm = useForm<z.infer<typeof SignInSchema>>({
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const router = useRouter()

  const onSubmit: SubmitHandler<z.infer<typeof SignInSchema>> = async (data, e: any) => {
    // Making a submit button cannot refresh the page
    e.preventDefault()

    try {
      const signInData = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false
      })

      if (signInData?.error) {
        setError(signInData.error)

        return
      }

      // Set the success message
      setSuccess("Signed in successfully")

      // Redirect to the sign in page
      await new Promise((resolve) => setTimeout(resolve, 2000))
      router.push("/user/profile")
    } catch (error) {
      setError("An error occurred")
    }
  }

  return (
    <Form {...signInForm}>
      <form onSubmit={signInForm.handleSubmit(onSubmit)} className="space-y-5">
        {/* Add the email field */}
        <FormField
          control={signInForm.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel style={{ color: "inherit" }}>Email</FormLabel>
              <FormControl>
                <Input placeholder="john.doe@exmaple.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Add the password field */}
        <FormField
          control={signInForm.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex flex-row justify-between" style={{ color: "inherit" }}>
                Password
              </FormLabel>
              <FormControl>
                <Input placeholder="**********" type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Add the error message */}
        {error && (
          <p className="block bg-red-200 p-3 border border-red-400 text-red-500 text-sm">{error}</p>
        )}

        {/* Add the success message */}
        {success && (
          <p className="block bg-green-200 p-3 border border-green-400 text-green-500 text-sm">{success}</p>
        )}

        {/* Add the submit button */}
        <Button type="submit">
          Sign Up
          <MoveUpRight className="ml-2 h-4 w-4" />
        </Button>
      </form>
    </Form >
  )
}

//import { useState } from "react"
//import {
//  Tooltip,
//  TooltipProvider,
//  TooltipContent,
//  TooltipTrigger,
//} from "@/components/ui/tooltip"
//import { Eye, EyeOff, MoveUpRight } from "lucide-react"
//import z from "zod"
//import { useForm } from "react-hook-form"
//import { zodResolver } from "@hookform/resolvers/zod"
//import { signIn } from "next-auth/react"
//import { useRouter } from "next/navigation"
//
//const SignInFormSchema = z.object({
//  email: z.string().email({ message: "Invalid email" }).min(1, { message: "Required an email" }),
//  password: z.string().min(1, { message: "Required a password" }),
//})
//
//type SignInFormType = z.infer<typeof SignInFormSchema>
//
//export default function SignInForm() {
//  // Form validation
//  const {
//    register,
//    handleSubmit,
//    formState: { errors },
//  } = useForm<SignInFormType>({
//    resolver: zodResolver(SignInFormSchema),
//    defaultValues: {
//      email: "",
//      password: "",
//    },
//  })
//
//  // Create router path
//  const router = useRouter()
//
//  // Form submission
//  const onSubmit = async (data: SignInFormType, e: any) => {
//    e.preventDefault()
//
//    try {
//      const signInData = await signIn("credentials", {
//        email: data.email,
//        password: data.password,
//        redirect: false
//      })
//
//      if (signInData?.error) {
//        console.error("Sign in failed")
//
//        return false
//      }
//
//      return router.push("/")
//    } catch (error) {
//      console.log("Error", error)
//    }
//
//
//  }
//
//  // Toggle password visibility
//  const [show, setShow] = useState(false)
//  const toggleShow = () => setShow(!show)
//
//  return (
//    <form className="flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
//      <div className="w-full relative inline-flex flex-col-reverse gap-2">
//        {/* Email error */}
//        {errors.email && <p className="text-red-400 text-sm">{errors.email.message}</p>}
//
//        {/* Email input */}
//        <section className="relative">
//          <input
//            className="w-full border-muted border-[1px] leadeing-4 p-4 font-light focus:outline-none"
//            type="email"
//            placeholder="Email"
//            {...register("email")}
//          />
//        </section>
//
//        {/* Email label */}
//        <section className="inline-flex w-ull m-0">
//          <label className="m-0 font-light text-sm">Email</label>
//          <span className="mx-1 font-light text-sm text-red-400">*</span>
//        </section>
//      </div>
//
//      <div className="w-full relative inline-flex flex-col-reverse gap-2">
//        {/* Password error */}
//        {errors.password && <p className="text-red-400 text-sm">{errors.password.message}</p>}
//
//        {/* Password input */}
//        <section className="relative">
//          <input
//            className="w-full border-muted border-[1px] leading-4 p-4 font-light focus:outline-none"
//            type={show ? "text" : "password"}
//            placeholder="Password"
//            {...register("password")}
//          />
//        </section>
//
//        {/* Password label */}
//        <section className="inline-flex w-full m-0">
//          <label className="m-0 font-light text-sm">Password</label>
//          <span className="mx-1 font-light text-sm text-red-400">*</span>
//
//          {/* Hide & Show password */}
//          <div className="flex ml-auto items-center gap-2">
//            <TooltipProvider>
//              <Tooltip>
//                <TooltipTrigger asChild>
//                  <p
//                    onClick={toggleShow}
//                    className="flex relative cursor-pointer rounded-sm"
//                  >
//                    {show ? (
//                      <Eye className="w-4 h-4 align-middle" />
//                    ) : (
//                      <EyeOff className="w-4 h-4 align-middle" />
//                    )}
//                  </p>
//                </TooltipTrigger>
//                <TooltipContent>
//                  <p>{show ? "Hide" : "Show"}</p>
//                </TooltipContent>
//              </Tooltip>
//            </TooltipProvider>
//          </div>
//        </section>
//      </div>
//      <div>
//        <button
//          type="submit"
//          className=" rounded-[1px] border-primary bg-primary text-primary-foreground cursor-pointer inline-flex relative py-2 px-4 h-10"
//        >
//          <div className="relative flex items-center w-full z-[1]">
//            <p className="font-base leading-[1.4]">Signup</p>
//            <span className="w-3 h-4"></span>
//            <MoveUpRight className="h-4 w-4 relative shrink-0 align-middlee" />
//          </div>
//        </button>
//      </div>
//    </form>
//  )
//}
