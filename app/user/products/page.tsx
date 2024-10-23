import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { prisma } from "@/lib/prisma"
import { CheckCircle2, MoreVertical, XCircle } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import {
  ActiveToggleDropdownItem,
  DeleteProductDropdownItem,
} from "./_components/ProductActions"
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"

export default function UserProductsPage() {
  return (
    <>
      <article className="flex justify-between items-center gap-4 mt-[100px] pb-4">
        <h1 className="font-semibold text-2xl">View Products</h1>
        <Button asChild>
          <Link href="/user/products/create">Add product</Link>
        </Button>
      </article>
      <ProductsTable />
    </>
  )
}

async function ProductsTable() {
  const session = await getServerSession(authOptions)
  const userId = session?.user.id

  const products = await prisma.product.findMany({
    where: {
      user: { id: userId },
    },
    select: {
      id: true,
      imagePath: true,
      name: true,
      price: true,
      isActive: true,
      category: true,
    },
    orderBy: { name: "asc" },
  })

  if (products.length === 0) {
    return <p>No products available</p>
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-0">
            <span className="sr-only">Is active</span>
          </TableHead>
          <TableHead>Image</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Category</TableHead>
          <TableHead className="w-0">
            <span className="sr-only">Actions</span>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {products.map((product) => (
          <TableRow key={product.id}>
            <TableCell>
              {product.isActive ? (
                <>
                  <span className="sr-only">Active</span>
                  <CheckCircle2 />
                </>
              ) : (
                <>
                  <span className="sr-only">Inactive</span>
                  <XCircle />
                </>
              )}
            </TableCell>
            <TableCell>
              <Image
                src={product.imagePath}
                alt={product.name}
                width={40}
                height={40}
                className="w-10 h-10 object-cover rounded-full"
              />
            </TableCell>
            <TableCell>{product.name}</TableCell>
            <TableCell>{product.price}</TableCell>
            <TableCell>{product.category}</TableCell>
            <TableCell>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <MoreVertical />
                  <span className="sr-only">Actions</span>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem asChild>
                    <Link href={`/user/products/${product.id}/edit`}>Edit</Link>
                  </DropdownMenuItem>
                  <ActiveToggleDropdownItem
                    id={product.id}
                    isActive={product.isActive}
                  />
                  <DropdownMenuSeparator />
                  <DeleteProductDropdownItem id={product.id} disabled={false} />
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
