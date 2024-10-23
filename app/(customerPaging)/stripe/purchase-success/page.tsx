import { prisma } from "@/lib/prisma"
import Image from "next/image"
import { notFound } from "next/navigation"
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string)

export default async function SuccessPage({
  searchParams,
}: {
  searchParams: { payment_intent: string }
}) {
  const paymentIntent = await stripe.paymentIntents.retrieve(
    searchParams.payment_intent
  )

  if (paymentIntent.metadata.productId == null) return notFound()

  const product = await prisma.product.findUnique({
    where: { id: parseInt(paymentIntent.metadata.productId, 10) },
  })

  if (product == null) return notFound()

  const isSuccess = paymentIntent.status === "succeeded"

  return (
    <article className="max-w-5xl w-full mx-auto space-y-8">
      <h1 className="text-4xl font-bold">
        {isSuccess ? "Success!" : "Error!"}
      </h1>
      <div className="flex gap-4 items-center">
        <section className="aspect-video flex-shrink-0 w-1/3 relative">
          <Image
            fill
            src={product.imagePath}
            alt={product.name}
            className="object-cover"
          />
        </section>
        <div>
          <section>
            <p className="text-lg font-light text-muted-foreground">
              {product.price} THB
            </p>
          </section>
          <section>
            <h2 className="text-2xl font-semibold">{product.name}</h2>
          </section>
          <section>
            <p className="text-lg font-light text-muted-foreground">
              {product.description}
            </p>
          </section>
        </div>
      </div>
    </article>
  )
}
