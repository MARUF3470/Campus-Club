"use client";
import React from "react";
import Lottie from "lottie-react";
import animation from "@/app/assets/Animation - 1709708041926.json";
const DashboardAnimation = () => {
  return (
    <div>
      <Lottie
        className="lg:w-3/5 mx-auto"
        animationData={animation}
        loop={true}
      />
    </div>
  );
};

export default DashboardAnimation;
