"use client";
import { signOut } from "next-auth/react";
import React from "react";

const DashboardLogoutBtn = () => {
  return (
    <div>
      <button
        onClick={() =>
          signOut({
            callbackUrl: "/authentication",
            redirect: true,
          })
        }
        className="btn btn-xs btn-outline btn-error border-r-0"
      >
        Logout
      </button>
    </div>
  );
};

export default DashboardLogoutBtn;
