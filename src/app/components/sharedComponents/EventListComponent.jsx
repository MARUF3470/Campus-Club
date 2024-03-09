"use client";
import { usePathname } from "next/navigation";
import useEvents from "../../../hooks/useEvents";
import SingleEvent from "./SingleEvent";

const EventListComponent = () => {
  const path = usePathname();
  const { isLoading, mutate, events, isValidating } = useEvents();
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-dots loading-lg"></span>
      </div>
    );
  }
  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>Poster</th>
              <th>Title & Location</th>
              <th>Description</th>
              <th>Date</th>
              {path.includes("event-list") && <th>Update</th>}
              {path.includes("event-list") && <th>Delete</th>}
            </tr>
          </thead>
          <tbody>
            {events?.data?.map((event) => (
              <SingleEvent key={event.id} event={event} path={path} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EventListComponent;
