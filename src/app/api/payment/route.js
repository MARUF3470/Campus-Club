import { NextResponse } from "next/server";
import db from "../../../lib/db";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
export const POST = async (req) => {
    const body = await req.json()
    const { id, amount, message } = body
    console.log(id, amount, message);
    const convertedAmount = amount * 100 // converting the body amount into cents
    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount: convertedAmount,
            currency: 'usd',
            payment_method_types: ['card'],
        });
        console.log("Payment intent:", paymentIntent);
        // Return a success response
        if (message.includes('Registration')) {
            await db.payment.update({
                where: { id: id },
                data: {
                    membershipFee: paymentIntent?.id
                }
            })
        }
        if (message.includes('T-shirt')) {
            await db.payment.update({
                where: { id: id },
                data: {
                    tShirtFee: paymentIntent?.id
                }
            })
        }
        return NextResponse.json({
            status: 200,
            body: {
                message: "Payment successful",
                stripePaymentID: paymentIntent?.id,
            }
        })
    } catch (error) {
        console.error("Error processing payment:", error);
        // Return an error response
        return NextResponse.json({
            status: 500,
            body: {
                error: "Payment processing failed",
            },
        })
    }
}