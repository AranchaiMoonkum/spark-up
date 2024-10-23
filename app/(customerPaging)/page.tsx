import { ProductCard, ProductCardSkeleton } from "@/components/ProductCard"
import { Button } from "@/components/ui/button"
import { Carousel, CarouselContent } from "@/components/ui/carousel"
import { prisma } from "@/lib/prisma"
import { Product } from "@prisma/client"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { Suspense } from "react"

async function getNewestProducts() {
  return await prisma.product.findMany({
    where: {
      isActive: true,
    },
    orderBy: { createdAt: "desc" },
    take: 5,
    include: { user: true },
  })
}

// async function getNewestProducts (
//   async () => {
//     return prisma.product.findMany({
//       where: {
//         isActive: true,
//       },
//       orderBy: { createdAt: "desc" },
//       take: 5,
//       include: { user: true },
//     })
//   },
//   ["/", "getNewestProducts"],
//   { revalidate: 60 * 60 * 24 }
// )

async function getProductsByCategory(category: string) {
  return await prisma.product.findMany({
    where: {
      category,
      isActive: true,
    },
    orderBy: { createdAt: "desc" },
    take: 5,
    include: { user: true },
  })
}

// const getProductsByCategory = cache(
//   async (category: string) => {
//     return prisma.product.findMany({
//       where: {
//         category,
//         isActive: true,
//       },
//       orderBy: { createdAt: "desc" },
//       take: 5,
//       include: { user: true },
//     })
//   },
//   ["/", "getProductsByCategory"],
//   { revalidate: 60 * 60 * 24 }
// )

export default function HomePage() {
  return (
    <article className="space-y-12">
      <section className="grid gap-4">
        <NewestProductSection
          title="Newest products"
          productsFetcher={getNewestProducts}
        />
        <ProductCarouselSection
          title="Laptop"
          productsFetcher={() => getProductsByCategory("Laptop")}
          category="Laptop"
        />
        <ProductCarouselSection
          title="Headphone"
          productsFetcher={() => getProductsByCategory("Headphone")}
          category="Headphone"
        />
        <ProductCarouselSection
          title="Mouse"
          productsFetcher={() => getProductsByCategory("Mouse")}
          category="Mouse"
        />
        <ProductCarouselSection
          title="Keyboard"
          productsFetcher={() => getProductsByCategory("Keyboard")}
          category="Keyboard"
        />
      </section>
    </article>
  )
}

type ProductCarouselSection = {
  productsFetcher: () => Promise<Product[]>
  title: string
  category: string
}

type NewestProductSection = {
  productsFetcher: () => Promise<Product[]>
  title: string
}

function NewestProductSection({
  productsFetcher,
  title,
}: NewestProductSection) {
  return (
    <article className="space-y-4">
      <section className="flex gap-4 justify-between">
        <h2 className="font-semibold text-2xl">{title}</h2>
      </section>
      <section>
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
              <ProductSuspense
                productsFetcher={productsFetcher}
                title="Newest products"
                category={""}
              />
            </Suspense>
          </CarouselContent>
        </Carousel>
      </section>
    </article>
  )
}

function ProductCarouselSection({
  productsFetcher,
  title,
  category,
}: ProductCarouselSection) {
  return (
    <article className="space-y-4">
      <section className="flex gap-4 justify-between">
        <h2 className="font-semibold text-2xl">{title}</h2>
        <Button variant="outline" asChild>
          <Link href={`/products/${category}`} className="space-x-2">
            <span>View All</span>
            <ArrowRight className="size-4" />
          </Link>
        </Button>
      </section>
      <section>
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
              <ProductSuspense
                productsFetcher={productsFetcher}
                title="Newest products"
                category={""}
              />
            </Suspense>
          </CarouselContent>
        </Carousel>
      </section>
    </article>
  )
}

async function ProductSuspense({ productsFetcher }: ProductCarouselSection) {
  return (await productsFetcher()).map((product) => (
    // Fetch the user who created the product
    <ProductCard key={product.id} {...product} user={product.user} />
  ))
}
