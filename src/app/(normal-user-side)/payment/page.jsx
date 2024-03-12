"use client";
import { Elements } from "@stripe/react-stripe-js";
import React, { useState } from "react";
import CheckoutForm from "../../components/sharedComponents/CheckoutForm";
import { loadStripe } from "@stripe/stripe-js";
import Link from "next/link";
const PaymentPage = ({ searchParams }) => {
  const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
  );

  const { id, email, name, message, amount, paymentId } = searchParams;
  const [stripeID, setStripeID] = useState();

  return (
    <div className="w-1/3 mx-auto">
      <h6 className="text-md font-semibold mb-3">Hello {name}</h6>
      <p className="text-sm mb-3">Do you want to pay for {message}</p>
      <p className="text-sm mb-10">
        You will get your Stripe Payment ID in {email}
      </p>
      {stripeID ? (
        <div>
          <p className="text-center text-sm text-green-500 my-10">
            Payment succeeded, TransactionId:
            <span className="font-semibold text-sm text-blue-700">
              {" "}
              {stripeID}
            </span>
          </p>
          <Link href="/" className="link-primary underline">
            Go Back to Home
          </Link>
        </div>
      ) : (
        <Elements stripe={stripePromise}>
          <CheckoutForm
            amount={amount}
            paymentId={paymentId}
            message={message}
            email={email}
            name={name}
            setStripeID={setStripeID}
          />
        </Elements>
      )}
    </div>
  );
};

export default PaymentPage;
