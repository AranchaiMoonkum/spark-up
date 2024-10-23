"use client"

import { DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { useTransition } from "react"
import { deleteProduct, toggleProductActive } from "../../_actions/products"
import { useRouter } from "next/navigation"

export function ActiveToggleDropdownItem({
  id,
  isActive,
}: {
  id: number
  isActive: boolean
}) {
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  return (
    <DropdownMenuItem
      disabled={isPending}
      onClick={() => {
        startTransition(async () => {
          await toggleProductActive(id, !isActive)
          router.refresh()
        })
      }}
    >
      {isActive ? "Deactivate" : "Activate"}
    </DropdownMenuItem>
  )
}

export function DeleteProductDropdownItem({
  id,
  disabled,
}: {
  id: number
  disabled: boolean
}) {
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  return (
    <DropdownMenuItem
      variant="destructive"
      disabled={disabled || isPending}
      onClick={() => {
        startTransition(async () => {
          await deleteProduct(id)
          router.refresh()
        })
      }}
    >
      Delete
    </DropdownMenuItem>
  )
}
