import { NextResponse } from "next/server";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export const POST = async (req) => {
    const amount = await req.json()
    console.log('amount__________________________>', parseInt(amount));
    const convertedAmount = parseInt(amount) * 100  // converting the amount into cents
    console.log(amount, convertedAmount);
    // Create a PaymentIntent with the order amount and currency
    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount: convertedAmount,
            currency: "usd",
            // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
            // automatic_payment_methods: {
            //     enabled: true,
            // },
            payment_method_types: ["card"],
        });
        return NextResponse.json({
            clientSecret: paymentIntent.client_secret,
        });
    } catch (error) {
        console.log('dasdasdasda', error);
        return NextResponse.json({
            error
        });
    }
}