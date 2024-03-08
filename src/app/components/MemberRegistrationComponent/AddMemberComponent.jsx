"use client";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";

const AddMemberComponent = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    const memberData = {
      ...data,
      paymentData: {
        tShirt: "not-paid",
        membershipFee: "not-paid",
      },
    };
    const response = await fetch("/api/members", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(memberData),
    });
    if (response.ok) {
      // reset();
      return toast.success("Registration request sent successfully.");
    }
    if (response.status === 409) {
      return toast.error("This Student Id already exist");
    }
  };
  return (
    <div className="w-[95%] mx-auto">
      <Toaster />
      <h1 className="text-center text-2xl my-5">Member Registration Form</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-1/2 flex flex-col gap-2 mx-auto"
      >
        <label className="input input-bordered flex items-center text-sm gap-2">
          Student ID
          <input
            {...register("id", { required: "Enter Student ID." })}
            type="text"
            className="grow"
            placeholder="153-25-3294"
          />
        </label>
        {errors.id && (
          <p className="text-red-400 text-xs mt-1">{errors.id.message}</p>
        )}
        <div className="flex flex-col lg:flex-row gap-2">
          <label className="input input-bordered flex items-center gap-2 text-sm lg:w-1/2">
            First Name
            <input
              {...register("fname", { required: "Enter Your First Name." })}
              type="text"
              className="grow"
              placeholder="Maruf"
            />
          </label>
          {errors.fname && (
            <p className="text-red-400 text-xs mt-1">{errors.fname.message}</p>
          )}
          <label className="input input-bordered flex items-center gap-2 text-sm lg:w-1/2">
            Last Name
            <input
              {...register("lname", { required: "Enter Your Last Name." })}
              type="text"
              className="grow"
              placeholder="Hossain"
            />
          </label>
          {errors.lname && (
            <p className="text-red-400 text-xs mt-1">{errors.lname.message}</p>
          )}
        </div>
        <label className="input input-bordered flex items-center text-sm gap-2">
          Email
          <input
            {...register("email", { required: "Enter Your Email." })}
            type="email"
            className="grow"
            placeholder="xyz@gmail.com"
          />
        </label>
        {errors.email && (
          <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>
        )}
        <div className="flex flex-col lg:flex-row gap-2">
          <select
            {...register("memberType", {
              required: "Enter Your Membership type.",
            })}
            className="select select-bordered lg:w-1/3"
          >
            <option value={""}>Membership Type</option>
            <option value={"member"}>Member</option>
            <option value={"alumni"}>Alumni</option>
          </select>
          <label className="input input-bordered flex items-center gap-2 text-sm lg:w-1/3">
            Major
            <input
              {...register("major", {
                required: "Enter Your Major.",
              })}
              type="text"
              className="grow"
              placeholder="CSE"
            />
          </label>
          <select
            {...register("collegeYear", {
              required: "Enter Your College Year.",
            })}
            className="select select-bordered lg:w-1/3"
          >
            <option value={""}>College Year</option>
            <option value={"freshman"}>Freshman</option>
            <option value={"sophomore"}>Sophomore</option>
            <option value={"junior"}>Junior</option>
            <option value={"senior"}>Senior</option>
            <option value={"alumni"}>Alumni</option>
          </select>
        </div>
        {errors.memberType && (
          <p className="text-red-400 text-xs mt-1">
            {errors.memberType.message}
          </p>
        )}
        {errors.major && (
          <p className="text-red-400 text-xs mt-1">{errors.major.message}</p>
        )}
        {errors.collegeYear && (
          <p className="text-red-400 text-xs mt-1">
            {errors.collegeYear.message}
          </p>
        )}
        <div>
          <select
            {...register("tShirt", {
              required: "Enter Your T-shirt Size.",
            })}
            className="select select-bordered w-fit"
          >
            <option value={""}>T-shirt Size</option>
            <option value={"s"}>S</option>
            <option value={"m"}>M</option>
            <option value={"l"}>L</option>
            <option value={"xl"}>XL</option>
            <option value={"2xl"}>2XL</option>
          </select>
          {errors.tShirt && (
            <p className="text-red-400 text-xs mt-1">{errors.tShirt.message}</p>
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

export default AddMemberComponent;
