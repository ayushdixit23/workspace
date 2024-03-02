"use client";
import React, { useEffect, useState } from "react";
import p1 from "../../assets/image/Icon.png";
import p2 from "../../assets/image/p2.png";
import p3 from "../../assets/image/p3.png";
import emcom from "../../assets/image/emptycom.png";
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
import { useGetAnalyticsQuery } from "@/app/redux/apiroutes/community";
import { useGetFetchOrderQuery } from "@/app/redux/apiroutes/userLoginAndSetting";
import { getData } from "@/app/utilsHelper/Useful";
import Link from "next/link";

function Dashboard() {
	const [change, setChange] = useState("community");
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

	console.log(getorderdata, "order")
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
				age: analyticsdata?.commerged[0].agerange
			});
			setLoading(false);
		}
		setLoading(false);
	}, [analyticsdata]);

	if (isLoading || loading) {
		return <Loader />;
	}

	console.log(state)
	return (
		<div>
			{/* <Toaster /> */}
			<div className="grid grid-cols-1 w-full">
				<div className="grid sm:grid-cols-12 grid-cols-1 gap-3 h-full">
					<div className="md:col-span-8 sm:col-span-7 flex flex-col w-full max-h-[85vh] ">
						<div className="flex pn:max-sm:mt-2 sm:sticky px-1 sm:top-0 text-sm mb-2 items-center gap-3">
							<div
								onClick={() => setChange("community")}
								className={`cursor-pointer ${change === "community" ? "bg-white dark:bg-[#323d4e] font-semibold" : "dark:border-[#323d4e] border "} p-[6px] rounded-xl px-4`}
							>
								Community
							</div>
							<div
								onClick={() => setChange("store")}
								className={`cursor-pointer ${change === "store" ? "bg-white dark:bg-[#323d4e] font-semibold" : "dark:border-[#323d4e] border"}  p-[6px] rounded-xl px-4`}
							>
								Store
							</div>
						</div>


						<div className="overflow-y-scroll no-scrollbar max-h-full ">
							{analyticsdata?.commerged?.length == 0 ? (
								<div
									className={`w-full ${change == "community" ? null : "hidden"
										} bg-white dark:bg-[#323d4e] rounded-xl justify-center items-center flex flex-col h-full min-h-[500px]
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
										<Link href={"/main/community/createCommunity"} className="bg-[#1554F6] text-white p-2 px-6 rounded-xl">
											Create Community
										</Link>
									</div>
								</div>
							) : (
								<>
									{change == "community" && (
										<Communitydata
											state={state}
											analyticsdata={analyticsdata}
											setState={setState}
										/>
									)}
								</>
							)}
							{change == "store" && <Storedata sales={analyticsdata?.sales} getorderdata={getorderdata} />}
						</div>
					</div>
					<div className="md:col-span-4 sm:col-span-5 max-h-[570px] sticky top-2 w-full sm:rounded-xl dark:bg-[#273142] dark:border-2 dark:border-[#323d4e] sm:bg-white p-[6px]">
						<div className={`h-full ${change == "community" ? null : "hidden"}`}>
							<MemorizedPopularity state={state} />
							<div className="flex text-sm justify-between light:bg-white py-2 rounded-xl my-2 flex-wrap flex-grow  items-center gap-2">
								<div
									onClick={() => setComchange(1)}
									className={`rounded-xl p-1  px-3 sm:px-5 cursor-pointer ${comchange == 1 ? "bg-white dark:bg-[#3276ea] font-semibold shadow-def" : "dark:bg-[#323d4e] dark:border-2 dark:border-[#323d4e] "}`}
								>
									Members
								</div>
								<div
									onClick={() => setComchange(2)}
									className={`rounded-xl p-1 px-3 sm:px-5 cursor-pointer ${comchange == 2 ? "bg-white dark:bg-[#3276ea] font-semibold shadow-def" : "dark:bg-[#323d4e] dark:border-2 dark:border-[#323d4e] "}`}

								>
									Demographics
								</div>
								<div
									onClick={() => setComchange(3)}
									className={`rounded-xl p-1 px-3 sm:px-5 cursor-pointer ${comchange == 3 ? "bg-white dark:bg-[#3276ea] font-semibold shadow-def" : "dark:bg-[#323d4e] dark:border-2 dark:border-[#323d4e]"}`}
								>
									Location
								</div>
							</div>
							<div className="sm:max-h-[250px] bg-white dark:bg-[#273142] pn:max-sm:mt-4 rounded-xl dark:text-white light:bg-white sm:overflow-y-scroll z-20 sm:no-scrollbar">
								<div className="rounded-xl dark:text-white w-full light:bg-white">
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
						<div className={`dark:bg-[#273142] bg-white max-h-[90vh] ${change == "store" ? null : "hidden"}`}>
							<div className="grid grid-cols-2  w-full items-center gap-2">
								<div className="flex flex-col light:bg-white p-3 rounded-xl gap-2 border dark:border-[#3d4654] light:border-[#f1f1f1] w-full">
									<div>
										<Image src={p3} alt="p1" />
									</div>
									<div>
										<div className="font-medium">Earnings</div>
										<div className="flex gap-1 text-xs  items-center">
											<div className="text-base font-medium">{getorderdata?.earnings}</div>
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
							<div className="flex justify-between text-sm light:bg-white pn:max-sm:rounded-xl text-[12px] my-2 py-2 items-center gap-2">
								<div
									onClick={() => setProchange(1)}
									className={`rounded-xl p-1 px-3 cursor-pointer ${prochange == 1 ? "bg-white dark:bg-[#3276ea]  font-semibold shadow-def" : "dark:bg-[#323d4e] dark:border-2 dark:border-[#323d4e] "}`}

								>
									Top Products
								</div>
								{/* <div
						onClick={() => setProchange(2)}
						className={`rounded-xl p-1 px-3 cursor-pointer ${prochange == 2 ? "bg-white dark:bg-[#3276ea]  font-semibold shadow-def" : "dark:bg-[#323d4e] dark:border-2 dark:border-[#323d4e] "}`}

					>
						Customer
					</div> */}
								{/* <div
						onClick={() => setProchange(3)}
						className={`rounded-xl p-1 px-3 cursor-pointer ${prochange == 3 ? "bg-white dark:bg-[#3276ea]  font-semibold shadow-def" : "dark:bg-[#323d4e] dark:border-2 dark:border-[#323d4e] "}`}

					>
						Location
					</div> */}
							</div>
							<div className="sm:max-h-[300px] overflow-y-scroll rounded-xl light:bg-white no-scrollbar">
								{/* <div className="sm:max-h-[400px] min-w-full overflow-scroll no-scrollbar bg-white rounded-xl"> */}
								{prochange == 0 && <DontHave />}
								{prochange == 1 && <Products data={analyticsdata?.promerged} />}
								{/* {prochange == 2 && <Customer data={analyticsdata?.pieChart} />} */}
								{/* {prochange == 3 && <LocationStore data={analyticsdata?.storeLocation} />} */}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Dashboard;

