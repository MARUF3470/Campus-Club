import React from "react";
import Banner from "../components/HomepageComponents/Banner";
import MemberListComponent from "../components/sharedComponents/MemberListComponent";
import EventListComponent from "../components/sharedComponents/EventListComponent";

const HomePage = () => {
  return (
    <div className="w-[95%] mx-auto flex flex-col gap-5">
      <Banner />
      <div className="border rounded-3xl px-5 h-[500px]">
        <h4 className="text-center my-10">Members List</h4>
        <div className="h-[400px] overflow-y-auto scrollable-component mb-5">
          <MemberListComponent />
        </div>
      </div>
      <div className="border rounded-3xl px-5 h-[500px]">
        <h4 className="text-center my-10">Upcomming Events</h4>
        <div className="h-96 overflow-y-auto scrollable-component mb-5">
          <EventListComponent />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
