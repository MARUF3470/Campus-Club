"use client";
import React, { useRef, useState } from "react";
import Datetime from "react-datetime";
import "react-datetime/css/react-datetime.css";
import { FcAddImage } from "react-icons/fc";
import ImagePreviewCart from "../../components/Dashboard/ImagePreviewCart";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
const AddEventComponent = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const router = useRouter();
  const [selectedDate, setSelectedDate] = useState(new Date());
  //   console.log(selectedDate.toLocaleString());
  const [previewUrl, setPreviewUrl] = useState();
  const imageRef = useRef(null);
  const [image, setimage] = useState(null);
  const [loading, setLoading] = useState(false);
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
  const onSubmit = async ({ title, description, location }) => {
    setLoading(true);
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("location", location);
    formData.append("date", selectedDate.toLocaleString());
    if (image) formData.append("image", image);
    try {
      const data = await fetch("/api/user/events", {
        method: "POST",
        body: formData,
      });
      const result = await data.json();
      if (result.event) {
        setLoading(false);
        reset();
        setPreviewUrl(null);
        return toast.success("Uploaded");
      }
    } catch (error) {
      toast.error("Something went wrong");
      console.log(error);
    }
  };
  return (
    <div>
      <Toaster />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-11/12 lg:w-1/2 flex flex-col gap-2 mx-auto"
      >
        <label className="input input-bordered flex items-center text-sm gap-2">
          Event Title
          <input
            {...register("title", { required: "Enter Event Title." })}
            type="text"
            className="grow"
            placeholder="Singing Competition"
          />
        </label>
        {errors.title && (
          <p className="text-red-400 text-xs mt-1">{errors.title.message}</p>
        )}
        <label className="text-sm">Event Description</label>
        <textarea
          {...register("description", { required: "Enter Event Description." })}
          className="textarea textarea-bordered"
          placeholder="Bio"
        ></textarea>
        {errors.description && (
          <p className="text-red-400 text-xs mt-1">
            {errors.description.message}
          </p>
        )}
        <label className="input input-bordered flex items-center text-sm gap-2">
          Location
          <input
            {...register("location", { required: "Enter Event Location." })}
            type="text"
            className="grow"
            placeholder="College Campus"
          />
        </label>
        {errors.location && (
          <p className="text-red-400 text-xs mt-1">{errors.location.message}</p>
        )}
        <label className="text-sm w-fit mt-1">
          <span>Event Time and Date</span>
        </label>
        <Datetime
          onChange={setSelectedDate}
          value={selectedDate}
          className="w-fit border px-3 py-2"
        />
        <label className="input input-bordered flex items-center justify-between w-fit text-sm gap-2">
          Event Poster
          <input
            type="file"
            ref={imageRef}
            onChange={handleImageChange}
            accept="image/*"
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
            disabled={loading}
          />
        </div>
      </form>
    </div>
  );
};

export default AddEventComponent;
