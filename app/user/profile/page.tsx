"use client"

import SideProfile from "../_components/SideProfile"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { UpdateFormSchema } from "@/schemas"
import { zodResolver } from "@hookform/resolvers/zod"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { z } from "zod"

export default function Profile() {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/signin")
    }
  }, [status, router])

  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  const updateProfileForm = useForm<z.infer<typeof UpdateFormSchema>>({
    resolver: zodResolver(UpdateFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      address: "",
      telephone: "",
    },
  })

  const onSubmit: SubmitHandler<z.infer<typeof UpdateFormSchema>> = async (
    data
  ) => {
    try {
      // Clear the error and success messages
      setError(null)
      setSuccess(null)

      // Make a request to the server
      const response = await fetch("/api/updateprofile", {
        method: "PUT",
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
      } else {
        // Get the error message
        const { message } = await response.json()

        // Set the error message
        setError(message)
      }
    } catch (error) {
      // Set the error message
      setError("An error occurred while updating your profile")
    }
  }

  return (
    <article className="grid grid-cols-12 gap-5 mt-[100px]">
      {/* Sidebar 3 of 12 columns */}
      <SideProfile />

      <Card className="col-start-3 col-end-12 pt-5">
        <CardHeader>
          <CardTitle>My Profile</CardTitle>
          <CardDescription>Manage and protect your account</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...updateProfileForm}>
            <form
              onSubmit={updateProfileForm.handleSubmit(onSubmit)}
              className="space-y-4"
            >
              {/* Add the first name field */}
              <FormField
                control={updateProfileForm.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First name</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Aranchai" required />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Add the last name field */}
              <FormField
                control={updateProfileForm.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last name</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Moonkum" required />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Add the address field */}
              <FormField
                control={updateProfileForm.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="30/144, Lodz Street"
                        required
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Add the telephone field */}
              <FormField
                control={updateProfileForm.control}
                name="telephone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Telephone</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="09524*****" required />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Add the error message */}
              {error && (
                <p className="block bg-red-200 p-3 border border-red-400 text-red-500 text-sm">
                  {error}
                </p>
              )}

              {/* Add the success message */}
              {success && (
                <p className="block bg-green-200 p-3 border border-green-400 text-green-500 text-sm">
                  {success}
                </p>
              )}

              {/* Add the submit button */}
              <Button type="submit" className="w-full block">
                Update your profile
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </article>
  )
}
