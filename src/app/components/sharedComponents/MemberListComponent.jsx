"use client";
import React, { useState } from "react";
import SingleMember from "./SingleMember";
import { usePathname } from "next/navigation";
import useMembers from "../../../hooks/useMembers";
import { Toaster } from "react-hot-toast";
const MemberListComponent = () => {
  const { isLoading, mutate, members, isValidating } = useMembers();
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
          {modalData && <p className="py-4">{modalData?.message}</p>}
          {modalData && <p className="py-4">{modalData?.id}</p>}
          {modalData && <p className="py-4">{modalData?.email}</p>}
          <p className="py-4">Amount: {modalData?.amount}$</p>
          <div className="flex justify-end">
            <button className="btn btn-sm btn-outline">Yes</button>
          </div>
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
