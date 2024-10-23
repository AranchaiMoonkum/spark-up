import { prisma } from "@/lib/prisma"
import { notFound } from "next/navigation"
import Stripe from "stripe"
import { CheckoutForm } from "./_components/CheckoutForm"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string)

export default async function PurchasePage({
  params: { id },
}: {
  params: { id: string }
}) {
  // Parse the product ID
  const productId = parseInt(id, 10)

  const product = await prisma.product.findUnique({
    where: { id: productId },
  })

  if (product == null) return notFound()

  const paymentIntent = await stripe.paymentIntents.create({
    amount: product.price,
    currency: "thb",
    metadata: { productId: product.id },
  })

  if (paymentIntent.client_secret == null) {
    throw Error("Error creating payment intent")
  }

  return (
    <CheckoutForm
      product={product}
      clientSecret={paymentIntent.client_secret}
    />
  )
}
