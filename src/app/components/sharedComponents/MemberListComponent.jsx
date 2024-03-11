"use client";
import React, { useState } from "react";
import SingleMember from "./SingleMember";
import { usePathname } from "next/navigation";
import useMembers from "../../../hooks/useMembers";
import { Toaster } from "react-hot-toast";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
const MemberListComponent = () => {
  const { isLoading, mutate, members, isValidating } = useMembers();
  const [stripePaymentId, setStripePaymentId] = useState();
  const path = usePathname();
  const [modalData, setModalData] = useState(null);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-dots loading-lg"></span>
      </div>
    );
  }
  console.log(members);

  return (
    <div>
      <Toaster />
      <div
        className={`${
          path.includes("member-management") ? "" : "overflow-x-auto h-96"
        }`}
      >
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
              <SingleMember key={member.id} member={member} path={path} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MemberListComponent;
