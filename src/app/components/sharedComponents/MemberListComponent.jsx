"use client";
import React from "react";
import useMembers from "@/hooks/useMembers";
import SingleMember from "./SingleMember";
const MemberListComponent = () => {
  const { isLoading, mutate, members, isValidating } = useMembers();
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
            <th>Delete Member</th>
          </tr>
        </thead>
        <tbody>
          {members?.data?.map((member) => (
            <SingleMember key={member.id} member={member} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MemberListComponent;
