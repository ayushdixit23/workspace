"use client";
import Link from "next/link";
import React, { useState } from "react";
import { FaImages } from "react-icons/fa";
import { PiVideoFill } from "react-icons/pi";

const NoPost = ({ id }) => {
  const [change, setChange] = useState(false);
  return (
    <>
      <div className="bg-white dark:text-white dark:border-2 dark:border-[#313d4f] dark:bg-[#273142] rounded-xl my-2 h-[300px]">
        <div className="sm:p-5 p-3 flex justify-center gap-3 h-full items-center flex-col">
          <div className="text-2xl text-[#1554F6] font-semibold">
            No posts yet
          </div>
          <div className="pn:max-sm:text-center">
            Sharing about a life update is not a bad idea.
          </div>
          <div
            onClick={() => setChange(!change)}
            className="bg-[#1554F6] relative text-white p-2 px-4 rounded-lg text-sm"
          >
            + Start Post
            {change && (
              <div
                onClick={() => setChange(false)}
                className={`${
                  change
                    ? "absolute bg-white z-50 border border-white top-6 left-16 dark:bg-[#273142] rounded-xl overflow-hidden w-full"
                    : "hidden"
                } `}
              >
                <div
                  className="flex flex-col gap-3
                px-4 py-2"
                >
                  <Link
                    onClick={() => {
                      setChange(false);
                      // setOpen(true);
                    }}
                    href={`/main/post/${id}?type=video`}
                    className="flex items-center cursor-pointer gap-2"
                  >
                    <div>
                      <PiVideoFill />
                    </div>
                    <div>Video</div>
                  </Link>
                  <Link
                    onClick={() => {
                      setChange(false);
                      // setOpen(true);
                    }}
                    href={`/main/post/${id}?type=image`}
                    className="flex items-center cursor-pointer gap-2"
                  >
                    <div>
                      <FaImages />
                    </div>
                    <div>Photo</div>
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default NoPost;
