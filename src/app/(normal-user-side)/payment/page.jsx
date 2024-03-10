"use client";
import { Elements } from "@stripe/react-stripe-js";
import React from "react";
import CheckoutForm from "../../components/sharedComponents/CheckoutForm";
import { loadStripe } from "@stripe/stripe-js";
const PaymentPage = ({ searchParams }) => {
  const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
  );
  console.log(searchParams);
  const { id, email, name, message, amount, paymentId } = searchParams;
  console.log("sdfsdfsdfad", amount);
  return (
    <div className="w-1/3 mx-auto">
      <h6 className="text-md font-semibold mb-3">Hello {name}</h6>
      <p className="text-sm mb-3">Do you want to pay for {message}</p>
      <p className="text-sm mb-10">
        You will get your Stripe Payment ID in {email}
      </p>
      <Elements stripe={stripePromise}>
        <CheckoutForm
          amount={amount}
          paymentId={paymentId}
          message={message}
          email={email}
        />
      </Elements>
    </div>
  );
};

export default PaymentPage;
