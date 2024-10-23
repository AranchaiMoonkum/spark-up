"use server"

import { prisma } from "@/lib/prisma"
import { SignUpSchema } from "@/schemas"
import { NextRequest, NextResponse } from "next/server"
import bcrypt from "bcrypt"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, password } = SignUpSchema.parse(body)

    // Check if the email is already in use
    const existingUser = await prisma.user.findUnique({
      where: { email },
    })

    // If the email is already in use, return an error
    if (existingUser) {
      return NextResponse.json(
        { message: "Email is already in use" },
        { status: 409 }
      )
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Create a new user
    const newUser = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    })

    // Return a success message
    return NextResponse.json(
      { user: newUser, message: "User created successfully" },
      { status: 201 }
    )
  } catch (error) {
    // Return an error message
    return NextResponse.json({ message: "An error occurred" }, { status: 500 })
  }
}
