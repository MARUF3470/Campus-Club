import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import db from "./db";
import { compare } from "bcrypt";
export const authOptions = {
    adapter: PrismaAdapter(db),
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: 'jwt'
    },
    pages: {
        signIn: "/authentication",
    },
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: {},
                password: {}
            },
            async authorize(credentials) {
                if (!credentials.email || !credentials.password) {
                    return null
                }

                const existingUser = await db.user.findUnique({
                    where: { email: credentials.email }
                })

                if (!existingUser) {
                    throw new Error('No user found with this email')
                }

                // as we encypt the password using bcrypt, we need to decrypt the password to compare
                const passwordMatch = await compare(credentials.password, existingUser.password)

                if (!passwordMatch) {
                    throw new Error('Password Invalid')
                }

                return {
                    id: `${existingUser.id}`,
                    username: existingUser.username,
                    name: existingUser.name,
                    email: existingUser.email,
                    isAdmin: existingUser.isAdmin
                }
            }
        })
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                return {
                    ...token,
                    username: user.username
                }
            }
            return token
        },
        async session({ session, token }) {
            return {
                ...session,
                user: {
                    ...session.user,
                    username: token.username
                }
            }

        }
    }
}