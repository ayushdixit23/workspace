"use client";
import React from "react";
import { getData } from "../utilsHelper/Useful";
import QRCode from "qrcode.react";
import Image from "next/image";
import grovyo from "../assets/image/grovyo.png";

const page = () => {
  const { username, dp, fullname } = getData();

  return (
    <>
      <div className="w-screen h-dvh sm:h-screen flex flex-col justify-center items-center">
        {/* Blurred black background */}
        <div className="sm:h-screen h-dvh -z-20 w-full absolute bg-[#0e0e0e] bg-scanner bg-cover bg-center"></div>

        <div className="flex flex-col justify-center items-center gap-5">
          <div className="text-white font-semibold text-xl">Scan The QR</div>
          <div
            style={{ backgroundColor: "rgba(36, 39, 41, 0.05)" }}
            className="rounded-[27px] p-6 sm:p-9 gap-4 sm:gap-8 overflow-hidden z-10 backdrop-blur-lg border border-white/30 transform transition-transform duration-300  hover:scale-105 justify-center items-center flex hover:shadow-[0_4px_30px_rgba(36, 39, 41, 0.05)] shadow-[0_4px_30px_rgba(36, 39, 41, 0.05)] flex-col"
          >
            <div>
              <div
                style={{
                  position: "relative",
                }}
              >
                <QRCode
                  value={`https://grovyo.com/${username}`}
                  // includeMargin
                  className="rounded-none"
                  fgColor="white"
                  bgColor="black"
                  size={230}
                  style={{
                    borderRadius: "20px",
                  }}
                />
                <img
                  src={dp}
                  alt="Profile"
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    borderRadius: "18px",
                    // border: "2px solid black",
                    transform: "translate(-50%, -50%)",
                    width: 50,

                    // backgroundColor: "black",
                    height: 50,
                  }}
                />
              </div>
              <div className="text-white text-center text-[16px] sm:text-xl mt-4">
                {fullname}
              </div>
              <div className="text-white text-center text-sm mt-0.5 sm:text-lg ">
                @{username}
              </div>
            </div>
          </div>
        </div>

        <div className="fixed bottom-0 left-0 w-screen ">
          <div className="flex justify-center gap-2 items-center">
            <div className="flex justify-center text-xs sm:text-sm font-montserrat mb-3 font-semibold items-center">
              Powered By
            </div>
            <div className="w-[80px] h-[33px]">
              <Image src={grovyo} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
