"use client"

import { usePathname } from "next/navigation"

import AuthHeader from "@/components/AuthHeader"
import MainHeader from "@/components/MainHeader"

export default function HeaderSwitcher() {
  const pathname = usePathname()

  const authPaths = ["/signin", "/signup"]

  if (authPaths.includes(pathname)) {
    return <AuthHeader />
  }

  return <MainHeader />
}

