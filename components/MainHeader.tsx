"use client"

import Link from "next/link"
import { useSession } from "next-auth/react"
import { CircleUserRound } from "lucide-react"

export default function MainHeader() {
  const { data: session, status } = useSession()

  return (
    <header className="top-0 fixed bg-white flex items-center justify-between z-50 w-full h-[76px] py-1 px-16 border-b border-[#00000020]">
      {/* Menu left */}
      <section className="flex items-center h-full w-full p-0 m-0 overflow-x-hidden">
        <div className="pl-12">
          <Link href="/" className="text-3xl font-bold">
            SparkUpIT
          </Link>
        </div>
      </section>

      {/* Menu right */}
      <section className="flex items-center h-full w-full justify-end">
        {status === "authenticated" && session?.user.role === "USER" ? (
          <>
            <Link href="/user/profile">
              <CircleUserRound />
            </Link>
          </>
        ) : (
          <>
            <Link href="/signin" className="whitespace-nowrap font-light">
              Sign In
            </Link>
            <Link href="/signup" className="whitespace-nowrap font-light ml-5">
              Sign Up
            </Link>
          </>
        )}
      </section>
    </header>
  )
}
