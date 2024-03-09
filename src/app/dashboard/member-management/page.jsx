import MemberListComponent from "../../components/sharedComponents/MemberListComponent";
import React from "react";
export const metadata = {
  title: "Member Management",
  description: "Member Management to capmus club",
};
const MemberManagementPage = () => {
  return (
    <div>
      <MemberListComponent />
    </div>
  );
};

export default MemberManagementPage;
