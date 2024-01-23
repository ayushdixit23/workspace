"use client"
import Lottie from "lottie-react";
import React from "react";
import loading from "../assets/image/loading.json"

const Loader = () => {
  return (
    <>
      <div className="flex justify-center w-screen fixed inset-0  bg-white h-screen z-50 items-center ">
        <Lottie animationData={loading} size={300} loop={true} />
      </div>
    </>
  );
};

export default Loader;
