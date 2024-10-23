"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import ProductForm from "../_components/ProductForm"

export default function AddProductPage() {
  return (
    <article className="grid grid-cols-12 gap-5 mt-[100px]">
      <Card className="col-start-1 col-end-12 pt-5">
        <CardHeader>
          <CardTitle>Add your product</CardTitle>
        </CardHeader>
        <CardContent>
          <ProductForm />
        </CardContent>
      </Card>
    </article>
  )
}
