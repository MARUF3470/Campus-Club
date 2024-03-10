"use client";
import React, { useState } from "react";
import SingleMember from "./SingleMember";
import { usePathname } from "next/navigation";
import useMembers from "../../../hooks/useMembers";
import { Toaster } from "react-hot-toast";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import { loadStripe } from "@stripe/stripe-js";
const MemberListComponent = () => {
  const { isLoading, mutate, members, isValidating } = useMembers();
  const [stripePaymentId, setStripePaymentId] = useState();
  const path = usePathname();
  const [modalData, setModalData] = useState(null);
  const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
  );
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-dots loading-lg"></span>
      </div>
    );
  }
  console.log(members);

  const openModalForRegistrationFee = (data) => {
    setModalData(data);
    document.getElementById("my_modal_3").showModal();
  };
  const openModalForShirtFee = (data) => {
    setModalData(data);
    document.getElementById("my_modal_3").showModal();
  };
  return (
    <div>
      <Toaster />
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box">
          <form method="dialog">
            <button
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              onClick={() => {
                document.getElementById("my_modal_3").close();
              }}
            >
              ✕
            </button>
          </form>
          <h3 className="font-bold text-lg">Hello!</h3>
          {modalData && (
            <p className="py-2">Do you want to pay {modalData?.message}?</p>
          )}
          {modalData && (
            <p className="py-2">
              An email will be sended to your{" "}
              <span className="font-semibold">{modalData?.email}</span> email.
            </p>
          )}
          <p className="py-2">Amount: {modalData?.amount}$</p>
          {stripePaymentId ? (
            <div className="mt-5">
              <p className="text-sm text-violet-700">
                Thank You for your payment, Your Stripe Payment ID:{" "}
                <span className="font-semibold">{stripePaymentId}</span>
              </p>
            </div>
          ) : (
            <div>
              <p className="text-center mt-4 mb-8 text-violet-500">
                Please Provide Your Card Information for Payment
              </p>
              <Elements stripe={stripePromise}>
                <CheckoutForm
                  id={modalData?.paymentId}
                  amount={modalData?.amount}
                  message={modalData?.message}
                  mutate={mutate}
                  setStripePaymentId={setStripePaymentId}
                />
              </Elements>
            </div>
          )}
        </div>
      </dialog>
      <div className="overflow-x-auto h-96">
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Membership Type</th>
              <th>College Year</th>
              <th>Major</th>
              <th>T-Shirt Size</th>
              <th>Registration Fee</th>
              <th>T-shirt Fee</th>
              {path.includes("member-management") && <th>Delete Member</th>}
            </tr>
          </thead>
          <tbody>
            {members?.data?.map((member) => (
              <SingleMember
                key={member.id}
                member={member}
                path={path}
                openModalForRegistrationFee={openModalForRegistrationFee}
                openModalForShirtFee={openModalForShirtFee}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MemberListComponent;
