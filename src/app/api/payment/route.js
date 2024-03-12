import { NextResponse } from "next/server";
import db from "../../../lib/db";

export const PUT = async (req) => {
    const body = await req.json()
    const { id, stripeID, message } = body

    try {

        // Return a success response
        if (message.includes('Registration')) {
            await db.payment.update({
                where: { id: id },
                data: {
                    membershipFee: stripeID
                }
            })
        }
        if (message.includes('T-shirt')) {
            await db.payment.update({
                where: { id: id },
                data: {
                    tShirtFee: stripeID
                }
            })
        }
        return NextResponse.json({
            status: 200,
            body: {
                message: "Payment successful",
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