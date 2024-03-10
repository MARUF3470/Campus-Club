import React, { useState } from "react";
import useMembers from "../../../hooks/useMembers";
import toast from "react-hot-toast";
import Link from "next/link";

const SingleMember = ({ member, path }) => {
  const { isLoading, deleteMember } = useMembers();
  return (
    <tr>
      <th>{member.id}</th>
      <td>
        {member.fName} {member.lName}
      </td>
      <td>{member.email}</td>
      <td>{member.membershipType.toUpperCase()}</td>
      <td>{member.collegeYear.toUpperCase()}</td>
      <td>{member.major.toUpperCase()}</td>
      <td>{member.shirtSize.toUpperCase()}</td>
      <td>
        {member.Payment[0]?.membershipFee === "not-paid" ? (
          <Link
            href={{
              pathname: "/payment",
              query: {
                id: member.id,
                email: member.email,
                name: member.fName,
                message: "Registration fee",
                amount: 50,
                paymentId: member.Payment[0].id,
              },
            }}
            className="btn btn-xs btn-outline"
          >
            Pending
          </Link>
        ) : (
          <button className="btn btn-xs btn-disabled">Paid</button>
        )}
      </td>
      <td>
        {member.Payment[0]?.tShirtFee === "not-paid" ? (
          <Link
            href={{
              pathname: "/payment",
              query: {
                id: member.id,
                email: member.email,
                name: member.fName,
                message: "T-shirt fee",
                amount: 20,
                paymentId: member.Payment[0].id,
              },
            }}
            className="btn btn-xs btn-outline"
          >
            Pending
          </Link>
        ) : (
          <button className="btn btn-xs btn-disabled">Paid</button>
        )}
      </td>
      {path.includes("member-management") && (
        <td>
          <button
            className="btn-circle btn-outline btn-xs btn"
            onClick={() => {
              toast.success("Member Deleted.");
              deleteMember(member.id);
            }}
          >
            X
          </button>
        </td>
      )}
    </tr>
  );
};

export default SingleMember;
