import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import Image from "next/image"
import Link from "next/link"

export default async function ViewProductPage({
  params: { id },
}: {
  params: { id: string }
}) {
  // Parse the product ID
  const productId = parseInt(id, 10)

  const product = await prisma.product.findUnique({
    where: { id: productId },
  })

  // Get the session
  const session = await getServerSession()

  return (
    <article className="flex flex-col gap-4">
      <section>
        <h2 className="font-semibold text-2xl">{product?.name}</h2>
      </section>

      <section className="flex flex-row gap-4">
        <div>
          <Image
            src={product?.imagePath || "No image"}
            alt={product?.name || "Product image"}
            width={800}
            height={600}
          />
        </div>
        <div>
          <Card>
            <CardHeader>
              <CardTitle>{product?.name}</CardTitle>
              <CardDescription>Price: {product?.price} THB</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full" asChild>
                <Link href={session ? `/products/${id}/purchase` : `/signin`}>
                  Purchase
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      <section>
        <h2 className="font-semibold text-2xl">Product details</h2>
        <p className="font-light text-sm text-muted-foreground">
          {product?.description}
        </p>
      </section>
    </article>
  )
}
