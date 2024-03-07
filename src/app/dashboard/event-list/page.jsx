import React from "react";
import EventListComponent from "@/app/components/Dashboard/EventListComponent";
export const metadata = {
  title: "Event List",
  description: "Event List of all campus events",
};
const EventListPage = () => {
  return (
    <div>
      <h4 className="text-center text-lg font-medium my-5">All Events</h4>
      <EventListComponent />
    </div>
  );
};

export default EventListPage;
