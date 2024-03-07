import Login from "@/app/components/authComponents/Login";
import Registration from "@/app/components/authComponents/Registration";
import React from "react";
export const metadata = {
  title: "Authentication",
  description: "Authentication for admin",
};
const AuthPage = () => {
  return (
    <div className="w-4/5 lg:w-1/2 mx-auto">
      <h4 className="text-2xl text-center font-medium my-5">
        This page is only for Admin, other people are restricted.
      </h4>
      {/* <div role="tablist" className="tabs tabs-lifted">
        <input
          type="radio"
          name="my_tabs_2"
          role="tab"
          className="tab"
          aria-label="Tab 1"
          defaultChecked
        />
        <div
          role="tabpanel"
          className="tab-content bg-base-100 border-base-300 rounded-box p-6"
        >
          <Login />
        </div>

        <input
          type="radio"
          name="my_tabs_2"
          role="tab"
          className="tab"
          aria-label="Tab 2"
        />
        <div
          role="tabpanel"
          className="tab-content bg-base-100 border-base-300 rounded-box p-6"
        >
          <Registration />
        </div>
      </div> */}
      <Login />
    </div>
  );
};

export default AuthPage;
