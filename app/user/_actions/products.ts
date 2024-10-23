"use server"

import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { z } from "zod"
import fs from "fs/promises"
import { notFound, redirect } from "next/navigation"

const fileSchema = z.instanceof(File, { message: "Required" })
const imageSchema = fileSchema.refine(
  (file) => file.size === 0 || file.type.startsWith("image/")
)

const addProductSchema = z.object({
  name: z.string().min(1, "Product name is required"),
  description: z.string().min(1, "Product description is required"),
  price: z.coerce.number().min(1, "Product price must be greater than 1"),
  category: z.string({
    required_error: "Please select a category to continue",
  }),
  image: imageSchema.refine((file) => file.size > 0, "Required"),
})

export async function addProduct(prevState: unknown, formData: FormData) {
  const result = addProductSchema.safeParse(
    Object.fromEntries(formData.entries())
  )

  if (result.success === false) {
    return result.error.formErrors.fieldErrors
  }

  const data = result.data

  fs.mkdir("public/products", { recursive: true })
  const imagePath = `/products/${crypto.randomUUID()}-${data.image.name}`
  await fs.writeFile(
    `public${imagePath}`,
    Buffer.from(await data.image.arrayBuffer())
  )

  const session = await getServerSession(authOptions)

  await prisma.product.create({
    data: {
      isActive: false,
      name: data.name,
      description: data.description,
      price: data.price,
      category: data.category,
      imagePath,
      user: {
        connect: {
          id: session?.user.id,
        },
      },
    },
  })

  redirect("/user/products")
}

const updateProductSchema = addProductSchema.extend({
  image: imageSchema.optional(),
})

export async function updateProduct(
  id: number,
  prevState: unknown,
  formData: FormData
) {
  const result = updateProductSchema.safeParse(
    Object.fromEntries(formData.entries())
  )

  if (result.success === false) {
    return result.error.formErrors.fieldErrors
  }

  const data = result.data
  const product = await prisma.product.findUnique({
    where: { id },
  })

  if (product == null) return notFound()

  let imagePath = product.imagePath
  if (data.image != null && data.image.size > 0) {
    await fs.unlink(`public${product.imagePath}`)
    imagePath = `/products/${crypto.randomUUID()}-${data.image.name}`
    await fs.writeFile(
      `public${imagePath}`,
      Buffer.from(await data.image.arrayBuffer())
    )
  }

  const session = await getServerSession(authOptions)

  await prisma.product.update({
    where: { id },
    data: {
      name: data.name,
      description: data.description,
      price: data.price,
      category: data.category,
      imagePath,
      user: {
        connect: {
          id: session?.user.id,
        },
      },
    },
  })

  redirect("/user/products")
}

export async function toggleProductActive(id: number, isActive: boolean) {
  await prisma.product.update({
    where: { id },
    data: { isActive },
  })
}

export async function deleteProduct(id: number) {
  const product = await prisma.product.delete({
    where: { id },
  })

  if (product == null) return notFound()

  await fs.unlink(`public${product.imagePath}`)
}
