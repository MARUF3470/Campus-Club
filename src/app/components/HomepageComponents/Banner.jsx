import React from "react";
import img from "@/app/assets/3.jpg";
import Image from "next/image";

const Banner = () => {
  return (
    <div>
      <Image
        height={500}
        src={img}
        alt="Maruf Hossain "
        placeholder="blur"
        className="mx-auto rounded-3xl"
        sizes="100vw"
      />
      <div className="relative -top-32 lg:-top-72 ">
        <h1 className="text-center  text-xl lg:text-4xl font-bold">
          Join to our Campus Club
        </h1>
        <p className="text-center text-sm lg:text-base mt-2 lg:mt-5">
          Exciting events are coming, be a member of our club and enjoy the
          events.
        </p>
      </div>
    </div>
  );
};

export default Banner;
