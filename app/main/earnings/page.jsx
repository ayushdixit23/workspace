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
import { useAddBankMutation, useGetEarningStatsQuery } from "@/app/redux/apiroutes/payment";
import Loader from "@/app/data/Loader";
import { getData } from "@/app/utilsHelper/Useful";
import toast, { Toaster } from "react-hot-toast";
import { useFetchCommunityQuery, useMonetizationMutation } from "@/app/redux/apiroutes/community";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const page = () => {
  const { id } = getData()
  const { data, isLoading, refetch } = useGetEarningStatsQuery({ id }, { skip: !id })
  const [addBank] = useAddBankMutation()
  const { data: comData } = useFetchCommunityQuery({ id }, { skip: !id })
  const [monetisation] = useMonetizationMutation()
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [bank, setBank] = useState({
    bankname: "",
    branchname: "",
    accountno: "",
    IFSCcode: "",
  })

  const [state, setState] = useState({
    id: "", name: "", dp: "", members: "", topics: ""
  })

  const sendRequestForMontenziation = async (id, comid) => {
    try {
      setLoading(true)
      const res = await monetisation({ id, comid })
      if (res.data.success) {
        toast.success("Request Sent For Community Montenziation!")
      }
      setLoading(false)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (comData?.communities.length)
      setState({
        id: comData?.communities[0].id,
        name: comData?.communities[0].name,
        topics: comData?.communities[0].topics,
        dps: comData?.communities[0].dps,
        members: comData?.communities[0]?.members
      })

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

  useEffect(() => {
    // const { bankname = "", branchname = "", accountno = "", IFSCcode = "" } = data?.earningStats.bank
    if (data?.earningStats.bank.bankname && data?.earningStats.bank.branchname && data?.earningStats.bank.accountno && data?.earningStats.bank.IFSCcode) {
      setBank({
        bankname: data?.earningStats.bank.bankname, branchname: data?.earningStats.bank.branchname, accountno: data?.earningStats.bank.accountno, IFSCcode: data?.earningStats.bank.IFSCcode
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
                    onChange={(e) => setBank({ ...bank, bankname: e.target.value })} type="text" className="p-1.5 px-3 bg-[#F4F7FE] dark:bg-[#323d4e] outline-none rounded-xl w-full" placeholder="Bank Name" />
                </div>
              </div>
              <div className="flex flex-col w-full gap-1">
                <div>Branch Name</div>
                <div>
                  <input value={bank.branchname}
                    onChange={(e) => setBank({ ...bank, branchname: e.target.value })} type="text" className="p-1.5 px-3 bg-[#F4F7FE] dark:bg-[#323d4e] outline-none rounded-xl w-full" placeholder="Branch Name" />
                </div>
              </div>
              <div className="flex flex-col w-full gap-1">
                <div>Account Number</div>
                <div>
                  <input value={bank.accountno}
                    onChange={(e) => setBank({ ...bank, accountno: e.target.value })} type="text" className="p-1.5 px-3 bg-[#F4F7FE] dark:bg-[#323d4e] outline-none rounded-xl w-full" placeholder="Account Number" />
                </div>
              </div>
              <div className="flex flex-col w-full gap-1">
                <div>IFSC Code</div>
                <div>
                  <input value={bank.IFSCcode}
                    onChange={(e) => setBank({ ...bank, IFSCcode: e.target.value })} type="text" className="p-1.5 px-3 bg-[#F4F7FE] dark:bg-[#323d4e] outline-none rounded-xl w-full" placeholder="IFSC Code" />
                </div>
              </div>
              <div className="flex justify-center gap-3 items-center">
                <button onClick={() => {
                  setOpen(false);
                }} className="border-[#979797] border font-bold w-full p-2 rounded-lg">Discard</button>
                <button
                  onClick={handleBankDetails}
                  className="bg-[#FFD25E] font-bold w-full p-2 rounded-lg">Done</button>
              </div>
            </div>
          </div>
        </div>
      </div>
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
                  <div className="font-semibold">₹{data?.earningStats?.earnings}</div>
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
              <div className="flex pn:max-sm:col-span-2 bg-white dark:bg-[#273142] justify-between items-center p-4 sm:p-3 px-5 rounded-xl gap-3 w-full">
                <div className="flex justify-center gap-4 items-center">
                  <div>
                    <BsBank className="text-xl" />
                  </div>
                  <div className="sm:text-sm font-semibold">Add Bank</div>
                </div>
                <div onClick={() => setOpen(true)} className="w-4 h-4 cursor-pointer rounded-full border flex justify-center items-center border-black">
                  <MdAdd />
                </div>
              </div>
            </div>
            <div className="w-full sm:bg-white mb-[60px] sm:mb-0 dark:bg-[#273142] rounded-xl p-3">
              <div className="flex sm:flex-row flex-col justify-between items-center">
                <div className="text-[#666666] dark:text-white pn:max-sm:text-center font-medium">
                  You haven't met the criteria to apply for monetisation tool
                  access.
                </div>
                <div className="">
                  <Select
                    className="dark:text-white dark:bg-[#323b4e] dark:border-none "
                    // defaultValue={state.name}

                    onValueChange={(selectedValue) => {
                      const selectedData = comData?.communities.find(
                        (item) => item.id === selectedValue
                      );
                      if (selectedData) {
                        setState({
                          id: selectedData.id,
                          topics: selectedData.topics,
                          dp: selectedData.dps,
                          name: selectedData.name,
                          members: selectedData.members
                        });
                      }
                    }}

                  >
                    <SelectTrigger className="w-[150px] dark:text-white dark:bg-[#323b4e] dark:border-none ">
                      <SelectValue
                        placeholder={state.name}
                        className="dark:text-white dark:bg-[#323b4e] dark:border-none "
                      />
                    </SelectTrigger>
                    <SelectContent className="dark:text-white dark:bg-[#323b4e] dark:border-none ">
                      <SelectGroup className="max-h-[200px] gap-1 w-full flex flex-col justify-center items-center">
                        {comData?.communities?.map((d, i) => (
                          <SelectItem
                            value={
                              `${d?.id}`
                            }
                            key={i}
                            className=" "
                          >

                            <div className="flex justify-center gap-2 items-center w-full">
                              {/* <div>
                                <img
                                  src={d?.dp}
                                  className="max-w-[30px] rounded-lg min-h-[30px] min-w-[30px] max-h-[30px]"
                                  alt="image"
                                />
                              </div> */}
                              <div className="flex flex-col">
                                <div className="text-xs">{d?.name?.length > 8 ? `${d?.name?.slice(0, 8)}...` : d?.name}</div>
                              </div>
                            </div>

                          </SelectItem>
                        ))}

                      </SelectGroup>
                    </SelectContent>
                  </Select>

                </div>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 my-3 ">
                {/* <div className="flex flex-col gap-3 bg-white dark:bg-[#273142] dark:border-[#3d4654] dark:border shadow-sm py-4 px-3 rounded-xl sm:max-w-[450px]">
                  <div className="flex gap-2 items-center">
                    <div>
                      <Image src={order} className="max-w-[80px]" alt="image" />
                    </div>
                    <div className="flex flex-col gap-1">
                      <div className="text-xl font-semibold">Store</div>
                      <div className="text-sm text-[#444444] dark:text-white">
                        "Make shopping fun! Help your viewers find and buy cool
                        stuff while they watch your videos. Connect your store
                        to share products with your friends."
                      </div>
                    </div>
                  </div>
                  <div className="flex text-sm flex-col gap-3">
                    <div className="px-2 flex flex-col gap-1">
                      <div className="flex justify-between items-center">
                        <div className=" dark:text-white text-[#615E83]">Members</div>
                        <div>10</div>
                      </div>
                      <div className="w-full h-3 relative overflow-hidden min-w-[100px] bg-[#F8F8FF] rounded-full">
                        <div
                          style={{ width: `${(state.members / 10) * 100}%` }}
                          className="absolute top-0 left-0 rounded-r-xl z-10 bg-[#5A6ACF] h-full "
                        ></div>
                      </div>
                    </div>
                    <div className="px-2 flex flex-col gap-1">
                      <div className="flex justify-between items-center">
                        <div className=" dark:text-white text-[#615E83]">Engagament Rate</div>
                        <div className="">10 %</div>
                      </div>
                      <div className="w-full h-3 relative overflow-hidden min-w-[100px] bg-[#F8F8FF] rounded-full">
                        <div
                          style={{ width: "40%" }}
                          className="absolute top-0 left-0 rounded-r-xl z-10 bg-[#5A6ACF] h-full "
                        ></div>
                      </div>
                    </div>
                  </div>
                  {state.members >= 10 && <div className="flex justify-end items-center">
                    <button className="bg-[#2D9AFF] text-white p-2 px-5 text-sm rounded-lg">Apply Now</button>
                  </div>}
                </div> */}
                {
                  state.members > 150 && state.topics > 1 ?
                    // state.members > 150 && state.topics > 3 ?
                    <div className="p-4  bg-white dark:bg-[#273142] dark:border-[#3d4654] dark:border rounded-xl">
                      <div className="flex flex-col">
                        <div className="text-sm ">Paid Topics</div>
                        <div className="text-2xl mt-4 font-semibold dark:text-white">
                          ₹ 2000

                        </div>
                        <div className="flex mt-4 mb-2 gap-3 flex-col">
                          <div className="text-[#9CA3AF] font-bold">Top 3 Topic Sold</div>
                          <div className="flex gap-2 text-sm mb-2 flex-col">
                            <div>Esports : ₹5000</div>
                            <div>Gaming :  ₹4000</div>
                            <div>Food :  ₹3000</div>
                          </div>
                        </div>

                      </div>

                    </div>

                    : < div className="flex flex-col gap-3 bg-white dark:bg-[#273142] dark:border-[#3d4654] dark:border shadow-sm py-4 px-3 rounded-xl sm:max-w-[450px]">
                      <div className="flex gap-2 items-center">
                        <div>
                          <Image src={Cl} className="max-w-[80px]" alt="image" />
                        </div>
                        <div className="flex flex-col gap-1">
                          <div className="text-xl font-semibold">Paid Topics</div>
                          <div className="text-sm text-[#444444] dark:text-white">
                            "Create a paid topic and earn monthly income from your
                            members. Your followers pay for exclusive access, and
                            you generate extra revenue."
                          </div>
                        </div>
                      </div>
                      <div className="flex text-sm flex-col gap-3">
                        <div className="px-2 flex flex-col gap-1">
                          <div className="flex justify-between items-center">
                            <div className=" dark:text-white text-[#615E83]">Members</div>
                            <div>{state.members}/150</div>
                          </div>
                          <div className="w-full h-3 relative overflow-hidden min-w-[100px] bg-[#F8F8FF] rounded-full">
                            <div
                              style={{ width: `${(state.members / 150) * 100}%` }}
                              className="absolute top-0 left-0 rounded-r-xl z-10 bg-[#5A6ACF] h-full "
                            ></div>
                          </div>
                        </div>
                        <div className="px-2 flex flex-col gap-1">
                          <div className="flex justify-between items-center">
                            <div className=" dark:text-white text-[#615E83]">Engagament Rate</div>
                            <div className="">10 %</div>
                          </div>
                          <div className="w-full h-3 relative overflow-hidden min-w-[100px] bg-[#F8F8FF] rounded-full">
                            <div
                              style={{ width: "70%" }}
                              className="absolute top-0 left-0 rounded-r-xl z-10 bg-[#5A6ACF] h-full "
                            ></div>
                          </div>
                        </div>
                        {state.members >= 150 && <div className="flex justify-end items-center">
                          <div className="text-green-400">Hurray! Now You Can Create Paid Topics.</div>
                        </div>}
                      </div>
                    </div>}
                {state.members < 1000 ? <div className="flex flex-col gap-3 bg-white dark:bg-[#273142] dark:border-[#3d4654] dark:border shadow-sm py-4 px-3 rounded-xl sm:max-w-[450px]">
                  <div className="flex gap-2 items-center">
                    <div>
                      <Image src={ads} className="max-w-[80px]" alt="image" />
                    </div>
                    <div className="flex flex-col gap-1">
                      <div className="text-xl font-semibold">Ads</div>
                      <div className="text-sm text-[#444444] dark:text-white">
                        "Make money with ads on your community posts! Earn from
                        ads that appear before, during, and after your videos on
                        the watch page."
                      </div>
                    </div>
                  </div>
                  <div className="flex text-sm flex-col gap-3">
                    <div className="px-2 flex flex-col gap-1">
                      <div className="flex justify-between items-center">
                        <div className=" dark:text-white text-[#615E83]">Members</div>
                        <div>{state.members}/1000</div>
                      </div>
                      <div className="w-full h-3 relative overflow-hidden min-w-[100px] bg-[#F8F8FF] rounded-full">
                        <div
                          style={{ width: `${(state.members / 1000) * 100}%` }}
                          className="absolute top-0 left-0 rounded-r-xl z-10 bg-[#5A6ACF] h-full "
                        ></div>
                      </div>
                    </div>
                    <div className="px-2 flex flex-col gap-1">
                      <div className="flex justify-between items-center">
                        <div className=" dark:text-white text-[#615E83]">Engagament Rate</div>
                        <div className="">10 %</div>
                      </div>
                      <div className="w-full h-3 relative overflow-hidden min-w-[100px] bg-[#F8F8FF] rounded-full">
                        <div
                          style={{ width: "50%" }}
                          className="absolute top-0 left-0 rounded-r-xl z-10 bg-[#5A6ACF] h-full "
                        ></div>
                      </div>
                    </div>
                    {state.members >= 1000 && <div className="flex justify-end items-center">
                      <button onClick={() => sendRequestForMontenziation(id, state.id)} className="bg-[#2D9AFF] text-white p-2 px-5 text-sm rounded-lg">Apply for Monetization</button>
                    </div>}
                  </div>
                </div> :
                  <div className="p-4  bg-white dark:bg-[#273142] dark:border-[#3d4654] dark:border rounded-xl">
                    <div className="flex flex-col">
                      <div className="text-sm ">Ad revenue</div>
                      <div className="text-2xl mt-4 font-semibold dark:text-white">
                        ₹ 20,000

                      </div>

                      <div className="flex mt-4 gap-2 mb-2 text-sm flex-col">
                        <div>Impressions : ₹5000</div>
                        <div>CPM (Cost Per Mille) :  ₹4000</div>
                        <div>CPC (Cost Per Click :  ₹3000)</div>
                      </div>


                      <div className="bg-white h-[1px] mt-2 w-full"></div>
                      <div className="flex gap-2 mt-3">
                        <CiCircleInfo className="mt-1" />
                        <div className="text-sm font-bold text-[#0284FE] ">90% The percentage of ad revenue that  creator will receive.</div>
                      </div>
                    </div>

                  </div>
                }
              </div>

            </div>
          </div>
        </div>
      </div >
    </>
  );
};

export default page;
