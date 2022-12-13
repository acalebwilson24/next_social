import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import prisma from "prisma/client"
import { User } from "@prisma/client"

export const authOptions = {
    adapter: PrismaAdapter(prisma),
    // Configure one or more authentication providers
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID || "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
        }),
        // ...add more providers here
    ],
    callbacks: {
        async jwt({token, user, account, profile, isNewUser}: any) {
            user && (token.user = user)
            return token
        },
        async session({session, token, user}: any) {
            session = {
                ...session,
                user
            }
            return session
        }
    }

}
export default NextAuth(authOptions)