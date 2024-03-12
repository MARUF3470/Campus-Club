"use client";
import { usePathname } from "next/navigation";
import useEvents from "../../../hooks/useEvents";
import SingleEvent from "./SingleEvent";
import { useState } from "react";
import Datetime from "react-datetime";
import "react-datetime/css/react-datetime.css";
import toast, { Toaster } from "react-hot-toast";
const EventListComponent = () => {
  const [modalData, setModalData] = useState(null);
  const path = usePathname();
  const { isLoading, mutate, events, isValidating } = useEvents();
  const [selectedDate, setSelectedDate] = useState();
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-dots loading-lg"></span>
      </div>
    );
  }

  const handleUpdate = (data) => {
    setSelectedDate(null);
    setModalData(data);
    document.getElementById("my_modal_3").showModal();
  };

  const handleFormSubmit = async (e) => {
    let newDate;
    e.preventDefault();
    const form = e.target;
    const title = form.title.value;
    const description = form.description.value;
    const location = form.location.value;

    if (selectedDate === undefined) {
      newDate = modalData?.date;
    } else if (selectedDate === null) {
      newDate = modalData?.date;
    } else {
      newDate = selectedDate.toLocaleString();
    }
    // console.log(title, description, location, newDate);
    const response = await fetch(`/api/user/events/${modalData?.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, description, location, newDate }),
    });
    const data = await response.json();
    mutate();
    if (data.status === 200) {
      e.target.reset();
      return toast.success(data.message);
    }
    if (data.status === 500) {
      return toast.error(data.message);
    }
  };

  const handleModalClose = () => {
    const modal = document.getElementById("my_modal_3");
    if (modal) {
      modal.close();
    }
  };

  return (
    <div>
      <Toaster />
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box">
          <button
            onClick={handleModalClose}
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          >
            ✕
          </button>
          <form onSubmit={handleFormSubmit} method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <h6 className="font-semibold mt-5">Update</h6>
            <div className="mt-2 flex flex-col gap-2">
              <input
                className="input input-bordered input-primary w-full text-sm"
                type="text"
                defaultValue={modalData?.title}
                name="title"
              />
              <textarea
                className="textarea textarea-primary w-full h-36 text-sm"
                type="text"
                defaultValue={modalData?.description}
                name="description"
              />
              <input
                className="input input-bordered input-primary w-full text-sm"
                type="text"
                defaultValue={modalData?.location}
                name="location"
              />
              <Datetime
                onChange={setSelectedDate}
                value={selectedDate || modalData?.date.toLocaleString()}
                className="w-fit border px-3 py-2"
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
