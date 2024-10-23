"ues client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { prisma } from "@/lib/prisma"
import ProductForm from "../../_components/ProductForm"

export default async function UpdateProductPage({
  params: { id },
}: {
  params: { id: string }
}) {
  // Parse the product ID
  const productId = parseInt(id, 10)

  const product = await prisma.product.findUnique({
    where: { id: productId },
  })

  return (
    <article className="grid grid-cols-12 gap-5 mt-[100px]">
      <Card className="col-start-1 col-end-12 pt-5">
        <CardHeader>
          <CardTitle>Edit your product</CardTitle>
        </CardHeader>
        <CardContent>
          <ProductForm product={product} />
        </CardContent>
      </Card>
    </article>
  )
}
