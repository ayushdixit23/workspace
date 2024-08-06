"use client";
import React from "react";
import { getData } from "../utilsHelper/Useful";
import QRCode from "qrcode.react";

const page = () => {
  const { username, dp } = getData();

  return (
    <>
      <div className="h-screen flex justify-center items-center bg-gray-900">
        <div className="w-[400px] h-[400px] relative">
          <QRCode
            value={`https://grovyo.com/${username}`}
            includeMargin
            size={400}
            bgColor="white"
            fgColor="black"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <img
              src={dp}
              className="w-[50px] rounded-[20px] h-[50px] border-[2.5px] border-white object-cover"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
