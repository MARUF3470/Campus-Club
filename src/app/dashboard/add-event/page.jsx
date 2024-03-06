"use client";
import ImagePreviewCart from "@/app/components/Dashboard/ImagePreviewCart";
import React, { useRef, useState } from "react";
import Datetime from "react-datetime";
import "react-datetime/css/react-datetime.css";
import { FcAddImage } from "react-icons/fc";
const AddEventPage = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  console.log(selectedDate.toLocaleString());
  const [previewUrl, setPreviewUrl] = useState();
  const imageRef = useRef(null);
  const [image, setimage] = useState(null);
  const handleClick = () => {
    imageRef.current?.click();
  };
  const handleImageChange = (event) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setimage(selectedFile);
      const imageUrl = URL.createObjectURL(selectedFile);
      setPreviewUrl(imageUrl);
    }
  };
  const removePreviewUrl = () => {
    setimage(null);
    setPreviewUrl(undefined);
  };
  return (
    <div className="w-[95%] mx-auto">
      <h1 className="text-center text-2xl my-5">Add New Event</h1>
      <form className="w-11/12 lg:w-1/2 flex flex-col gap-2 mx-auto">
        <label className="input input-bordered flex items-center text-sm gap-2">
          Event Title
          <input
            type="text"
            className="grow"
            placeholder="Singing Competition"
          />
        </label>
        <label className="text-sm ml-2">Event Description</label>
        <textarea
          className="textarea textarea-bordered"
          placeholder="Bio"
        ></textarea>
        <label className="input input-bordered flex items-center text-sm gap-2">
          Location
          <input type="text" className="grow" placeholder="College Campus" />
        </label>
        <label className="input input-bordered flex items-center text-sm w-fit gap-2">
          <span className="hidden lg:block">Event Time and Date</span>
          <Datetime
            onChange={setSelectedDate}
            value={selectedDate}
            className="w-fit"
          />
        </label>
        <label className="input input-bordered flex items-center justify-between w-fit text-sm gap-2">
          Event Poster
          <input
            type="file"
            ref={imageRef}
            onChange={handleImageChange}
            className="hidden"
          />
          <FcAddImage onClick={handleClick} className="cursor-pointer" />
        </label>
        <div className="mb-5">
          {previewUrl ? (
            <ImagePreviewCart imgURL={previewUrl} callback={removePreviewUrl} />
          ) : (
            <></>
          )}
        </div>
        <div className="flex justify-center items-center">
          <input
            type="submit"
            className="btn btn-outline w-1/2"
            value="Submit"
          />
        </div>
      </form>
    </div>
  );
};

export default AddEventPage;
