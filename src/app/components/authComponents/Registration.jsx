"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
const Registration = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const router = useRouter();
  const onSubmit = async (data) => {
    if (data.password !== data.cpassword) {
      return toast.error("Confirm Password does not match with password");
    }
    if (data.password.length !== 8) {
      return toast.error("Password is should be atleast 8 characters");
    }
    const response = await fetch("/api/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: data.name,
        email: data.email,
        password: data.password,
        username: data.username,
        isAdmin: false,
      }),
    });
    if (response.ok) {
      toast.success("Registration done");
      reset();
      return router.push("/authentication");
    } else {
      return toast.error("Registration Failed");
    }
  };
  return (
    <div>
      <Toaster />
      <h6 className="text-center font-medium mb-5">Registration</h6>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-11/12 lg:w-1/2 flex flex-col gap-2 mx-auto"
      >
        <label className="input input-bordered flex items-center text-sm gap-2">
          Name
          <input
            type="text"
            {...register("name", { required: "Enter Your Name." })}
            className="grow"
            placeholder="Maruf Hossain"
          />
        </label>
        {errors.name && (
          <p className="text-red-400 text-xs mt-1">{errors.name.message}</p>
        )}
        <label className="input input-bordered flex items-center text-sm gap-2">
          User Name
          <input
            type="text"
            {...register("username", { required: "Enter Your UserName." })}
            className="grow"
            placeholder="Maruf Hossain"
          />
        </label>
        {errors.username && (
          <p className="text-red-400 text-xs mt-1">{errors.username.message}</p>
        )}
        <label className="input input-bordered flex items-center text-sm gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="w-4 h-4 opacity-70"
          >
            <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
            <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
          </svg>
          Email
          <input
            type="text"
            className="grow"
            {...register("email", { required: "Enter Your Email." })}
            placeholder="xyz@gmail.com"
          />
        </label>
        {errors.email && (
          <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>
        )}
        <label className="input input-bordered flex items-center text-sm gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="w-4 h-4 opacity-70"
          >
            <path
              fillRule="evenodd"
              d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
              clipRule="evenodd"
            />
          </svg>
          Password
          <input
            type="password"
            {...register("password", { required: "Give a password." })}
            className="grow"
            placeholder="********"
          />
        </label>
        {errors.password && (
          <p className="text-red-400 text-xs mt-1">{errors.password.message}</p>
        )}
        <label className="input input-bordered flex items-center text-sm gap-2">
          Confirm Password
          <input
            type="password"
            {...register("cpassword", {
              required: "Retype your password here.",
            })}
            className="grow"
            placeholder="********"
          />
        </label>
        {errors.cpassword && (
          <p className="text-red-400 text-xs mt-1">
            {errors.cpassword.message}
          </p>
        )}
        <div className="flex justify-center items-center">
          <input
            type="submit"
            className="btn btn-outline w-1/2"
            value="Registration"
          />
        </div>
      </form>
    </div>
  );
};

export default Registration;
