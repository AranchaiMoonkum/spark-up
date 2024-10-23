import type { Metadata } from "next"
import localFont from "next/font/local"
import "./globals.css"
import HeaderSwitcher from "@/components/HeaderSwitcher"
import { getServerSession } from "next-auth"
import SessionProvider from "@/components/SessionProvider"

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
})

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
})

export const metadata: Metadata = {
  title: "SparkUp IT",
  description: "",
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const session = await getServerSession()

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SessionProvider session={session}>
          <HeaderSwitcher />
          <main className="container mx-auto px-24 mt-[100px] mb-6">
            {children}
          </main>
        </SessionProvider>
      </body>
    </html>
  )
}
