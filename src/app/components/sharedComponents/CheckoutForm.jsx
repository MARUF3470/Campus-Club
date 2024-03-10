"use client";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useState } from "react";
const CheckoutForm = ({ id, amount, message, mutate, setStripePaymentId }) => {
  const [loading, setLoading] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const handleSubmit = async (event) => {
    setLoading(true);
    event.preventDefault();
    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    // Get a reference to a mounted CardElement. Elements knows how
    // to find your CardElement because there can only ever be one of
    // each type of element.
    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });
    if (error) {
      console.log("error", error);
    } else {
      console.log("payment method", paymentMethod);
    }
    const res = await fetch("/api/payment", {
      method: "POST",
      body: JSON.stringify({ id, amount, message }),
    });
    const paymentUpdatedData = await res.json();
    if (paymentUpdatedData.body.stripePaymentID) {
      mutate();
      event.target.reset();
      setLoading(false);
      setStripePaymentId(paymentUpdatedData.body.stripePaymentID);
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
        <button
          className="btn btn-xs btn-outline mt-5"
          type="submit"
          disabled={!stripe || loading}
        >
          Pay
        </button>
      </form>
    </div>
  );
};

export default CheckoutForm;
