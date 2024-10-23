import { ProductCard, ProductCardSkeleton } from "@/components/ProductCard"
import { Carousel, CarouselContent } from "@/components/ui/carousel"
import { prisma } from "@/lib/prisma"
import { Suspense } from "react"

function getProductsByCategory(category: string) {
  return prisma.product.findMany({
    where: { category, isActive: true },
    orderBy: { name: "asc" },
    // Get user who created the product
    include: {
      user: true,
    },
  })
}

export default function LaptopPage() {
  return (
    <Carousel>
      <CarouselContent>
        <Suspense
          fallback={
            <>
              <ProductCardSkeleton />
              <ProductCardSkeleton />
              <ProductCardSkeleton />
            </>
          }
        >
          <ProductsSuspense />
        </Suspense>
      </CarouselContent>
    </Carousel>
  )
}

async function ProductsSuspense() {
  const products = await getProductsByCategory("Laptop")

  return products.map((product) => (
    <ProductCard key={product.id} {...product} />
  ))
}
