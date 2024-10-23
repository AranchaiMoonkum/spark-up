"use client"

import { SubmitHandler, useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { SignUpSchema } from "@/schemas"
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useState } from "react"
import { EyeIcon, EyeOffIcon, MoveUpRight } from "lucide-react"
import { useRouter } from "next/navigation"

export default function SignUpForm() {
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  // Show and hide password
  const [show, setShow] = useState(false)
  const toggleShow = () => setShow(!show)

  const signUpForm = useForm<z.infer<typeof SignUpSchema>>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  })

  // Create a router instance
  const route = useRouter()

  // Handle the form submission
  const onSubmit: SubmitHandler<z.infer<typeof SignUpSchema>> = async (data) => {
    try {
      // Clear the error and success messages
      setError(null)
      setSuccess(null)

      // Make a request to the server
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      // Check if the request was successful
      if (response.ok) {
        // Get the success message
        const { message } = await response.json()

        // Set the success message
        setSuccess(message)

        // Redirect to the sign in page
        await new Promise((resolve) => setTimeout(resolve, 2000))
        route.push("/signin")
      } else {
        // Get the error message
        const { message } = await response.json()

        // Set the error message
        setError(message)
      }
    } catch (error) {
      // Set the error message
      setError("An error occurred while signing up")
    }
  }

  return (
    <Form {...signUpForm}>
      <form onSubmit={signUpForm.handleSubmit(onSubmit)} className="space-y-5">
        {/* Add the email field */}
        <FormField
          control={signUpForm.control}
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
          control={signUpForm.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex flex-row justify-between" style={{ color: "inherit" }}>
                Password
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <p onClick={toggleShow} className="cursor-pointer">
                        {show ? (
                          <EyeOffIcon />
                        ) : (
                          <EyeIcon />
                        )}
                      </p>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{show ? "Hide" : "Show"}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </FormLabel>
              <FormControl>
                <Input placeholder="**********" type={show ? "text" : "password"} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Add the confirm password field */}
        <FormField
          control={signUpForm.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex flex-row justify-between" style={{ color: "inherit" }}>
                Confirm Password
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <p onClick={toggleShow} className="cursor-pointer">
                        {show ? (
                          <EyeOffIcon />
                        ) : (
                          <EyeIcon />
                        )}
                      </p>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{show ? "Hide" : "Show"}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </FormLabel>
              <FormControl>
                <Input placeholder="**********" type={show ? "text" : "password"} {...field} />
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
    </Form>
  )
}

