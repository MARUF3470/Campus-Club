import React from "react";

const MemberRegistration = () => {
  return (
    <div className="w-[95%] mx-auto">
      <h1 className="text-center text-2xl my-5">Member Registration Form</h1>
      <form className="w-1/2 flex flex-col gap-2 mx-auto">
        <label className="input input-bordered flex items-center text-sm gap-2">
          Student ID
          <input type="text" className="grow" placeholder="153-25-3294" />
        </label>
        <div className="flex flex-col lg:flex-row gap-2">
          <label className="input input-bordered flex items-center gap-2 text-sm lg:w-1/2">
            First Name
            <input type="text" className="grow" placeholder="Maruf" />
          </label>
          <label className="input input-bordered flex items-center gap-2 text-sm lg:w-1/2">
            Last Name
            <input type="text" className="grow" placeholder="Hossain" />
          </label>
        </div>
        <label className="input input-bordered flex items-center text-sm gap-2">
          Email
          <input type="email" className="grow" placeholder="xyz@gmail.com" />
        </label>
        <div className="flex flex-col lg:flex-row gap-2">
          <select className="select select-bordered lg:w-1/3">
            <option disabled selected>
              Membership Type
            </option>
            <option>Member</option>
            <option>Alumni</option>
          </select>
          <label className="input input-bordered flex items-center gap-2 text-sm lg:w-1/3">
            Major
            <input type="text" className="grow" placeholder="CSE" />
          </label>
          <select className="select select-bordered lg:w-1/3">
            <option disabled selected>
              College Year
            </option>
            <option>Freshman</option>
            <option>Sophomore</option>
            <option>Junior</option>
            <option>Senio</option>
            <option>Alumni</option>
          </select>
        </div>
        <div>
          <h4 className="text-sm mt-2">Want to take the Club T-shirt?</h4>
          <div className="w-1/2 lg:w-1/6">
            <div className="form-control">
              <label className="label cursor-pointer">
                <span className="label-text">Yes</span>
                <input
                  type="radio"
                  name="radio-10"
                  className="radio checked:bg-blue-500"
                  checked
                />
              </label>
            </div>
            <div className="form-control">
              <label className="label cursor-pointer">
                <span className="label-text">No</span>
                <input
                  type="radio"
                  name="radio-10"
                  className="radio checked:bg-red-500"
                  checked
                />
              </label>
            </div>
          </div>
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

export default MemberRegistration;
