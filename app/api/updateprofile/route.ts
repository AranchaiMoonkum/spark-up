import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { NextRequest, NextResponse } from "next/server"
import * as z from "zod"
import { authOptions } from "../auth/[...nextauth]/route"

const UpdateFormSchema = z.object({
  firstName: z.string().min(1, { message: "Required a first name" }),
  lastName: z.string().min(1, { message: "Required a last name" }),
  address: z.string().min(1, { message: "Required an address" }),
  telephone: z.string().min(10, { message: "Required a telephone" }),
})

export async function PUT(req: NextRequest) {
  const session = await getServerSession(authOptions)

  if (!session?.user.email) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
  }

  try {
    const body = await req.json()
    const { firstName, lastName, address, telephone } =
      UpdateFormSchema.parse(body)

    const updateUserProfile = await prisma.user.update({
      where: {
        email: session.user.email,
      },
      data: {
        firstName: firstName,
        lastName: lastName,
        address: address,
        tel: telephone,
      },
    })

    return NextResponse.json(
      {
        message: "User profile updated successfully",
        userProfile: updateUserProfile,
      },
      { status: 200 }
    )
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    )
  }
}
