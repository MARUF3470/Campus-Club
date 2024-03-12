import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer'

export const POST = async (req) => {
    try {
        const { stripeID, message, email, name } = await req.json()
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            host: "smtp.gmail.com",
            port: 465,
            secure: true, // Use `true` for port 465, `false` for all other ports,
            auth: {
                user: process.env.NEXT_PUBLIC_EMAIL,
                pass: process.env.NEXT_PUBLIC_PASSWORD,
            },

        });

        const mailOptions = {
            from: process.env.NEXT_PUBLIC_EMAIL,
            to: email,
            subject: "Payment Confirmation",
            html: `
        <h4>Hello ${name}</h4>
        <p>You successfully completed the payment for your ${message}</p>
        <p>Your stripe payment ID: ${stripeID}</p>
        `
        }

        await transporter.sendMail(mailOptions)

        return NextResponse.json({ message: 'Email send successfully' }, { status: 200 })
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: 'Error send Failed' }, { status: 500 })
    }
}