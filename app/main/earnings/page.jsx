"use client"
import Image from "next/image";
import React, { useEffect, useState } from "react";
// import { MdOutlineNotifications } from "react-icons/md";
import { CiCircleInfo } from "react-icons/ci"
import e1 from "../../assets/image/e1.png";
import e2 from "../../assets/image/e2.png";
import Cl from "../../assets/image/Cl.png";
import { BsBank } from "react-icons/bs";
import ads from "../../assets/image/ads.png";
import order from "../../assets/image/order.png";
import rupee from "../../assets/image/rupee.png";
import { MdAdd } from "react-icons/md";
import {
  useAddBankMutation,
  //  useBankRequestMutation,
  useGetEarningStatsQuery
} from "@/app/redux/apiroutes/payment";
import Loader from "@/app/data/Loader";
import { getData } from "@/app/utilsHelper/Useful";
import toast, { Toaster } from "react-hot-toast";
import { useFetchCommunityQuery, useMonetizationMutation } from "@/app/redux/apiroutes/community";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import Cookies from "js-cookie";
import { encryptaes } from "@/app/utilsHelper/security";
import { useRouter } from "next/navigation";
import Selected from "@/app/componentsWorkSpace/Selected";
import Link from "next/link";

const page = () => {
  const { id } = getData()
  const router = useRouter()
  const { data, isLoading, refetch } = useGetEarningStatsQuery({ id }, { skip: !id })
  const [addBank] = useAddBankMutation()
  // const [requestbank] = useBankRequestMutation()
  const { data: comData } = useFetchCommunityQuery({ id }, { skip: !id })
  const [monetisation] = useMonetizationMutation()
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [bank, setBank] = useState({
    bankname: "",
    branchname: "",
    accountno: "",
    IFSCcode: "",
    verified: ""
  })
  const [count, setCount] = useState({
    post: 0,
    com: 0
  })
  const [state1, setState1] = useState({
    id: "", name: "", dp: "", members: "", topics: "", engagementrate: "", category: "", desc: "", topic: [], ismonetized: false, earnings: ""
  })
  const [state2, setState2] = useState({
    id: "", name: "", dp: "", members: "", topics: "", engagementrate: "", category: "", desc: "", topic: [], ismonetized: false, status: ""
  })

  const sendRequestForMontenziation = async (id, comid) => {
    try {
      setLoading(true)
      const res = await monetisation({ id, comid })
      if (res.data.success) {
        toast.success("Request Sent For Community Montenziation!")
      }
      setState2({
        ...state2, status: "pending"
      })
      setLoading(false)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (comData?.communities.length > 0) {

      setCount({
        com: comData?.communities.length,
        post: comData?.communities[0].post,
      })
      setState1({
        id: comData?.communities[0].id,
        name: comData?.communities[0].name,
        topics: comData?.communities[0].topics,
        dp: comData?.communities[0].dps,
        members: comData?.communities[0]?.members,
        engagementrate: comData?.communities[0].engagementrate,
        category: comData?.communities[0].category,
        desc: comData?.communities[0].desc,
        topic: comData?.communities[0].topic,
        ismonetized: comData?.communities[0].ismonetized,
        earnings: comData?.communities[0].topic.reduce((total, item) => total + (item.earnings || 0), 0)
      })
      setState2({
        id: comData?.communities[0].id,
        name: comData?.communities[0].name,
        topics: comData?.communities[0].topics,
        dp: comData?.communities[0].dps,
        members: comData?.communities[0]?.members,
        engagementrate: comData?.communities[0].engagementrate,
        category: comData?.communities[0].category,
        desc: comData?.communities[0].desc,
        topic: comData?.communities[0].topic,
        ismonetized: comData?.communities[0].ismonetized,
        status: comData?.communities[0].monstatus
      })
    }

  }, [comData])


  const handleBankDetails = async (e) => {

    e.preventDefault()
    if (!bank.IFSCcode || !bank.accountno || !bank.bankname || !bank.branchname) {
      toast.error("Please Enter All Details")
      return
    }
    setLoading(true)
    try {
      const data = {
        bankname: bank.bankname,
        branchname: bank.branchname,
        accountno: bank.accountno,
        IFSCcode: bank.IFSCcode,
      }
      const res = await addBank({
        id,
        data
      })
      await refetch()
      setOpen(false)
      setLoading(false)
      toast.success("Bank Details Saved!")
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  // const requestingBank = async () => {
  //   try {
  //     const res = await requestbank({
  //       id
  //     })
  //     console.log(res.data)
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

  const tosetCookie = {
    dps: state1.dp?.trim(),
    title: state1?.name,
    category: state1?.category,
    desc: state1?.desc,
    topics: "",
    memberscount: state1?.members
  }


  useEffect(() => {
    // const { bankname = "", branchname = "", accountno = "", IFSCcode = "" } = data?.earningStats.bank
    if (data?.earningStats.bank.bankname && data?.earningStats.bank.branchname && data?.earningStats.bank.accountno && data?.earningStats.bank.IFSCcode) {
      setBank({
        bankname: data?.earningStats.bank.bankname, branchname: data?.earningStats.bank.branchname, accountno: data?.earningStats.bank.accountno, IFSCcode: data?.earningStats.bank.IFSCcode, verified: data?.earningStats?.isbankverified
      })
    } else {
      setBank({
        bankname: "", branchname: "", accountno: "", IFSCcode: ""
      })
    }
    console.log(data?.earningStats.bank)
  }, [data])

  if (loading) {
    return (
      <>
        <div className="fixed inset-0 w-screen z-50 bg-black/60 h-screen flex justify-center items-center backdrop-blur-md">
          <div className="animate-spin">
            <AiOutlineLoading3Quarters className="text-2xl text-white" />
          </div>
        </div>
      </>
    );
  }

  if (isLoading) {
    return <Loader />
  }

  return (
    <>
      <Toaster />
      <div className={`${open ? "fixed inset-0 w-screen z-50 bg-[#cccccc33] h-screen flex justify-center items-center" : "hidden -z-50"}`}>
        <div className="flex justify-center shadow-md items-center w-[90%] pp:w-[65%] sm:max-w-[500px] lg:w-[30%] p-3 rounded-xl dark:bg-[#273142] bg-white">
          <div className="w-full flex flex-col gap-2">
            <div className="text-xl mt-2 text-center font-semibold">Enter Bank Details</div>
            <div className="flex flex-col gap-3 p-2">
              <div className="flex flex-col w-full gap-1">
                <div>Bank Name</div>
                <div>
                  <input value={bank.bankname}
                    disabled={bank.verified === "pending"}
                    onChange={(e) => setBank({ ...bank, bankname: e.target.value })} type="text" className="p-1.5 px-3 bg-[#F4F7FE] dark:bg-[#323d4e] outline-none rounded-xl w-full" placeholder="Bank Name" />
                </div>
              </div>
              <div className="flex flex-col w-full gap-1">
                <div>Branch Name</div>
                <div>
                  <input value={bank.branchname}
                    disabled={bank.verified === "pending"}
                    onChange={(e) => setBank({ ...bank, branchname: e.target.value })} type="text" className="p-1.5 px-3 bg-[#F4F7FE] dark:bg-[#323d4e] outline-none rounded-xl w-full" placeholder="Branch Name" />
                </div>
              </div>
              <div className="flex flex-col w-full gap-1">
                <div>Account Number</div>
                <div>
                  <input value={bank.accountno}
                    disabled={bank.verified === "pending"}
                    onChange={(e) => setBank({ ...bank, accountno: e.target.value })} type="text" className="p-1.5 px-3 bg-[#F4F7FE] dark:bg-[#323d4e] outline-none rounded-xl w-full" placeholder="Account Number" />
                </div>
              </div>
              <div className="flex flex-col w-full gap-1">
                <div>IFSC Code</div>
                <div>
                  <input value={bank.IFSCcode}
                    disabled={bank.verified === "pending"}
                    onChange={(e) => setBank({ ...bank, IFSCcode: e.target.value })} type="text" className="p-1.5 px-3 bg-[#F4F7FE] dark:bg-[#323d4e] outline-none rounded-xl w-full" placeholder="IFSC Code" />
                </div>
              </div>
              {bank.verified === "pending" && <div className="flex gap-1 text-sm my-2 items-center">
                <div>
                  <CiCircleInfo />
                </div>
                <div>Bank Verification is in under process.</div>
              </div>}
              <div className="flex justify-center gap-3 items-center">
                <button onClick={() => {
                  setOpen(false);
                }} className="border-[#979797] border font-bold w-full p-2 rounded-lg">Discard</button>
                {bank.verified !== "approved" && < button
                  disabled={bank.verified === "pending"}
                  onClick={handleBankDetails}
                  className="bg-[#FFD25E] font-bold w-full p-2 rounded-lg">Done</button>}
              </div>
            </div>
          </div>
        </div>
      </div >
      <div className="grid grid-cols-1 w-full">
        {/* <div className="flex justify-between py-2 my-3 px-5 bg-white dark:bg-[#273142] rounded-2xl items-center">
          <div className="flex flex-col gap-2 justify-center">
            <div className="text-[#0066FF] sm:leading-snug sm:max-w-[80%] px-3 font-semibold text-xl sm:text-[26px]">
              "Empower Your Community: Unlock Ads and Stores for Earning
              Potential!"
            </div>
            <div className="flex items-center px-3 pb-3">
              <div className="bg-black dark:bg-[#3d4654] dark:text-white rounded-full gap-2 font-medium text-white p-2 px-3 flex justify-center items-center">
                <div>Notify Me!</div>
                <div className="text-xl bg-white text-black rounded-full flex justify-center items-center w-5 h-5 sm:w-7 sm:h-7">
                  <MdOutlineNotifications />
                </div>
              </div>
            </div>
          </div>
          <div className="sm:block hidden">
            <Image
              src={e1}
              alt="image"
              className="md:max-w-[500px] max-w-[300px] max-h-[180px]"
            />
          </div>
        </div> */}
        <div className="grid w-full grid-cols-1">
          <div className="grid w-full gap-4 grid-cols-1">
            <div className="grid w-full grid-cols-2 sm:grid-cols-3 gap-4">
              <div className="flex bg-white dark:bg-[#273142] items-center p-3 sm:px-5 rounded-xl gap-3 w-full">
                <div>
                  <Image
                    src={rupee}
                    className="min-w-[20px] min-h-[20px]"
                    alt="image"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <div className="text-sm">Total Earnings</div>
                  <div className="font-semibold">₹{data?.earningStats?.earnings.toFixed(2)}</div>
                </div>
              </div>
              <div className="flex bg-white dark:bg-[#273142] items-center p-3 sm:px-5 rounded-xl gap-3 w-full">
                <div>
                  <Image
                    src={e2}
                    className="min-w-[20px] min-h-[20px]"
                    alt="image"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <div className="text-sm ">Pending Payments</div>
                  <div className="font-semibold">₹{data?.earningStats?.pendingpayments}</div>
                </div>
              </div>
              <div className="flex flex-col w-full h-full">
                {
                  bank.verified === "pending" ? <div className="flex h-full w-full pn:max-sm:col-span-2 bg-white dark:bg-[#273142] justify-between items-center p-4 sm:p-3 px-5 font-bold rounded-xl gap-3">
                    Bank  Verification Under Process
                  </div> : <div onClick={() =>
                    setOpen(true)
                  } className="flex h-full w-full pn:max-sm:col-span-2 bg-white dark:bg-[#273142] justify-between items-center p-4 sm:p-3 px-5 rounded-xl gap-3">
                    <div className="flex justify-center gap-4 items-center">
                      <div>
                        <BsBank className="text-xl" />
                      </div>
                      <div className="sm:text-sm font-semibold">Add Bank</div>
                    </div>
                    {(bank.verified !== "approved" || bank.verified !== "pending") && < div className="w-4 h-4 cursor-pointer rounded-full border flex justify-center items-center border-black">
                      <MdAdd />
                    </div>}

                  </div>
                }
              </div>
            </div>

            <div className="w-full sm:bg-white mb-[60px] sm:mb-0 dark:bg-[#273142] rounded-xl p-3">
              <div className="flex sm:flex-row flex-col justify-between items-center">
                <div className="text-[#666666] dark:text-white pn:max-sm:text-center font-medium">
                  You haven't met the criteria to apply for monetisation tool
                  access.
                </div>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 my-3 ">
                <div className="flex flex-col gap-3 bg-white dark:bg-[#273142] dark:border-[#3d4654] dark:border shadow-sm py-4 px-3 rounded-xl sm:max-w-[450px]">
                  {/* <div className="flex gap-2 items-center">
                    <div>
                      <Image src={order} className="max-w-[80px]" alt="image" />
                    </div>
                    <div className="flex flex-col gap-1">
                      <div className="text-xl font-semibold">Store</div>
                      <div className="text-sm text-[#444444] dark:text-white">
                        To be eligible for creating a store or uploading products, users must first establish a community presence by creating and contributing at least one post in the community."
                      </div>
                    </div>
                  </div> */}
                  {/* <div className="flex text-sm flex-col gap-3">
                    {count.com < 1 || count.post < 1 ? <div className="flex text-sm flex-col gap-3">
                      <div className="px-2 flex flex-col gap-1">
                        <div className="flex justify-between items-center">
                          <div className=" dark:text-white text-[#615E83]">Community</div>
                          <div>{count.com}/1</div>
                        </div>
                        <div className="w-full h-3 relative overflow-hidden min-w-[100px] bg-[#F8F8FF] rounded-full">
                          <div
                            style={{ width: `${(count.com / 1) * 100}%` }}
                            className="absolute top-0 left-0 rounded-r-xl  bg-[#40CAB0] h-full "
                          ></div>
                        </div>
                      </div>
                      <div className="px-2 flex flex-col gap-1">
                        <div className="flex justify-between items-center">
                          <div className=" dark:text-white text-[#615E83]">Post</div>
                          <div className="">1</div>
                        </div>
                        <div className="w-full h-3 relative overflow-hidden min-w-[100px] bg-[#F8F8FF] rounded-full">
                          <div
                            style={{ width: `${(count.post / 1) * 100}%` }}
                            className="absolute top-0 left-0 rounded-r-xl  bg-[#40CAB0] h-full "
                          ></div>
                        </div>
                      </div>
                    </div>
                      :
                      <div className="flex justify-center items-center mt-4">
                        <button onClick={() => {
                          router.push("/main/store")
                        }} className="bg-[#2D9AFF] text-white p-2 text-center font-semibold px-5 text-sm rounded-lg">Get Ready !!
                          <br />to Create your Store</button>
                      </div>
                    }
                  </div> */}
                  <div className="flex items-center gap-2">
                    <div><Image src={order} alt="image" className="w-[60px] h-[60px] object-cover rounded-xl" /></div>
                    <div className="text-lg font-semibold">Sell Products</div>
                  </div>
                  {(count.com < 1 || count.post < 1 || !comData.store) &&
                    <div className="text-sm">
                      To be eligible for creating a store or uploading products, users must first establish a community presence by creating and contributing at least one post in the community."
                    </div>}

                  <div className="flex text-sm flex-col gap-3">
                    {
                      comData?.store && count.com > 1 && count.post > 1 ?
                        (data?.earningStats?.length > 0 ?
                          <>
                            <div className="bg-[#f1f1f1] rounded-lg dark:bg-[#3d4654]">
                              <div className="flex flex-col py-2 text-[14px] font-semibold gap-1 justify-center items-center">
                                <div>Total Earnings</div>
                                <div>₹{data?.earningStats?.storeearning.toFixed(2)}</div>
                              </div>
                            </div>

                            <div className="text-sm">
                              <div className="flex justify-between items-center">
                                <div>Product Name</div>
                                <div>sales(by quantity.)</div>
                              </div>
                              {data?.earningStats?.final.map((d) => (
                                < div className="flex mt-2 justify-between items-center">
                                  <div>{d?.name}</div>
                                  <div>{d?.itemsold}</div>
                                </div>
                              ))}

                            </div>

                          </> : <div className="flex justify-center items-center text-xl py-10 px-2 font-bold">No Products Available</div>) :

                        <> {
                          count.com < 1 || count.post < 1 ? <div className="flex text-sm flex-col gap-3">
                            <div className="px-2 flex flex-col gap-1">
                              <div className="flex justify-between items-center">
                                <div className=" dark:text-white text-[#615E83]">Community</div>
                                <div>{count.com}/1</div>
                              </div>
                              <div className="w-full h-3 relative overflow-hidden min-w-[100px] bg-[#F8F8FF] rounded-full">
                                <div
                                  style={{ width: `${(count.com / 1) * 100}%` }}
                                  className="absolute top-0 left-0 rounded-r-xl  bg-[#40CAB0] h-full "
                                ></div>
                              </div>
                            </div>
                            <div className="px-2 flex flex-col gap-1">
                              <div className="flex justify-between items-center">
                                <div className=" dark:text-white text-[#615E83]">Post</div>
                                <div className="">{count.post}/1</div>
                              </div>
                              <div className="w-full h-3 relative overflow-hidden min-w-[100px] bg-[#F8F8FF] rounded-full">
                                <div
                                  style={{ width: `${(count.post / 1) * 100}%` }}
                                  className="absolute top-0 left-0 rounded-r-xl  bg-[#40CAB0] h-full "
                                ></div>
                              </div>
                            </div>
                          </div>
                            :
                            <div className="flex justify-center items-center mt-4">
                              <button onClick={() => {
                                router.push("/main/store")
                              }} className="bg-[#2D9AFF] text-white p-2 text-center font-semibold px-5 text-sm rounded-lg">Get Ready !!
                                <br />to Create your Store</button>
                            </div>
                        }</>
                    }

                  </div>
                </div>
                <div className="flex flex-col gap-3 bg-white dark:bg-[#273142] dark:border-[#3d4654] dark:border shadow-sm py-4 px-3 rounded-xl sm:max-w-[450px]">

                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <div><Image src={Cl} alt="image" className="w-[60px] h-[60px] object-cover rounded-xl" /></div>
                      <div className="text-lg font-semibold">Topics</div>
                    </div>
                    {comData?.communities?.length > 0 && <div>
                      <Selected setState={setState1} state={state1} data={comData?.communities} />
                    </div>}
                  </div>
                  {(state1.members < 150 || state1.engagementrate < 10 || state1.topics < 3) && < div className="text-sm">
                    To create a topic, meet criteria: 150 members, 10% engagement.
                  </div>
                  }
                  <div className="flex text-sm flex-col gap-3">

                    {state1.members >= 150 && state1.engagementrate >= 10 && state1.topics > 2 ?
                      <>
                        <div className="bg-[#f1f1f1] rounded-lg dark:bg-[#3d4654]">
                          <div className="flex flex-col py-2 text-[14px] font-semibold gap-1 justify-center items-center">
                            <div>Total Earnings</div>
                            <div>₹{Number(state1.earnings).toFixed(2)}</div>
                          </div>
                        </div>

                        <div className="text-sm">
                          <div className="flex justify-between items-center">
                            <div>Topics</div>
                            <div>Members</div>
                            <div>Earnings</div>
                          </div>
                          {
                            state1.topic.map((d, i) => (
                              <div className="flex mt-1 justify-between items-center">
                                <div>{d?.title}</div>
                                <div>{d?.members}</div>
                                <div>{d?.earnings}</div>
                              </div>
                            ))
                          }
                        </div>

                      </>
                      :
                      <>
                        {

                          (state1.engagementrate < 10 || state1.members < 150)
                          &&

                          (comData?.communities?.length === 0 ? <>

                            <div className="flex justify-center flex-grow h-full items-center mt-6">
                              <Link className="bg-[#2D9AFF] text-white p-2 text-center font-semibold px-5 text-sm rounded-lg" href={"/main/community/createCommunity"}>Create Community</Link>
                            </div>

                          </> : < div className="flex text-sm flex-col gap-3">
                            <div className="px-2 flex flex-col gap-1">
                              <div className="flex justify-between items-center">
                                <div className=" dark:text-white text-[#615E83]">Members</div>
                                <div>{state1.members}/150</div>
                              </div>
                              <div className="w-full h-3 relative overflow-hidden min-w-[100px] bg-[#F8F8FF] rounded-full">
                                <div
                                  style={{ width: `${(state1.members / 150) * 100}%` }}
                                  className="absolute top-0 left-0 rounded-r-xl  bg-[#40CAB0] h-full "
                                ></div>
                              </div>
                            </div>
                            <div className="px-2 flex flex-col gap-1">
                              <div className="flex justify-between items-center">
                                <div className=" dark:text-white text-[#615E83]">Popularity Rate</div>
                                <div className="">{state1.engagementrate} %</div>
                              </div>
                              <div className="w-full h-3 relative overflow-hidden min-w-[100px] bg-[#F8F8FF] rounded-full">
                                <div
                                  style={{ width: `${((state1.engagementrate) / 10) * 100}%` }}
                                  className="absolute top-0 left-0 rounded-r-xl  bg-[#40CAB0] h-full "
                                ></div>
                              </div>
                            </div>
                          </div>)
                        }
                        {state1.members >= 150 && state1.engagementrate >= 10 && < div className="flex justify-center mt-5 items-center">
                          <div className="text-green-400">
                            {state1.topics < 3 && <button onClick={() => {
                              Cookies.set("comedta", JSON.stringify(tosetCookie))
                              Cookies.set("cmdyd", encryptaes(state1.id))
                              router.push("/main/community/editCommunity?topics=true")
                            }} className="bg-[#2D9AFF] text-white p-2 text-center font-semibold px-5 text-sm rounded-lg">Get Ready !!
                              <br />to Create your first Topic</button>}
                          </div>
                        </div>}
                      </>
                    }
                  </div>
                </div>

                {/* {state2.members >= 1000 && state2.engagementrate >= 10 ?
                  <div className="p-4  bg-white dark:bg-[#273142] dark:border-[#3d4654] dark:border rounded-xl">
                    <div className="flex flex-col">
                      <div className="text-sm flex justify-between items-center">
                        <div>Ad revenue</div>
                        <div>
                          <Selected setState={setState2} state={state2} data={comData?.communities} />
                        </div>
                      </div>
                      <div className="text-2xl mt-4 font-semibold dark:text-white">
                        ₹ 20,000
                      </div>


                      <div className="bg-white h-[1px] mt-2 w-full"></div>
                      <div className="flex gap-2 mt-3">
                        <CiCircleInfo className="mt-1" />
                        <div className="text-sm font-bold text-[#0284FE] ">90% The percentage of ad revenue that  creator will receive.</div>
                      </div>
                    </div>

                  </div> : */}
                <div className="flex flex-col gap-3 bg-white dark:bg-[#273142] dark:border-[#3d4654] dark:border shadow-sm py-4 px-3 rounded-xl sm:max-w-[450px]">

                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <div><Image src={ads} alt="image" className="w-[60px] h-[60px] object-cover rounded-xl" /></div>
                      <div className="text-lg font-semibold">Ads Revenue</div>
                    </div>
                    {comData?.communities?.length > 0 && <div>
                      <Selected setState={setState2} state={state2} data={comData?.communities} />
                    </div>}
                  </div>
                  {(state2.members < 1000 || state2.engagementrate < 10 || state2.ismonetized === false) && < div className="text-sm">
                    "Make money with ads on your community posts! Earn from ads that appear before, during, and after your videos on the watch page."
                  </div>}

                  {(state2.members >= 1000 && state2.engagementrate >= 10 && state2.ismonetized) ? <>
                    <div className="bg-[#f1f1f1] rounded-lg dark:bg-[#3d4654]">
                      <div className="flex flex-col py-2 text-[14px] font-semibold gap-1 justify-center items-center">
                        <div>Total Earnings</div>
                        <div>₹{data?.earningStats?.adsearning}</div>
                      </div>
                    </div>

                    {/* <div className="flex mt-4 gap-2 mb-2 text-sm flex-col">
                      <div>Impressions : ₹5000</div>
                      <div>CPM (Cost Per Mille) :  ₹4000</div>
                      <div>CPC (Cost Per Click :  ₹3000)</div>
                    </div> */}
                  </>
                    :
                    <div className="flex text-sm flex-col gap-3">
                      {(state2.members < 1000 || state2.engagementrate < 10) &&
                        (comData?.communities?.length === 0 ? <>

                          <div className="flex justify-center flex-grow h-full items-center mt-6">
                            <Link className="bg-[#2D9AFF] text-white p-2 text-center font-semibold px-5 text-sm rounded-lg" href={"/main/community/createCommunity"}>Create Community</Link>
                          </div>

                        </> : <> <div className="px-2 flex flex-col gap-1">
                          <div className="flex justify-between items-center">
                            <div className=" dark:text-white text-[#615E83]">Members</div>
                            <div>{state2.members}/1000</div>
                          </div>
                          <div className="w-full h-3 relative overflow-hidden min-w-[100px] bg-[#F8F8FF] rounded-full">
                            <div
                              style={{ width: `${(state2.members / 1000) * 100}%` }}
                              className="absolute top-0 left-0 rounded-r-xl  bg-[#40CAB0] h-full "
                            ></div>
                          </div>
                        </div>
                          <div className="px-2 flex flex-col gap-1">
                            <div className="flex justify-between items-center">
                              <div className=" dark:text-white text-[#615E83]">Popularity Rate</div>
                              <div className="">{state2.engagementrate} %</div>
                            </div>
                            <div className="w-full h-3 relative overflow-hidden min-w-[100px] bg-[#F8F8FF] rounded-full">
                              <div
                                style={{ width: `${((state2.engagementrate) / 10) * 100}%` }}
                                className="absolute top-0 left-0 rounded-r-xl  bg-[#40CAB0] h-full "
                              ></div>
                            </div>
                          </div>
                        </>
                        )}

                      {state2.members >= 1000 && state2.engagementrate >= 10 && !state2.ismonetized && < div className="flex justify-end items-center">
                        <button disabled={state2.status == "pending"} onClick={() => sendRequestForMontenziation(id, state2.id)} className="bg-[#2D9AFF] text-white p-2 px-5 text-sm rounded-lg">{state2.status == "pending" ? "Waiting..." : "Apply for Monetization"}</button>
                      </div>}
                    </div>
                  }

                </div>
                {/* } */}
              </div>

            </div>
          </div>
        </div>
      </div >
    </>
  );
};

export default page;
