
import { hash } from "bcrypt"
import { NextResponse } from "next/server"
import db from "../../../lib/db"

export const POST = async (req) => {
    try {
        const body = await req.json()
        const { name, username, isAdmin, email, password } = body
        // check if the email is already exist
        const existingUserByEmail = await db.user.findUnique({
            where: { email: email }
        })
        if (existingUserByEmail) {
            return NextResponse.json({ user: null, message: 'This user already have an account.' }, { status: 409 })
        }
        // check if the email is already exist
        const existingUserByUserName = await db.user.findUnique({
            where: { username: username }
        })
        if (existingUserByUserName) {
            return NextResponse.json({ user: null, message: 'This user already have an account.' }, { status: 409 })
        }

        // encrypting the password
        const hashedPassword = await hash(password, 10)
        const newUser = await db.user.create({
            data: {
                username, name, email, isAdmin, password: hashedPassword
            }
        })
        const { password: newUserPassword, ...rest } = newUser
        return NextResponse.json({ user: rest, message: 'user created successfully' }, { status: 201 })
    } catch (error) {
        return NextResponse.json({ message: error.message }, { status: 500 })
    }
}