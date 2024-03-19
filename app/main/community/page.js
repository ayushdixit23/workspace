"use client";
import React, { useState } from "react";
import Communitybox from "./Communitybox";
import Link from "next/link";
import {
  useDeleteCommunityMutation,
  useGetCommunityQuery,
} from "@/app/redux/apiroutes/community";
import { getData } from "@/app/utilsHelper/Useful";
import { GoPlus } from "react-icons/go";
import toast, { Toaster } from "react-hot-toast";
import NoCommunity from "@/app/data/NoCommunity";
import { FaCrown } from "react-icons/fa";
import MembershipPopup from "@/app/componentsWorkSpace/MembershipPopup";

function page() {
  const { id, memberships } = getData()
  const {
    data: comdata, refetch,
    isLoading,
  } = useGetCommunityQuery(
    { id: id },
    { skip: !id, refetchOnMountOrArgChange: true }
  );
  const [pop, setPop] = useState(false)
  const [deletecom] = useDeleteCommunityMutation();
  const handleDelete = async ({ dat, id, index }) => {
    try {

      await deletecom({
        comid: id
      })
      toast.success("Community Deleted!")
      await refetch()
    } catch (e) {
      console.log(e);
    }
  };

  if (isLoading) {
    return <div>
      <div className="overflow-auto pt-1 no-scrollbar h-full ">
        <div className="flex justify-between items-center">
          <div className="sm:font-medium sm:pl-4 text-[18px] animate-pulse px-10 py-4 bg-[#f2f2f2] dark:bg-[#273142] rounded-2xl text-[#8B8D97]"></div>
          <Link
            href="/main/store/addproduct"
            className="vs:max-sm:hidden  animate-pulse px-10 py-4  bg-[#f2f2f2] dark:bg-[#273142] text-white rounded-2xl"
          ></Link>
        </div>

        <div className="pt-4">
          <div className="flex w-full vs:max-sm:hidden sm:pt-4 px-4 justify-between">
            <div className="w-64 sm:max-md:w-52 bg-[#f2f2f2] dark:bg-[#273142]  animate-pulse font-medium flex justify-start "></div>
            <div className="w-36 sm:max-md:w-24 bg-[#f2f2f2] dark:bg-[#273142] animate-pulse flex justify-center font-medium "></div>
            <div className="w-36  sm:max-md:w-24 bg-[#f2f2f2] dark:bg-[#273142] animate-pulse flex justify-center font-medium "></div>
            <div className="w-36 sm:max-md:w-24 bg-[#f2f2f2] dark:bg-[#273142] animate-pulse flex justify-center font-medium "></div>
            <div className="w-36 sm:max-md:w-24 flex justify-center font-medium "></div>
          </div>
          <div className="bg-[#f2f2f2] dark:bg-[#273142] animate-pulse h-20 sm:rounded-2xl mt-4"></div>
          <div className="bg-[#f2f2f2] dark:bg-[#273142] animate-pulse h-20 sm:rounded-2xl mt-4"></div>
          <div className="bg-[#f2f2f2] dark:bg-[#273142] animate-pulse h-20 sm:rounded-2xl mt-4"></div>
          <div className="bg-[#f2f2f2] dark:bg-[#273142] animate-pulse h-20 sm:rounded-2xl mt-4"></div>
          <div className="bg-[#f2f2f2] dark:bg-[#273142] animate-pulse h-20 sm:rounded-2xl mt-4"></div>
          <div className="bg-[#f2f2f2] dark:bg-[#273142] animate-pulse h-20 sm:rounded-2xl mt-4"></div>
          <div className="bg-[#f2f2f2] dark:bg-[#273142] animate-pulse h-20 sm:rounded-2xl mt-4"></div>
          <div className="bg-[#f2f2f2] dark:bg-[#273142] animate-pulse h-20 sm:rounded-2xl mt-4"></div>
        </div>
      </div>
    </div>;
  }
  return (
    <>
      {pop &&
        <div className='fixed inset-0 z-50 w-screen flex justify-center items-center bg-black/50 sm:h-screen'>
          <MembershipPopup setPop={setPop} />
        </div>
      }
      {/* <Post /> */}
      <div>
        <Toaster />
        <div className="dark:text-white">
          <div className="flex px-4 py-2 justify-between items-center">
            <div className=" p-2 text-[22px] text-[#202224] dark:text-white sm:font-semibold  ">
              Community
            </div>
            {comdata?.merged.length < 5 && <> {
              comdata?.merged?.length >= 2 && memberships === "Free" ?
                <div onClick={() => setPop(true)} className="py-2 vs:max-pp:text-[12px] flex justify-center items-center gap-1 border light:border-[#f1f1f1] px-2.5 sm:px-5 font-medium bg-white text-black rounded-xl dark:bg-[#323d4e] dark:text-white">
                  Create community
                  <FaCrown />
                </div> : <Link
                  href="/main/community/createCommunity"
                  className="py-2 vs:max-pp:text-[12px] flex justify-center items-center gap-1 border light:border-[#f1f1f1] px-2.5 sm:px-5 font-medium bg-white text-black rounded-xl dark:bg-[#323d4e] dark:text-white"
                >
                  Create community
                  <GoPlus />
                </Link>
            }</>}

          </div>
          {comdata?.merged?.length > 0 ? < div className="sm:px-5  w-full sm:min-h-[65vh] text-[#202224]">
            <div className="flex w-full py-4 bg-[#F1F4F9] dark:text-white dark:bg-[#273142] rounded-xl px-4 justify-between vs:max-sm:hidden mt-4">
              <div className="w-64 sm:max-md:w-52 font-semibold flex justify-normal items-start pl-4">
                Communities
              </div>

              <div className="w-40 sm:max-md:w-24 flex font-semibold justify-center">
                Topics
              </div>
              <div className="w-36 sm:max-md:w-24 flex font-semibold justify-center">
                Total Posts
              </div>
              <div className="w-36 flex font-semibold justify-center">
                Members
              </div>
              <div className="w-36 flex font-semibold justify-center">
                <div className="relative -left-6">Engagement rate</div>
                <div className=" flex font-semibold justify-center"></div>
              </div>
            </div>

            <div className="flex flex-col gap-3 my-6 pb-10">
              {comdata?.merged?.map((d, i, arr) => (
                <div
                  key={i}
                >
                  <Communitybox
                    data={d}
                    index={i}
                    id={id}
                    handleDelete={handleDelete}
                  />
                </div>
              ))}
            </div>
          </div> : <NoCommunity />}
        </div>
      </div >
    </>
  );
}

export default page;
