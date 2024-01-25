"use client";
import React, { useEffect, useState } from "react";
import p1 from "../../assets/image/Icon.png";
import p2 from "../../assets/image/p2.png";
import p3 from "../../assets/image/p3.png";
import emcom from "../../assets/image/emptycom.png";
import Image from "next/image";
import DontHave from "@/app/components/DontHave";
import Products from "@/app/components/Products";
import Customer from "@/app/components/Customer";
import Member from "@/app/components/Member";
import Demographics from "@/app/components/Demographics";
import LocationStore from "@/app/components/LocationStore";
import LocationCom from "@/app/components/LocationCom";
import MemorizedPopularity from "@/app/data/Popularity";
import Loader from "@/app/data/Loader";
import Communitydata from "@/app/data/Communitydata";
import Storedata from "@/app/data/Storedata";
import { useGetAnalyticsQuery } from "@/app/redux/apiroutes/community";
import { useGetFetchOrderQuery } from "@/app/redux/apiroutes/userLoginAndSetting";
import { getData } from "@/app/utils/Useful";

function Dashboard() {
	const [change, setChange] = useState("community");
	const [open, setOpen] = useState(false);
	const [comchange, setComchange] = useState(1);
	const [prochange, setProchange] = useState("1");
	const [loading, setLoading] = useState(true);
	const { id } = getData()
	const { data: analyticsdata, isLoading } = useGetAnalyticsQuery(
		{ id: id },
		{ skip: !id }
	);
	const { data: getorderdata } = useGetFetchOrderQuery(
		{ id: id },
		{ skip: !id }
	);
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
		age: ""
	})
	useEffect(() => {
		if (
			analyticsdata?.commerged[0]?.image &&
			analyticsdata?.commerged[0]?.name &&
			analyticsdata?.commerged[0]?.popularity &&
			analyticsdata?.commerged[0]?.stats
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
				age: analyticsdata?.commerged[0].agerange
			});
			setLoading(false);
		}
		setLoading(false);
	}, [analyticsdata]);

	// console.log(
	// 	analyticsdata
	// )

	if (isLoading || loading) {
		return <Loader />;
	}
	return (
		<div>
			{/* <Toaster /> */}
			<div className="grid grid-cols-1 w-full">
				<div className="grid sm:grid-cols-12 grid-cols-1 gap-3 h-full">
					<div className="md:col-span-8 sm:col-span-7 px-3 flex flex-col w-full max-h-[85vh] ">
						<div className="flex p-2 sm:sticky sm:top-0 text-sm mb-1 items-center gap-3">
							<div
								onClick={() => setChange("community")}
								className={`cursor-pointer ${change === "community" ? "bg-white font-semibold" : "bg-[#F3F3F3]"}  p-[6px] rounded-xl px-4`}
							>
								Community
							</div>
							<div
								onClick={() => setChange("store")}
								className={`cursor-pointer ${change === "store" ? "bg-white font-semibold" : "bg-[#F3F3F3]"}  p-[6px] rounded-xl px-4`}
							>
								Store
							</div>
						</div>

						<div
							onClick={() => setOpen(false)}
							className={`${open ? "fixed inset-0 z-10" : "-z-40"}`}
						></div>
						<div className="overflow-y-scroll scrollbar-hide max-h-full ">
							{analyticsdata?.commerged?.length == 0 ? (
								<div
									className={`w-full ${change == "community" ? null : "hidden"
										} bg-white rounded-xl justify-center items-center flex flex-col h-full min-h-[500px]
                `}
								>
									<div className="flex flex-col gap-3 justify-center h-full items-center">
										<div>
											<Image src={emcom} />
										</div>
										<div className="text-[#1554F6] text-2xl font-medium">
											Create Community
										</div>
										<div className="text-center">
											Start connecting with new people and enjoy the Grovyo!
										</div>
										<div className="bg-[#1554F6] text-white p-2 px-6 rounded-xl">
											Create Community
										</div>
									</div>
								</div>
							) : (
								<>
									{change == "community" && (
										<Communitydata
											state={state}
											analyticsdata={analyticsdata}
											setState={setState}
											open={open}
											setOpen={setOpen}
										/>
									)}
								</>
							)}
							{change == "store" && <Storedata sales={analyticsdata?.sales} getorderdata={getorderdata} />}
						</div>
					</div>
					<div className="md:col-span-4 sm:col-span-5 max-h-[570px] sticky top-2 mt-2 w-full sm:rounded-xl sm:bg-white p-3">
						<div className={` ${change == "community" ? null : "hidden"}`}>
							<MemorizedPopularity state={state} />
							<div className="flex justify-evenly sm:justify-between bg-white py-2 rounded-xl my-2 px-3 sm:flex-wrap items-center gap-2">
								<div
									onClick={() => setComchange(1)}
									className={`rounded-xl p-1.5 px-3 cursor-pointer ${comchange == 1 ? "bg-white font-semibold shadow-def" : "bg-[#F9F9F9] "}`}
								>
									Members
								</div>
								<div
									onClick={() => setComchange(2)}
									className={`rounded-xl p-1.5 px-3 cursor-pointer ${comchange == 2 ? "bg-white font-semibold shadow-def" : "bg-[#F9F9F9] "}`}

								>
									Demographics
								</div>
								<div
									onClick={() => setComchange(3)}
									className={`rounded-xl p-1.5 px-3 cursor-pointer ${comchange == 3 ? "bg-white font-semibold shadow-def" : "bg-[#F9F9F9] "}`}
								>
									Location
								</div>
							</div>
							<div className="sm:max-h-[250px] pn:max-sm:mt-4 rounded-xl bg-white sm:overflow-y-scroll z-20 sm:scrollbar-hide">
								<div className="rounded-xl w-full bg-white">
									{/* <div className={`${comchange == 0 ? null : "hidden"}`}>
										<DontHave />
									</div> */}
									<div className={`${comchange == 1 ? null : "hidden"}`}>
										<Member state={state} data={analyticsdata?.commerged?.length} />
									</div>
								</div>
								<div className={`${comchange == 2 ? null : "hidden"}`}>
									<Demographics demo={analyticsdata?.demo} member={state.totalmembers} ages={state.age} data={analyticsdata?.commerged.length} />
								</div>
								<div className={`${comchange == 3 ? null : "hidden"}`}>
									<LocationCom data={analyticsdata?.commerged?.length} state={state} />
								</div>

							</div>

						</div>
						<div className={`max-h-[90vh] ${change == "store" ? null : "hidden"}`}>
							<div className="grid grid-cols-2  w-full items-center gap-2">
								<div className="flex flex-col bg-white p-3 rounded-xl gap-2 border border-[#f1f1f1] w-full">
									<div>
										<Image src={p3} alt="p1" />
									</div>
									<div>
										<div className="font-medium">Earings</div>
										<div className="flex gap-1 text-xs  items-center">
											<div className="text-base font-medium">0</div>
											<div className="text-green-700">+0.00%</div>
										</div>
									</div>
								</div>
								<div className="flex flex-col bg-white p-3 rounded-xl gap-2 border border-[#f1f1f1] w-full">
									<div>
										<Image src={p1} alt="p2" />
									</div>
									<div>
										<div className="font-medium">Customers</div>
										<div className="flex gap-1 text-xs  items-center">
											<div className="text-base font-medium">
												{getorderdata?.customers}
											</div>
											<div className="text-green-700">+0.00%</div>
										</div>
									</div>
								</div>
								<div className="flex col-span-2 bg-white flex-col p-3 rounded-xl gap-3 border border-[#f1f1f1] w-full">
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
												<div className="text-green-700">+0.00%</div>
											</div>
										</div>
										<div>
											<div className="font-medium">Pending</div>
											<div className="flex gap-1 text-xs  items-center">
												<div className="text-base font-medium">
													{getorderdata?.pendingOrders?.length}
												</div>
												<div className="text-green-700">+0.00%</div>
											</div>
										</div>
										<div>
											<div className="font-medium">Completed</div>
											<div className="flex gap-1 text-xs  items-center">
												<div className="text-base font-medium">
													{getorderdata?.completedOrders?.length}
												</div>
												<div className="text-green-700">+0.00%</div>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div className="flex sm:justify-evenly bg-white pn:max-sm:rounded-xl text-[12px] my-2 p-2 items-center gap-2">
								<div
									onClick={() => setProchange(1)}
									className={`rounded-xl p-2 px-4 cursor-pointer ${prochange == 1 ? "bg-white font-semibold shadow-def" : "bg-[#F9F9F9] "}`}

								>
									Top Products
								</div>
								<div
									onClick={() => setProchange(2)}
									className={`rounded-xl p-2 px-4 cursor-pointer ${prochange == 2 ? "bg-white font-semibold shadow-def" : "bg-[#F9F9F9] "}`}

								>
									Customer
								</div>
								<div
									onClick={() => setProchange(3)}
									className={`rounded-xl p-2 px-4 cursor-pointer ${prochange == 3 ? "bg-white font-semibold shadow-def" : "bg-[#F9F9F9] "}`}

								>
									Location
								</div>
							</div>
							<div className="sm:max-h-[300px] overflow-y-scroll rounded-xl bg-white scrollbar-hide">
								{/* <div className="sm:max-h-[400px] min-w-full overflow-scroll no-scrollbar bg-white rounded-xl"> */}
								{prochange == 0 && <DontHave />}
								{prochange == 1 && <Products data={analyticsdata?.promerged} />}
								{prochange == 2 && <Customer data={analyticsdata?.pieChart} />}
								{prochange == 3 && <LocationStore data={analyticsdata?.storeLocation} />}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Dashboard;
