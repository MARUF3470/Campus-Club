import useEvents from "@/hooks/useEvents";
import Image from "next/image";
import React from "react";
import toast, { Toaster } from "react-hot-toast";

const SingleEvent = ({ event }) => {
  const { isLoading, error, deleteEvent } = useEvents();
  <Toaster />;
  return (
    <tr>
      <td>
        <div className="avatar">
          <div className="mask mask-squircle w-20 h-20">
            <Image
              width={500}
              height={500}
              src={`/uploads/${event.image}`}
              alt="Event Image"
              unoptimized
              className="w-fit object-contain cursor-pointer"
            />
          </div>
        </div>
      </td>
      <td>
        <div>
          <div>
            <div className="font-bold">{event.title}</div>
            <div className="text-sm opacity-50">{event.location}</div>
          </div>
        </div>
      </td>
      <td>
        {event.description}
        <br />
      </td>
      <td>{event.date}</td>
      <th>
        <button className="btn btn-ghost btn-xs btn-outline">Update</button>
      </th>
      <th>
        <button
          onClick={() => {
            deleteEvent(event.id);
            toast.success("Event Deleted");
          }}
          className="btn btn-error btn-xs btn-circle btn-outline"
        >
          X
        </button>
      </th>
    </tr>
  );
};

export default SingleEvent;
