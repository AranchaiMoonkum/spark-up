import { Button } from "./ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card"
import Image from "next/image"
import { CarouselItem } from "./ui/carousel"
import Link from "next/link"

type ProductCardProps = {
  id: number
  name: string
  price: number
  category: string
  user: {
    firstName: string
  }
  imagePath: string
}

export function ProductCard({
  id,
  name,
  price,
  category,
  user,
  imagePath,
}: ProductCardProps) {
  return (
    <CarouselItem className="md:basis-1/2 lg:basis-1/3">
      <Card className="flex overflow-hidden flex-col">
        <section className="relative w-full h-auto aspect-video">
          <Image src={imagePath} fill alt={name} />
        </section>
        <CardHeader>
          <CardTitle>{name}</CardTitle>
          <CardDescription>{price} THB</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="float-end text-sm text-muted-foreground">
            Posted by {user.firstName}
          </p>
        </CardContent>
        <CardFooter>
          <Button asChild size="lg" className="w-full">
            <Link href={`/products/${category}/${id}/`}>View a product</Link>
          </Button>
        </CardFooter>
      </Card>
    </CarouselItem>
  )
}

export function ProductCardSkeleton() {
  return (
    <CarouselItem className="md:basis-1/3">
      <Card className="overflow-hidden flex flex-col animate-pulse">
        <div className="w-full aspect-video bg-gray-300" />
        <CardHeader>
          <CardTitle>
            <div className="w-3/4 h-6 rounded-full bg-gray-300" />
          </CardTitle>
          <CardDescription>
            <div className="w-1/2 h-4 rounded-full bg-gray-300" />
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="w-full h-4 rounded-full bg-gray-300" />
          <div className="w-full h-4 rounded-full bg-gray-300" />
          <div className="w-3/4 h-4 rounded-full bg-gray-300" />
        </CardContent>
        <CardFooter>
          <Button className="w-full" disabled size="lg"></Button>
        </CardFooter>
      </Card>
    </CarouselItem>
  )
}
