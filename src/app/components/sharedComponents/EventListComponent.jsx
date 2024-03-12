"use client";
import { usePathname } from "next/navigation";
import useEvents from "../../../hooks/useEvents";
import SingleEvent from "./SingleEvent";
import { useState } from "react";

const EventListComponent = () => {
  const [modalData, setModalData] = useState(null);
  const path = usePathname();
  const { isLoading, mutate, events, isValidating } = useEvents();
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-dots loading-lg"></span>
      </div>
    );
  }
  const handleUpdate = (data) => {
    setModalData(data);
    document.getElementById("my_modal_3").showModal();
  };
  return (
    <div>
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
            <h6 className="font-semibold mt-5">Update</h6>
            <div className="mt-2 flex flex-col gap-2">
              <input
                className="input input-bordered input-primary w-full text-sm"
                type="text"
                defaultValue={modalData?.title}
              />
              <textarea
                className="textarea textarea-primary w-full text-sm"
                type="text"
                defaultValue={modalData?.description}
              />
              <input
                className="input input-bordered input-primary w-full text-sm"
                type="text"
                defaultValue={modalData?.location}
              />
              <input
                className="input input-bordered input-primary w-full text-sm"
                type="text"
                defaultValue={modalData?.date}
              />
              <input
                className="btn btn-outline w-fit btn-sm mx-auto my-5"
                type="submit"
                value="Submit"
              />
            </div>
          </form>
        </div>
      </dialog>
      <div
        className={`${
          path.includes("event-list") || path.includes("yearly-events")
            ? ""
            : "overflow-x-auto h-96"
        }`}
      >
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
              <SingleEvent
                key={event.id}
                event={event}
                path={path}
                handleUpdate={handleUpdate}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EventListComponent;
