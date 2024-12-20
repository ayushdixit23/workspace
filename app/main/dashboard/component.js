"use client";
import React, { useEffect, useState } from "react";
import p1 from "../../assets/image/Icon.png";
import p2 from "../../assets/image/p2.png";
import p3 from "../../assets/image/p3.png";
// import emcom from "../../assets/image/emptycom.png";
import verify from "../../assets/image/verify.png";
import Image from "next/image";
import DontHave from "@/app/componentsWorkSpace/DontHave";
import Products from "@/app/componentsWorkSpace/Products";
import Customer from "@/app/componentsWorkSpace/Customer";
import Member from "@/app/componentsWorkSpace/Member";
import Demographics from "@/app/componentsWorkSpace/Demographics";
import LocationStore from "@/app/componentsWorkSpace/LocationStore";
import LocationCom from "@/app/componentsWorkSpace/LocationCom";
import MemorizedPopularity from "@/app/data/Popularity";
import Loader from "@/app/data/Loader";
import Communitydata from "@/app/data/Communitydata";
import Storedata from "@/app/data/Storedata";
import {
  useGetAnalyticsQuery,
  useGetAnalyticsThirtyDaysQuery,
} from "@/app/redux/apiroutes/community";
import { useGetFetchOrderQuery } from "@/app/redux/apiroutes/userLoginAndSetting";
import { formatISOStringToDayMonth, getData } from "@/app/utilsHelper/Useful";
import Monetization from "../../assets/image/Monetization.png";
import Link from "next/link";
import { redirect, useRouter, useSearchParams } from "next/navigation";
import Cookies from "js-cookie";
import Hover from "@/app/data/Hover";
import { sendData } from "@/app/redux/slice/userData";
import { useDispatch } from "react-redux";
import axios from "axios";
import {
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import MemorizedDontHave from "@/app/componentsWorkSpace/DontHave";
import { encryptaes } from "@/app/utilsHelper/security";

function Dashboard() {
  const [change, setChange] = useState("community");
  const [dateValue, setDateValue] = useState(7);
  const [comchange, setComchange] = useState(1);
  const [prochange, setProchange] = useState("1");
  const [loading, setLoading] = useState(true);
  const { id, memberships } = getData();
  const router = useRouter();
  const [toggle, setToggle] = useState(false);
  const [type, setType] = useState("Gender");
  const dispatch = useDispatch();
  const searchparams = useSearchParams();

  let analyticsdata,
    sevenError,
    thirtyError,
    isLoading = true;
  if (dateValue == 7) {
    ({
      data: analyticsdata,
      isLoading,
      error: sevenError,
    } = useGetAnalyticsQuery({ id: id }, { skip: !id }));
  } else {
    ({
      data: analyticsdata,
      isLoading,
      error: thirtyError,
    } = useGetAnalyticsThirtyDaysQuery({ id: id }, { skip: !id }));
  }
  const { data: getorderdata, error } = useGetFetchOrderQuery(
    { id: id },
    { skip: !id }
  );

  useEffect(() => {
    if (searchparams.get("membership")) {
      axios
        .post(`${process.env.NEXT_PUBLIC_API}/fetchdetails/${id}`)
        .then((res) => {
          const expirationDate = new Date();
          expirationDate.setDate(expirationDate.getDate() + 7);

          Cookies.set(`excktn`, res.data.access_token, {
            expires: expirationDate,
          });
          Cookies.set(`frhktn`, res.data.refresh_token, {
            expires: expirationDate,
          });
          dispatch(sendData(res.data?.data));
          router.push("/main/dashboard");
        });
    }
  }, [searchparams.get("membership")]);

  const [state, setState] = useState({
    dp: "",
    name: "",
    popularity: "",
    stats: "",
    totalmembers: "",
    visitors: "",
    paidmember: "",
    location: "",
    id: "",
    age: "",
    returningvisitor: "",
    newvisitor: "",
    uniquemembers: "",
    activemembers: "",
  });

  useEffect(() => {
    if (
      analyticsdata?.commerged[0]?.image &&
      analyticsdata?.commerged[0]?.name &&
      analyticsdata?.commerged[0].id
    ) {
      setLoading(true);
      setState({
        dp: analyticsdata?.commerged[0]?.image,
        name: analyticsdata?.commerged[0]?.name,
        popularity: analyticsdata?.commerged[0]?.popularity,
        stats: analyticsdata?.commerged[0]?.stats,
        totalmembers: analyticsdata?.commerged[0].totalmembers,
        visitors: analyticsdata?.commerged[0].visitors,
        paidmember: analyticsdata?.commerged[0].paidmember,
        id: analyticsdata?.commerged[0].id,
        location: analyticsdata?.commerged[0].location,
        age: analyticsdata?.commerged[0].agerange,
        returningvisitor: analyticsdata?.commerged[0]?.returningvisitor,
        newvisitor: analyticsdata?.commerged[0]?.newvisitor,
        uniquemembers: analyticsdata?.commerged[0]?.uniquemembers,
        activemembers: analyticsdata?.commerged[0]?.activemembers,
      });
      setLoading(false);
    }
    setLoading(false);
  }, [analyticsdata]);

  if (!analyticsdata || loading || isLoading) {
    return <Loader />;
  }

  if (!id && !loading && !isLoading) {
    return (
      <div class="fixed flex justify-center items-center w-screen h-screen inset-0 z-50 overflow-y-auto">
        <div class="flex min-h-full justify-center p-4 text-center items-center sm:p-0">
          <div class="relative transform overflow-hidden rounded-lg bg-white dark:bg-[#273142] text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
            <div class="bg-white dark:bg-[#273142] px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              <div class="sm:flex sm:items-start">
                <div class="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                  <svg
                    class="h-6 w-6 text-red-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                    />
                  </svg>
                </div>
                <div class="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                  <h3
                    class="text-base font-semibold leading-6 "
                    id="modal-title"
                  >
                    Session Expired
                  </h3>
                  <div class="mt-2">
                    <p class="text-sm text-gray-500">
                      Refresh the page or Log in Again!
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div class="bg-white dark:bg-[#273142] px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              <button
                onClick={() => {
                  Cookies.remove("excktn");
                  Cookies.remove("frhktn");
                  redirect("/login");
                }}
                type="button"
                class="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
              >
                Log in
              </button>
              <button
                onClick={() => window.location.reload()}
                type="button"
                class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
              >
                Refresh
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const data =
    analyticsdata?.prositeData?.visitors &&
    analyticsdata?.prositeData?.visitors?.map((d) => ({
      visitors: d?.visitors,
      date: d?.date ? formatISOStringToDayMonth(d?.date) : d?.date,
    }));

  const COLORS = ["#5A6ACF", "#8593ED", "#C7CEFF"];

  return (
    <div className="flex flex-col w-full sm:h-full">
      <div className="sm:h-[6%] flex pn:max-sm:mt-2 px-1 text-sm mb-2 items-center gap-3">
        <div
          onClick={() => setChange("community")}
          className={`cursor-pointer ${
            change === "community"
              ? "bg-white dark:bg-[#323d4e] font-semibold"
              : "dark:border-[#323d4e] border "
          } p-[6px] rounded-xl px-4`}
        >
          Community
        </div>

        <div
          onClick={() => setChange("store")}
          className={`cursor-pointer ${
            change === "store"
              ? "bg-white dark:bg-[#323d4e] font-semibold"
              : "dark:border-[#323d4e] border"
          }  p-[6px] rounded-xl px-4`}
        >
          Store
        </div>
        <div
          onClick={() => setChange("prosite")}
          className={`cursor-pointer ${
            change === "prosite"
              ? "bg-white dark:bg-[#323d4e] font-semibold"
              : "dark:border-[#323d4e] border"
          }  p-[6px] rounded-xl px-4`}
        >
          Prosite
        </div>
      </div>
      <div className="sm:h-[90%] mb-2">
        {/* community */}
        {change === "community" && (
          <div>
            {/* when community length is zero */}
            {analyticsdata?.commerged.length <= 0 && (
              <div className="flex flex-col justify-center items-center w-full h-[70vh] sm:h-[70vh]">
                <div className="sm:w-auto h-full flex flex-col w-[90%] justify-center gap-4">
                  <div className="text-[#70737D] font-semibold">
                    Create Your Community & Start Earning Today!
                  </div>
                  <div className="font-semibold flex flex-col justify-center gap-3">
                    <div>Way To earn with community </div>
                    <div className="flex flex-col justify-center gap-2">
                      <div>👉 Form a community</div>
                      <div>👍 Create Posts </div>
                      <div className="sm:flex justify-center items-center gap-2">
                        👉 Attaining your audience to unlock{" "}
                        <span>
                          <Link href={"/main/earnings"}>
                            <Image
                              src={Monetization}
                              alt="monteziation"
                              className="sm:w-[120px] w-[90px]"
                            />
                          </Link>
                        </span>
                      </div>
                    </div>
                  </div>

                  <Link
                    href={"/main/community/createCommunity"}
                    className="bg-[#2A85FF] text-sm text-center rounded-xl mt-2 text-white p-2 px-4"
                  >
                    Create community
                  </Link>
                </div>
              </div>
            )}

            {/* when community length is more than zero */}
            {analyticsdata?.commerged.length > 0 && (
              <div className="grid sm:grid-cols-12 grid-cols-1 px-1 gap-3 h-full">
                <div className="md:col-span-8 sm:col-span-7 flex flex-col sm:overflow-y-scroll no-scrollbar sm:max-h-[800px] w-full">
                  <Communitydata
                    state={state}
                    dateValue={dateValue}
                    setDateValue={setDateValue}
                    analyticsdata={analyticsdata}
                    setState={setState}
                  />
                </div>
                <div className="md:col-span-4 sm:col-span-5 sm:-mt-[12%] h-full sm:mb-0 sm:max-h-[590px] top-2 w-full rounded-xl dark:bg-[#273142] dark:border-2 dark:border-[#323d4e] bg-white overflow-hidden p-[6px]">
                  <div className={`h-full flex flex-col `}>
                    <MemorizedPopularity state={state} />
                    <div className="flex text-sm justify-between light:bg-white py-2 rounded-xl my-1 flex-wrap flex-grow  items-center gap-2">
                      <div
                        onClick={() => setComchange(1)}
                        className={`rounded-xl p-1  px-3 sm:px-5 cursor-pointer ${
                          comchange == 1
                            ? "bg-white dark:bg-[#3276ea] font-semibold shadow-def"
                            : "dark:bg-[#323d4e] dark:border-2 dark:border-[#323d4e] "
                        }`}
                      >
                        Members
                      </div>
                      <div
                        onClick={() => setComchange(2)}
                        className={`rounded-xl p-1 px-3 sm:px-5 cursor-pointer ${
                          comchange == 2
                            ? "bg-white dark:bg-[#3276ea] font-semibold shadow-def"
                            : "dark:bg-[#323d4e] dark:border-2 dark:border-[#323d4e] "
                        }`}
                      >
                        Demographics
                      </div>
                      <div
                        onClick={() => setComchange(3)}
                        className={`rounded-xl p-1 px-3 sm:px-5 cursor-pointer ${
                          comchange == 3
                            ? "bg-white dark:bg-[#3276ea] font-semibold shadow-def"
                            : "dark:bg-[#323d4e] dark:border-2 dark:border-[#323d4e]"
                        }`}
                      >
                        Location
                      </div>
                    </div>
                    <div className=" h-full bg-white dark:bg-[#273142]  pn:max-sm:mt-4 rounded-xl dark:text-white light:bg-white sm:overflow-y-scroll z-20 sm:no-scrollbar">
                      <div className="rounded-xl dark:text-white w-full light:bg-white">
                        <div className={`${comchange == 1 ? null : "hidden"}`}>
                          <Member
                            state={state}
                            memberships={memberships}
                            data={analyticsdata?.commerged?.length}
                          />
                        </div>
                      </div>
                      <div
                        className={`${comchange === 2 ? "h-full" : "hidden"}`}
                      >
                        <Demographics
                          demo={analyticsdata?.demo}
                          memberships={memberships}
                          member={state.totalmembers}
                          ages={state.age}
                          data={analyticsdata?.commerged.length}
                        />
                      </div>
                      <div
                        className={` ${
                          comchange == 3
                            ? `${
                                memberships === "Free"
                                  ? "h-full"
                                  : "max-h-[200px]"
                              }`
                            : "hidden"
                        }`}
                      >
                        <LocationCom
                          data={analyticsdata?.commerged?.length}
                          memberships={memberships}
                          state={state}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* store */}
        {change === "store" && (
          <div>
            {/* if store doesnt exists */}
            {!getorderdata?.storeexistornot && (
              <div className="flex flex-col justify-center items-center w-full h-[80vh] sm:h-[70vh]">
                <div className="sm:w-auto h-full flex flex-col w-[90%] justify-center gap-7">
                  <div className="text-[#70737D] font-semibold">
                    Ready to setup your store! Here's Your 3-Step Guide
                  </div>
                  <div></div>
                  <div className="font-semibold flex max-w-[500px] text-sm flex-col justify-center gap-6">
                    <div>Way To earn with community </div>
                    <div className="flex flex-col gap-6">
                      <div className="flex gap-2 items-center">
                        <div>👉</div>
                        <div className="flex flex-col gap-3 bg-white dark:bg-[#273142] min-w-[300px] dark:border-[#3d4654] dark:border shadow-sm py-4 px-3 rounded-xl sm:max-w-[450px]">
                          <div className="flex text-sm flex-col gap-3">
                            <div>
                              Qualify & Build Your Community: Make sure you meet
                              the eligibility criteria, then create a community
                              and share a post to get things started.
                            </div>

                            <div className="flex text-sm flex-col gap-3">
                              <div className="px-2 flex flex-col gap-1">
                                <div className="flex justify-between items-center">
                                  <div className=" dark:text-white text-[#615E83]">
                                    Community
                                  </div>
                                  <div>{analyticsdata?.commerged.length}/1</div>
                                </div>
                                <div className="w-full h-3 relative overflow-hidden min-w-[100px] bg-[#F8F8FF] rounded-full">
                                  <div
                                    style={{
                                      width:
                                        analyticsdata.commerged.length >= 1
                                          ? "100%"
                                          : 0,
                                    }}
                                    className="absolute top-0 left-0 rounded-r-xl  bg-[#40CAB0] h-full "
                                  ></div>
                                </div>
                              </div>
                              <div className="px-2 flex flex-col gap-1">
                                <div className="flex justify-between items-center">
                                  <div className=" dark:text-white text-[#615E83]">
                                    Post
                                  </div>
                                  <div className="">
                                    {analyticsdata?.posts}/1
                                  </div>
                                </div>
                                <div className="w-full h-3 relative overflow-hidden min-w-[100px] bg-[#F8F8FF] rounded-full">
                                  <div
                                    style={{
                                      width:
                                        analyticsdata.posts >= 1 ? "100%" : 0,
                                    }}
                                    className="absolute top-0 left-0 rounded-r-xl  bg-[#40CAB0] h-full "
                                  ></div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div>
                        👉 Register Your Store & Get Verified: Enter your store
                        details to register. Once verified, you'll be ready to
                        sell!{" "}
                      </div>
                      <div className="sm:flex items-center gap-2">
                        👉 Create Collections & Add Products: Organize your
                        products into collections and start adding them to your
                        store.
                        <span></span>
                      </div>
                    </div>
                  </div>
                  <Link
                    href={"/main/store"}
                    className="bg-[#2A85FF] text-sm rounded-xl flex justify-center items-center text-white p-2 px-4"
                  >
                    Create Store
                  </Link>
                </div>
              </div>
            )}

            {/* if store exists but its not verified */}
            {getorderdata?.storeexistornot &&
              getorderdata?.isStoreVerified == false && (
                <div className="pn:max-sm:h-[70vh] h-[80vh] w-full rounded-xl ">
                  <div className="flex flex-col justify-center items-center h-full">
                    <div className="md:text-2xl font-semibold pn:max-sm:text-lg sm:text-xl px-2 dark:text-white">
                      Verification Process Underway
                    </div>
                    <Image src={verify} alt="image" className="max-w-[250px]" />
                    <div className="text-sm">
                      Status : <span className="font-semibold">In review</span>{" "}
                    </div>
                    <div className="flex flex-col text-center max-w-[85%] text-sm sm:max-w-[50%] pt-9 justify-center items-center">
                      We appreciate your patience as we work to verify your
                      account. It Normally takes upto 24 hours. Thank you for
                      your understanding and cooperation during this process.
                    </div>
                  </div>
                </div>
              )}

            {/* if store exists and its verified */}
            {getorderdata?.storeexistornot && getorderdata?.isStoreVerified && (
              <div className="grid sm:grid-cols-12 grid-cols-1 px-1 gap-3 h-full">
                <div className="md:col-span-8 sm:col-span-7 flex flex-col sm:overflow-y-scroll no-scrollbar sm:max-h-[800px] w-full">
                  <Storedata
                    sales={analyticsdata?.sales}
                    getorderdata={getorderdata}
                  />
                </div>
                <div className="md:col-span-4 sm:col-span-5 sm:-mt-[12%] h-full sm:mb-0 sm:max-h-[590px] top-2 w-full rounded-xl dark:bg-[#273142] dark:border-2 dark:border-[#323d4e] bg-white overflow-hidden p-[6px]">
                  <div className={`dark:bg-[#273142] flex flex-col h-full`}>
                    <div className="grid grid-cols-2 h-full  w-full items-center gap-2">
                      <div className="flex flex-col light:bg-white p-3 rounded-xl gap-2 border dark:border-[#3d4654] light:border-[#f1f1f1] w-full">
                        <div>
                          <Image src={p3} alt="p1" />
                        </div>
                        <div>
                          <div className="flex items-center gap-1">
                            <Hover
                              text={"Earnings"}
                              para={
                                "Store Earnings: See your total income from selling products in your store."
                              }
                            />
                          </div>
                          <div className="flex gap-1 text-xs  items-center">
                            <div className="text-base font-medium">
                              ₹{getorderdata?.earnings.toFixed(2)}
                            </div>
                            {/* <div className="text-green-700">+0.00%</div> */}
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col light:bg-white p-3 rounded-xl gap-2 border dark:border-[#3d4654] light:border-[#f1f1f1] w-full">
                        <div>
                          <Image src={p1} alt="p2" />
                        </div>
                        <div>
                          <div className="font-medium">Customers</div>
                          <div className="flex gap-1 text-xs  items-center">
                            <div className="text-base font-medium">
                              {getorderdata?.customers}
                            </div>
                            {/* <div className="text-green-700">+0.00%</div> */}
                          </div>
                        </div>
                      </div>
                      <div className="flex col-span-2 light:bg-white flex-col p-3 rounded-xl gap-3 border dark:border-[#3d4654] light:border-[#f1f1f1] w-full">
                        <div>
                          <Image src={p2} alt="p2" />
                        </div>
                        <div className="flex justify-between items-center ">
                          <div>
                            <div className="font-medium">All Orders</div>
                            <div className="flex gap-1 text-xs  items-center">
                              <div className="text-base font-medium">
                                {getorderdata?.allorders}
                              </div>
                              {/* <div className="text-green-700">+0.00%</div> */}
                            </div>
                          </div>
                          <div>
                            <div className="font-medium">Pending</div>
                            <div className="flex gap-1 text-xs  items-center">
                              <div className="text-base font-medium">
                                {getorderdata?.pendingOrders?.length}
                              </div>
                              {/* <div className="text-green-700">+0.00%</div> */}
                            </div>
                          </div>
                          <div>
                            <div className="font-medium">Completed</div>
                            <div className="flex gap-1 text-xs  items-center">
                              <div className="text-base font-medium">
                                {getorderdata?.completedOrders?.length}
                              </div>
                              {/* <div className="text-green-700">+0.00%</div> */}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-between text-sm light:bg-white pn:max-sm:rounded-xl text-[12px] my-1 py-2 items-center gap-2">
                      <div
                        onClick={() => setProchange(1)}
                        className={`rounded-xl text-xs p-0.5 px-2 cursor-pointer ${
                          prochange == 1
                            ? " bg-[#f9f9f9] p-2 px-4 dark:bg-[#3276ea]  font-semibold shadow-def"
                            : "dark:bg-[#323d4e] dark:border-2 dark:border-[#323d4e] p-2 px-4"
                        }`}
                      >
                        Top Products
                      </div>
                      <div
                        onClick={() => setProchange(2)}
                        className={`rounded-xl  text-xs p-0.5 px-2 cursor-pointer ${
                          prochange == 2
                            ? "bg-[#f9f9f9] p-2 px-4 dark:bg-[#3276ea]  font-semibold shadow-def"
                            : "dark:bg-[#323d4e] dark:border-2 dark:border-[#323d4e] p-2 px-4"
                        }`}
                      >
                        Customer
                      </div>
                      <div
                        onClick={() => setProchange(3)}
                        className={`rounded-xl text-xs p-0.5 px-2 cursor-pointer ${
                          prochange == 3
                            ? "bg-[#f9f9f9] p-2 px-4 dark:bg-[#3276ea]  font-semibold shadow-def"
                            : "dark:bg-[#323d4e] dark:border-2 dark:border-[#323d4e] p-2 px-4"
                        }`}
                      >
                        Location
                      </div>
                    </div>
                    <div className=" rounded-xl light:bg-white sm:h-[450px] ">
                      <div className="h-full min-w-full overflow-scroll no-scrollbar rounded-xl">
                      {prochange == 0 && <DontHave />}
                      {prochange == 1 && (
                        <Products data={analyticsdata?.promerged} />
                      )}
                      {prochange == 2 && (
                        <Customer
                          data={analyticsdata?.pieChart}
                          memberships={memberships}
                        />
                      )}
                      {prochange == 3 && (
                        <LocationStore
                          data={analyticsdata?.storeLocation}
                          memberships={memberships}
                        />
                      )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* prosite */}
        {change === "prosite" && (
          <div className="grid mt-2 grid-cols-1 sm:grid-cols-3 gap-5 w-full pn:max-sm:px-3">
            <div className="grid grid-cols-1 sm:col-span-2 w-full">
              <div className="grid w-full gap-4 sm:gap-6 sm:grid-cols-2 ">
                <div className="bg-white col-span-1 rounded-xl w-full flex flex-col gap-1 p-3 dark:bg-[#273142] ">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-[#00D775]"></div>
                    <div className="text-sm">Visitors</div>
                  </div>
                  <div className="text-xl font-semibold pl-4">
                    {analyticsdata?.prositeData?.totalVisitors
                      ? analyticsdata?.prositeData?.totalVisitors
                      : "0"}
                  </div>
                </div>
                <div className="bg-white col-span-1 w-full rounded-xl flex flex-col gap-1 p-3 dark:bg-[#273142] ">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-[#00B6FF]"></div>
                    <div className="text-sm">Avg. Time spent</div>
                  </div>
                  <div className="text-xl font-semibold pl-4">
                    {analyticsdata?.prositeData?.totalTimeSpent ? (
                      <>
                        {Math.round(
                          Number(analyticsdata?.prositeData?.totalTimeSpent)
                        )}{" "}
                        secs
                      </>
                    ) : (
                      "0 secs"
                    )}
                  </div>
                </div>
              </div>
              <div className="sm:col-span-2 w-full mt-5 flex flex-col bg-white dark:bg-[#273142] py-2 rounded-xl">
                {data?.length > 0 && (
                  <div className="text-sm font-semibold p-2 px-4">
                    Analytics
                  </div>
                )}
                {data?.length > 0 && (
                  <div className="w-full p-2 h-full flex justify-center items-center z-0">
                    <ResponsiveContainer
                      style={{ fontSize: "12px" }}
                      width="100%"
                      height={360}
                    >
                      <LineChart data={data} margin={{ top: 5, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line
                          type="monotone"
                          dataKey="visitors"
                          stroke="#8884d8"
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                )}
                {(!data || data?.length == 0) && (
                  <div className="w-full p-2 min-h-[360px] flex justify-center items-center z-0">
                    <div className="flex flex-col justify-center items-center gap-2">
                      <div className="text-xl font-semibold">
                        Oops! No one has visited your prosite yet
                      </div>
                      <div className="text-sm">
                        Try to increase your engagement by{" "}
                        {analyticsdata.commerged.length > 0
                          ? "posting content in your community"
                          : "creating community and posting content"}
                      </div>
                      <div className="flex justify-center items-center gap-2">
                        {analyticsdata.commerged.length > 0 ? (
                          <Link
                            href={`/main/post/${encryptaes(state.id)}`}
                            className="bg-[#2D9AFF] text-white p-3 mt-2 relative sm:left-8 z-10 text-center font-semibold px-5 text-sm rounded-lg"
                          >
                            Upload Post
                          </Link>
                        ) : (
                          <Link
                            className="bg-[#2D9AFF] text-white p-3 mt-2 relative sm:left-8 z-10 text-center font-semibold px-5 text-sm rounded-lg"
                            href="/main/community/createCommunity"
                          >
                            Create Community
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="grid sm:col-span-1 gap-4 sm:gap-6 w-full">
              <div className="bg-white h-full dark:bg-[#273142] p-2 w-full rounded-xl">
                <div className="flex justify-between items-center gap-1">
                  <div className=" font-semibold px-2 py-1">Analytics</div>
                  <div className="flex justify-center items-center gap-1">
                    <div
                      onClick={() => setToggle(!toggle)}
                      className="flex flex-col w-full bg-[#f7f7f7] dark:bg-[#323d4e] rounded-xl"
                    >
                      <div className="flex justify-between items-center relative min-w-[100px] p-1.5 cursor-pointer h-full gap-2 px-2 w-full text-sm">
                        <div className="flex items-center gap-2">{type}</div>

                        <div className="text-lg ">
                          {toggle ? (
                            <IoIosArrowUp onClick={() => setToggle(!toggle)} />
                          ) : (
                            <IoIosArrowDown
                              onClick={() => setToggle(!toggle)}
                            />
                          )}
                        </div>

                        <div
                          className={`${
                            toggle
                              ? "top-[45px]"
                              : "top-0 border-none hidden text-[0px] w-[0px] h-[0px]"
                          } absolute left-0 bg-[#f7f7f7] duration-100 dark:bg-[#323d4e] rounded-xl z-50 w-full`}
                        >
                          <div className="flex flex-col gap-3 p-3 max-h-[300px] overflow-y-scroll no-scrollbar">
                            <div onClick={() => setType("Gender")}>Gender</div>
                            <div onClick={() => setType("Age")}>Age</div>
                            <div onClick={() => setType("Location")}>
                              Location
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {type == "Gender" && (
                  <>
                    {(analyticsdata?.prositeData?.gender[0]?.percent === 0 &&
                      analyticsdata?.prositeData?.gender[1]?.percent === 0) ||
                    (analyticsdata?.prositeData?.gender[0]?.percent === null &&
                      analyticsdata?.prositeData?.gender[1]?.percent ===
                        null) ||
                    (analyticsdata?.prositeData?.gender[0]?.percent ===
                      undefined &&
                      analyticsdata?.prositeData?.gender[1]?.percent ===
                        undefined) ? (
                      <div className="flex justify-center items-center h-[360px] ">
                        <MemorizedDontHave hide={true} />
                      </div>
                    ) : (
                      <>
                        <div className="w-full mt-3">
                          <ResponsiveContainer width="100%" height={250}>
                            <PieChart>
                              <Pie
                                data={analyticsdata?.prositeData?.gender}
                                dataKey="percent"
                                nameKey="gender"
                                cx="50%"
                                cy="50%"
                                innerRadius={60}
                                outerRadius={80}
                                fill="#82ca9d"
                                label={({ name, value }) => `${name}: ${value}`}
                              >
                                {analyticsdata?.prositeData?.gender?.map(
                                  (entry, index) => (
                                    <Cell
                                      style={{
                                        fontSize: "14px",
                                      }}
                                      key={`cell-${index}`}
                                      fill={COLORS[index % COLORS.length]}
                                    />
                                  )
                                )}
                              </Pie>
                            </PieChart>
                          </ResponsiveContainer>
                        </div>
                        <div className="flex justify-center gap-4 items-center w-full px-4 text-sm font-medium">
                          <div className="flex gap-2">
                            <div className="w-2 h-2 mt-1.5 bg-[#5A6ACF] rounded-full"></div>
                            <div className="flex flex-col items-center">
                              <div>
                                {analyticsdata?.prositeData?.gender[0]?.gender}
                              </div>
                              <div>
                                {analyticsdata?.prositeData?.gender[0]?.percent}
                                %
                              </div>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <div className="w-2 h-2 mt-1.5 bg-[#8593ED] rounded-full"></div>
                            <div className="flex flex-col items-center">
                              <div>
                                {analyticsdata?.prositeData?.gender[1]?.gender}
                              </div>
                              <div>
                                {analyticsdata?.prositeData?.gender[1]?.percent}
                                %
                              </div>
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                  </>
                )}

                {type == "Age" && (
                  <>
                    <div className="w-full mt-5">
                      {analyticsdata?.prositeData?.age?.length > 0 ? (
                        <div className="p-3 border w-full text-sm dark:border-[#3d4654] dark:text-white rounded-xl">
                          <div className="flex justify-between items-center text-sm">
                            <div>Statistics</div>
                            <div>Total:</div>
                          </div>

                          <div className="flex border-b pb-3 dark:border-[#3d4654] justify-between items-center">
                            <div className="font-bold">Age</div>
                          </div>
                          <div className="mt-4 flex flex-col gap-4 sm:gap-6">
                            {analyticsdata?.prositeData?.age &&
                              analyticsdata?.prositeData?.age?.map((d, i) => (
                                <div
                                  key={i}
                                  className="flex gap-2 justify-between items-center"
                                >
                                  <div className="text-sm text-[#615E83] dark:text-white min-w-[45px]">
                                    {d?.age}
                                  </div>
                                  <div className="w-[80%] h-3 relative overflow-hidden min-w-[100px] bg-[#F8F8FF] rounded-3xl">
                                    <div
                                      style={{
                                        width: `${d?.percent}%`,
                                      }}
                                      className="absolute top-0 left-0 rounded-r-xl z-10 bg-[#4A3AFF] h-full"
                                    ></div>
                                  </div>
                                  <div className="text-sm  dark:text-white text-[#615E83]">
                                    {`${d?.percent}%`}
                                  </div>
                                </div>
                              ))}
                          </div>
                        </div>
                      ) : (
                        <div className="flex justify-center h-[360px]  items-center">
                          <MemorizedDontHave hide={true} />
                        </div>
                      )}
                    </div>
                  </>
                )}

                {type == "Location" && (
                  <>
                    <div className="w-full h-full">
                      {analyticsdata?.prositeData?.location.length > 0 ? (
                        <div className="dark:text-white pt-4 text-sm">
                          <div className="flex justify-between mt-3 px-1 items-center">
                            <div className="text-sm font-semibold pb-1">
                              Top Location
                            </div>
                          </div>
                          <div className="my-3 flex flex-col gap-4">
                            {analyticsdata?.prositeData?.location &&
                              analyticsdata?.prositeData?.location?.map(
                                (d, i) => (
                                  <div
                                    key={i}
                                    className="px-2 flex flex-col gap-1"
                                  >
                                    <div className="flex justify-between items-center">
                                      <div className="text-xs dark:text-white  text-[#615E83]">
                                        {d?.state?.toUpperCase()}
                                      </div>
                                      <div>{d?.value}%</div>
                                    </div>

                                    <div className="w-full h-3 relative overflow-hidden min-w-[100px] bg-[#F8F8FF] rounded-full">
                                      <div
                                        style={{ width: `${d?.value}%` }}
                                        className="absolute top-0 left-0 rounded-r-xl z-10 bg-[#5A6ACF] h-full "
                                      ></div>
                                    </div>
                                  </div>
                                )
                              )}
                          </div>
                        </div>
                      ) : (
                        <div className="flex justify-center items-center h-[360px] ">
                          <MemorizedDontHave hide={true} />
                        </div>
                      )}
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
