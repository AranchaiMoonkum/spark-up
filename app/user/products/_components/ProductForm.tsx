"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { addProduct, updateProduct } from "../../_actions/products"
import { useFormState, useFormStatus } from "react-dom"
import { Product } from "@prisma/client"
import Image from "next/image"

export default function ProductForm({ product }: { product?: Product | null }) {
  // Form error handling
  const [error, action] = useFormState(
    product == null ? addProduct : updateProduct.bind(null, product.id),
    {}
  )

  // Session handling
  const { data: session, status } = useSession()

  // Router handling
  const router = useRouter()

  // Category state
  const [category, setCategory] = useState("")

  // Redirect to sign in page if unauthenticated
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/signin")
    }
  }, [status, router])

  // Category change handler
  const handleCategoryChange = (value: string) => {
    setCategory(value)
  }

  return (
    <form action={action} className="space-y-4">
      {/* Product name */}
      <section className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input
          type="text"
          id="name"
          name="name"
          required
          defaultValue={product?.name || ""}
        />
        {error.name && <p className="text-destructive">{error.name}</p>}
      </section>

      {/* Product description */}
      <section className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          name="description"
          required
          defaultValue={product?.description || ""}
        />
        {error.description && (
          <p className="text-destructive">{error.description}</p>
        )}
      </section>

      {/* Product price */}
      <section className="space-y-2">
        <Label htmlFor="price">Price</Label>
        <Input
          type="number"
          id="price"
          name="price"
          required
          defaultValue={product?.price}
        />
        {error.price && <p className="text-destructive">{error.price}</p>}
      </section>

      {/* Product image */}
      <section className="space-y-2">
        <Label htmlFor="image">Image</Label>
        <Input
          className=" cursor-pointer"
          type="file"
          id="image"
          accept="image/*"
          name="image"
          required={product == null}
        />
        {product != null && (
          <Image
            src={product.imagePath}
            alt={product.name}
            width={500}
            height={500}
          />
        )}
        {error.image && <p className="text-destructive">{error.image}</p>}
      </section>

      {/* Product category */}
      <section className="space-y-2">
        <Label htmlFor="category">Category</Label>
        <Select
          onValueChange={handleCategoryChange}
          defaultValue={product?.category}
          required
        >
          <SelectTrigger>
            <SelectValue placeholder="Select a category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Laptop">Laptop</SelectItem>
            <SelectItem value="Headphone">Headphone</SelectItem>
            <SelectItem value="Mouse">Mouse</SelectItem>
            <SelectItem value="Keyboard">Keyboard</SelectItem>
          </SelectContent>
        </Select>
        <Input type="hidden" id="category" name="category" value={category} />
        {error.category && <p className="text-destructive">{error.category}</p>}
      </section>

      {/* Submit button */}
      <section className="space-y-2">
        <SubmitButton />
      </section>
    </form>
  )
}

function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <Button type="submit" className="w-full block" disabled={pending}>
      {pending ? "Saving..." : "Save"}
    </Button>
  )
}
