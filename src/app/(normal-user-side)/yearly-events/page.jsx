import React from "react";
import EventListComponent from "../../components/sharedComponents/EventListComponent";

const YearlyEvents = () => {
  return (
    <div className="w-[95%] mx-auto">
      <h1 className="text-center font-semibold text-xl">Yearly Events</h1>
      <div>
        <EventListComponent />
      </div>
    </div>
  );
};

export default YearlyEvents;
