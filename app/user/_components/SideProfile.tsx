import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { signOut } from "next-auth/react"
import Link from "next/link"

export default function SideProfile() {
  return (
    <Card className="col-start-1 col-end-3">
      <CardHeader>
        <h1 className="text-md font-bold pb-1">Menu</h1>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {/* Edit your profile */}
          <li className="text-sm font-light border-b pb-2">
            <Link href="/user/profile">Edit your profile</Link>
          </li>

          {/* View products */}
          <li className="text-sm font-light border-b pb-2">
            <Link href="/user/products/">View products</Link>
          </li>

          {/* Sign out */}
          <li
            className="text-sm font-light cursor-pointer"
            onClick={() => signOut()}
          >
            Sign out
          </li>
        </ul>
      </CardContent>
    </Card>
  )
}
