import React from "react";
import DashboardAnimation from "../components/Dashboard/DashboardAnimation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

const DashboardPage = async () => {
  const session = await getServerSession(authOptions);
  console.log(session);
  return (
    <div>
      <h4 className="text-center text-lg font-medium mt-5">
        Hello {session.user.name}, Welcome!
      </h4>
      <DashboardAnimation />
    </div>
  );
};

export default DashboardPage;
