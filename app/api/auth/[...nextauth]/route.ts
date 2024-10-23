import NextAuth, { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { PrismaClient } from "@prisma/client"
import bcrypt, { compare } from "bcrypt"

const prisma = new PrismaClient()

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        // Check if the email is valid 
        const existingEmail = await prisma.user.findUnique({
          where: { email: credentials.email },
        })

        if (!existingEmail) {
          return null
        }

        // Check if password is correct
        const passwordMatch = await compare(
            credentials.password,
            existingEmail.password
        )

        if (!passwordMatch) {
            return null
        }

        // Receive email and password from the credentials
        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        })

        if (
          user &&
          (await bcrypt.compare(credentials.password, user.password))
        ) {
          return {
            id: user.id,
            email: user.email,
            role: user.role,
          }
        } else {
          throw new Error("Invalid email or password")
        }
      },
    }),
  ],
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user, account }) {
      if (user) {
        token.id = user.id
        token.email = user.email as string
        token.role = user.role
      }

      if (account) {
        token.accessToken = account.access_token as string
      }

      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id
        session.user.email = token.email
        session.user.role = token.role
      }

      return session
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
