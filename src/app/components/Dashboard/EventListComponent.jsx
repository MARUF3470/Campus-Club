"use client";
import useEvents from "@/hooks/useEvents";
import SingleEvent from "./SingleEvent";

const EventListComponent = () => {
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
              <th></th>
            </tr>
          </thead>
          <tbody>
            {events?.data.map((event) => (
              <SingleEvent key={event.id} event={event} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EventListComponent;
