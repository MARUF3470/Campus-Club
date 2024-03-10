"use client";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
const CheckoutForm = ({ paymentId, amount, message, email }) => {
  const [loading, setLoading] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const [clientSecret, setClientSecret] = useState("");
  const [transactionID, setTransactionID] = useState("");
  useEffect(() => {
    fetch("/api/createPaymentIntent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(amount),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data.clientSecret);
        setClientSecret(data.clientSecret);
      });
  }, [amount]);
  const handleSubmit = async (event) => {
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
    setLoading(true);
    //confirming card payment with confirmcardpayment api
    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            name: name || "Anonymous",
            email: email || "Unknown",
          },
        },
      });
    if (confirmError) {
      console.log(confirmError);
      return toast.custom((t) => (
        <div
          className={`${
            t.visible ? "animate-enter" : "animate-leave"
          } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
        >
          <div className="flex-1 w-0 p-4">
            <div className="flex items-start">
              <div className="ml-3 flex-1">
                <p className="text-sm font-medium text-gray-900 uppercase">
                  {confirmError.decline_code}
                </p>
                <p className="mt-1 text-sm text-gray-500">
                  {confirmError.message}
                </p>
              </div>
            </div>
          </div>
          <div className="flex border-l border-gray-200">
            <button
              onClick={() => toast.dismiss(t.id)}
              className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              Close
            </button>
          </div>
        </div>
      ));
    }
    setLoading(false);
    if (paymentIntent?.status === "succeeded") {
      toast.success(paymentIntent?.id);
      setTransactionID(paymentIntent?.id);
    }
  };
  return (
    <div>
      <Toaster />
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
      {transactionID && (
        <p className="text-center text-green-500 my-10">
          Payment succeeded, TransactionId:
          <span className="font-bold text-blue-700"> {transactionID}</span>
        </p>
      )}
    </div>
  );
};

export default CheckoutForm;
