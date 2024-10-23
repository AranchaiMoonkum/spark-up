"use client"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Elements,
  LinkAuthenticationElement,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import Image from "next/image"
import { FormEvent, useState } from "react"

type CheckoutFormProps = {
  product: {
    id: number
    imagePath: string
    name: string
    price: number
    description: string | null
  }
  clientSecret: string
}

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string
)
export function CheckoutForm({ product, clientSecret }: CheckoutFormProps) {
  return (
    <>
      <article className="max-w-5xl w-full mx-auto space-y-8">
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
        <Elements options={{ clientSecret }} stripe={stripePromise}>
          <Form price={product.price} productId={product.id} />
        </Elements>
      </article>
    </>
  )
}

function Form({ price, productId }: { price: number; productId: number }) {
  const stripe = useStripe()
  const elements = useElements()
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string>()
  const [email, setEmail] = useState<string>()

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()

    if (stripe == null || elements == null || email == null) return

    setIsLoading(true)

    // Check if the card element is available
    stripe
      .confirmPayment({
        elements,
        confirmParams: {
          return_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/stripe/purchase-success`,
        },
      })
      .then(({ error }) => {
        if (error.type === "card_error" || error.type === "validation_error") {
          setErrorMessage(error.message)
        } else {
          setErrorMessage("An unknown error occurred")
        }
      })
      .finally(() => setIsLoading(false))
  }

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardHeader>
          <CardTitle>Checkout</CardTitle>
          {errorMessage && (
            <CardDescription className="text-destructive">
              {errorMessage}
            </CardDescription>
          )}
        </CardHeader>
        <CardContent>
          <PaymentElement />
          <div className="mt-4">
            <LinkAuthenticationElement
              onChange={(e) => setEmail(e.value.email)}
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button
            className="w-full"
            size="lg"
            disabled={stripe == null || elements == null || isLoading}
          >
            {isLoading ? "Purchasing..." : `Purchase - ${price} THB`}
          </Button>
        </CardFooter>
      </Card>
    </form>
  )
}
