import NextAuth, { DefaultSession, DefaultUser } from "next-auth"
import JWT from "next-auth/jwt"

declare module "next-auth/jwt" {
  interface JWT {
    id: number
    email: string
    role: string
    accessToken: string
  }
}

declare module "next-auth" {
  interface Uesr extends DefaultUser {
    id: number
  }

  interface User {
    id: number
    role: string
  }

  interface Session {
    user: {
      id: number
      email: string
      role: string
    } & DefaultSession["user"]
  }

  interface Session extends DefaultSession {
    accessToken: string
  }
}
