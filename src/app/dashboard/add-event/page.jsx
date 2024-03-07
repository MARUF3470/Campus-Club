import AddEventComponent from "@/app/components/Dashboard/AddEventComponent";

import React from "react";

export const metadata = {
  title: "Add Club Events",
  description: "Add Club Events",
};
const AddEventPage = () => {
  return (
    <div className="w-[95%] mx-auto">
      <h1 className="text-center text-2xl my-5">Add New Event</h1>
      <AddEventComponent />
    </div>
  );
};

export default AddEventPage;
