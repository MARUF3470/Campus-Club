import Link from "next/link";
import React from "react";
import DashboardLogoutBtn from "../components/Dashboard/DashboardLogoutBtn";

const layout = ({ children }) => {
  return (
    <div className="w-[95%] mx-auto">
      <div className="grid grid-cols-5 gap-4">
        <div className="bg-lime-300 col-span-2 lg:col-span-1 py-10">
          <div className="flex justify-end">
            <DashboardLogoutBtn />
          </div>
          <h3 className="text-center text-xl font-medium mb-10">Dashboard</h3>
          <div className="flex flex-col">
            <Link href="/dashboard/add-event" className="btn btn-outline">
              Add Event
            </Link>
            <Link href="/dashboard/event-list" className="btn btn-outline">
              Events List
            </Link>
            <Link
              href="/dashboard/member-management"
              className="btn btn-outline"
            >
              Member Management
            </Link>
          </div>
          <div className="relative -bottom-24 flex justify-center items-center">
            <Link href="/" className="">
              Back To Home
            </Link>
          </div>
        </div>
        <div className="col-span-3 lg:col-span-4">{children}</div>
      </div>
    </div>
  );
};

export default layout;
