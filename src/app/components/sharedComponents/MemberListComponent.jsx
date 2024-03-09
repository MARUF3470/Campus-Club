"use client";
import React from "react";
import SingleMember from "./SingleMember";
import { usePathname } from "next/navigation";
import useMembers from "../../../hooks/useMembers";
import { Toaster } from "react-hot-toast";
const MemberListComponent = () => {
  const { isLoading, mutate, members, isValidating } = useMembers();
  const path = usePathname();
  console.log("------>", path);
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-dots loading-lg"></span>
      </div>
    );
  }
  console.log(members);
  return (
    <div className="overflow-x-auto">
      <Toaster />
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
  );
};

export default MemberListComponent;
