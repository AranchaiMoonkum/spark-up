"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

export default function AuthHeader() {
  const pathName = usePathname()

  let dynamicText = ""

  let dynamicLink = ""

  if (pathName === "/signin") {
    dynamicText = "Sign In"
    dynamicLink = "/signin"
  } else if (pathName === "/signup") {
    dynamicText = "Sign Up"
    dynamicLink = "/signup"
  } else {
    dynamicText = "There's no path"
    dynamicLink = "/"
  }

  return (
    <header className="bg-white flex items-center justify-between z-50 w-full h-[76px] py-1 px-16 border-b border-[#00000020]">
      {/* Menu left */}
      <section className="flex items-center h-full w-full p-0 m-0 overflow-x-hidden">
        <Link href="/" className="text-3xl font-bold">
          SparkUpIT
        </Link>
        <div className="flex w-full leading-4 flex-shrink">
          <span className="text-custom-muted block flex-shrink-0 mx-2 font-light">
            /
          </span>
          <Link
            href={dynamicLink}
            className="inline-block no-underline truncate leading-5 font-light"
          >
            {dynamicText}
          </Link>
        </div>
      </section>

      {/* Menu right */}
      <section className="flex flex-1 items-center justify-end">
        <ul className="flex items-center list-none m-0 p-0">
          <li className="ml-5 w-full">
            <Link href="/signin" className="whitespace-nowrap font-light">
              Sign In
            </Link>
          </li>
          <li className="ml-5 w-full">
            <Link href="/signup" className="whitespace-nowrap font-light">
              Sign Up
            </Link>
          </li>
        </ul>
      </section>
    </header>
  )
}
