import AddMemberComponent from "@/app/components/MemberRegistrationComponent/AddMemberComponent";
import React from "react";
export const metadata = {
  title: "Member Registration",
  description: "Member Registration page for new members of the club",
};
const MemberRegistration = () => {
  return <AddMemberComponent />;
};

export default MemberRegistration;
