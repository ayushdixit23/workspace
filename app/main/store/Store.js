"use client";
import React, { useEffect, useState } from "react";
import Productinformation from "./productinformation";
import Link from "next/link";
import Image from "next/image";
import p1 from "../../assets/image/Icon.png";
import p2 from "../../assets/image/p2.png";
import p3 from "../../assets/image/p3.png";
import verify from "../../assets/image/verify.png";
import { useDispatch } from "react-redux";
import CreateStore from "./createStore";
import CreateCollection from "./createCollection";
import {
	useCheckStoreExistsQuery,
	useDeleteProductMutation,
	useGetProductQuery,
	//useRemoveCollectionMutation,
} from "@/app/redux/apiroutes/product";
import { getData } from "@/app/utilsHelper/Useful";
import { encryptaes } from "@/app/utilsHelper/security";
import { GoPlus } from "react-icons/go";
import toast from "react-hot-toast";
import { LoadThis } from "@/app/redux/slice/userData";
import { useSearchParams, useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { FaCrown } from "react-icons/fa";
import MembershipPopup from "@/app/componentsWorkSpace/MembershipPopup";
import { useGetFetchOrderQuery } from "@/app/redux/apiroutes/userLoginAndSetting";
import axios from "axios";

export default function Store() {
	const [data, setData] = useState([]);
	const { id, memberships } = getData()
	const dispatch = useDispatch();
	// const [check, setCheck] = useState(2);
	const [check, setCheck] = useState(null);
	const params = useSearchParams()
	const queryForCreation = params.get("q")
	const router = useRouter()
	const [location, setLocation] = useState({
		latitude: "",
		longitude: "",
		accuracy: "",
		altitude: "",
	})


	const [loading, setLoading] = useState(false)
	const [col, setCol] = useState({
		d1: "",
		d2: "Retail",
		d3: null,
	});
	const [productdeletemutate] = useDeleteProductMutation();
	const { data: getorderdata } = useGetFetchOrderQuery(
		{ id: id },
		{ skip: !id }
	);
	const { data: productdata, isLoading, refetch } = useGetProductQuery(
		{ id: id },
		{ skip: !id, refetchOnMountOrArgChange: true, }
	);
	const { data: checkstore, refetch: refetchStore } = useCheckStoreExistsQuery(
		{ id },
		{
			skip: !id
		}
	);
	const [pop, setPop] = useState(false)
	//const [deleteMutation] = useRemoveCollectionMutation();
	const [showImage, setShowImage] = useState(null);
	const [image, setImage] = useState(null);

	// const remove = async (e, colid) => {
	//   e.preventDefault();

	//   try {
	//     console.log(id, colid);
	//     const result = await deleteMutation({
	//       id: id,
	//       colid: colid,
	//     });
	//     console.log(result);
	//   } catch (e) {
	//     console.log(e);
	//   }
	// };
	const [store, setStore] = useState({
		d1: "",
		d2: "",
		d3: "",
		d4: "",
		d5: "",
		d6: "",
		d7: "",
		d8: "",
		d9: "",
	});

	// const fetchLatAndLong = async () => {
	// 	const res = await axios.get(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent('37 A, rampuram')}`)
	// 	console.log(res.data,encodeURIComponent('37 A, rampuram, Shyam nagar, Kanpur, India'))
	// }
	// fetchLatAndLong()


	const handleDelete = async (userid, pid, collecid, index) => {
		const updatedData = data.map((d) => {
			if (d._id === collecid) {
				const updatedProducts = d.products.filter(
					(product) => product._id !== pid
				);
				return { ...d, products: updatedProducts };
			}
			return d;
		});
		setData(updatedData);
		const result = await productdeletemutate({
			id: userid,
			collecid: collecid,
			pid: pid,
		});
		toast.success("Product Deleted!")
		await refetch()
		console.log(result);
	};

	const createCheck = () => {
		if (checkstore?.exist) {
			dispatch(LoadThis(true))
			setCheck(1)
		} else {
			dispatch(LoadThis(true))
			setCheck(2);
			navigator.geolocation.getCurrentPosition(
				(p) => {
					setLocation({
						...location,
						latitude: p.coords.latitude,
						longitude: p.coords.longitude,
						accuracy: p.coords.accuracy,
						altitude: p.coords.altitudeAccuracy,
					})
				},
				() => {
					toast.error("Allow Location To Create Store!")
					setCheck(null);
				}
			);
		}
	}

	useEffect(() => {
		if (!params.has("q")) {
			dispatch(LoadThis(false))
		}
	}, [params])

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

				<div className=" sm:grid-cols-4 w-full grid-cols-2 grid gap-2 pt-8 sm:pl-[4%] vs:max-sm:px-[2%] ">
					<div className="sm:h-36 vs:max-sm:h-28  animate-pulse px-40 sm:w-[80%] rounded-3xl items-center flex justify-between md:px-10 vs:max-sm:px-2 bg-[#f2f2f2] dark:bg-[#273142] ring-1 ring-[#f9f9f9] "></div>
					<div className="sm:h-36 vs:max-sm:h-28  animate-pulse px-40 sm:w-[80%] rounded-3xl items-center flex justify-between md:px-10 vs:max-sm:px-2 bg-[#f2f2f2] dark:bg-[#273142] ring-1 ring-[#f9f9f9] "></div>
					<div className="sm:h-36 vs:max-sm:h-28  animate-pulse px-40 sm:w-[80%] rounded-3xl items-center flex justify-between md:px-10 vs:max-sm:px-2 bg-[#f2f2f2] dark:bg-[#273142] ring-1 ring-[#f9f9f9] "></div>
					<div className="sm:h-36 vs:max-sm:h-28  animate-pulse px-40 sm:w-[80%] rounded-3xl items-center flex justify-between md:px-10 vs:max-sm:px-2 bg-[#f2f2f2] dark:bg-[#273142] ring-1 ring-[#f9f9f9] "></div>
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

			{queryForCreation == "collection" && checkstore.isverified && check == 1 && (
				<CreateCollection
					setCheck={setCheck}
					refetch={refetch}
					refetchStore={refetchStore}
					dispatch={dispatch}
					checkstore={checkstore}
					loading={loading}
					setLoading={setLoading}
					col={col}
					router={router}
					id={id}
					setImage={setImage}
					image={image}
					setCol={setCol}
				/>
			)}
			{queryForCreation == "store" && check == 2 && checkstore.validToCreateStore &&
				<CreateStore
					store={store}
					id={id}
					loading={loading}
					setLoading={setLoading}
					dispatch={dispatch}
					location={location}
					setCheck={setCheck}
					router={router}
					setStore={setStore}
					refetch={refetchStore}
					setShowImage={setShowImage}
					showImage={showImage}
				/>}

			{
				checkstore?.exist && checkstore?.isverified === false ?


					<div className="h-full w-full rounded-xl ">
						<div className="flex flex-col justify-center items-center h-full">
							<div className="text-2xl font-semibold pn:max-sm:text-xl px-2 dark:text-white">Verification Process Underway</div>
							<Image src={verify} alt="image" className="max-w-[250px]" />
							<div className="text-sm">Status : In review</div>
							<div className="flex flex-col text-center max-w-[85%] text-sm sm:max-w-[50%] pt-9 justify-center items-center">We appreciate your patience as we work to verify your account. It Normally takes upto 24 hours.
								Thank you for your understanding and cooperation during this process.</div>
						</div >

					</div >

					:
					<div>
						<div className="overflow-auto no-scrollbar h-full ">
							<div className="flex justify-between dark:text-white py-1 px-4 items-center">
								<div className="sm:font-semibold sm:pl-4 text-[22px] text-[#202224] dark:text-white">
									Product
								</div>

								{memberships === "Free" && productdata?.collections?.length >= 1 ? <div onClick={() => setPop(true)} className="py-2 flex justify-center items-center dark:bg-[#323d4e] dark:text-white gap-1 border light:border-[#f1f1f1] vs:max-pp:text-[12px] px-2.5 sm:px-5 font-medium bg-white text-black rounded-xl">
									{checkstore?.exist ? "Create Collection" : "Create Store"}
									<FaCrown />
								</div> : (checkstore?.validToCreateStore ? <Link href={`/main/store?q=${checkstore?.q}`}
									onClick={createCheck}
									className="py-2 flex justify-center items-center dark:bg-[#323d4e] dark:text-white gap-1 border light:border-[#f1f1f1] vs:max-pp:text-[12px] px-2.5 sm:px-5 font-medium bg-white text-black rounded-xl"
								>
									{checkstore?.exist ? "Create Collection" : "Create Store"}
									<GoPlus />
								</Link> : <div onClick={() => toast.error("Not Eligable to Create Store Now!")} className="py-2 flex justify-center items-center dark:bg-[#323d4e] dark:text-white gap-1 border light:border-[#f1f1f1] vs:max-pp:text-[12px] px-2.5 sm:px-5 font-medium bg-white text-black rounded-xl">
									{checkstore?.exist ? "Create Collection" : "Create Store"}
									<GoPlus />
								</div>)}
							</div>

							<div className="p-1 px-2 w-full  grid grid-cols-1">
								<div className="rounded-2xl grid grid-cols-1 w-full">
									{/* web */}
									<div className="flex pn:max-sm:hidden justify-center p-3 w-full items-center gap-2 md:gap-5">
										<div className="flex sm:max-md:text-xs flex-col p-3 py-5 bg-white dark:bg-[#273142] rounded-xl gap-4 border light:border-[#f1f1f1] w-full">
											<div>
												<Image src={p3} alt="p1" />
											</div>
											<div className="flex flex-col gap-1">
												<div className="font-medium">Earnings</div>
												<div className="flex gap-1 text-xs  items-center">
													<div className="text-base font-medium">₹{(Number(getorderdata?.earnings)).toFixed(2)}</div>
													{/* <div className="text-green-700">+0.00%</div> */}
												</div>
											</div>
										</div>
										<div className="flex sm:max-md:text-xs flex-col p-3 py-5 bg-white dark:bg-[#273142] rounded-xl gap-4 border light:border-[#f1f1f1] w-full">
											<div>
												<Image src={p1} alt="p2" />
											</div>
											<div className="flex flex-col gap-1">
												<div className="font-medium">Customers</div>
												<div className="flex gap-1 text-xs  items-center">
													<div className="text-base font-medium">{getorderdata?.customers}</div>
													{/* <div className="text-green-700">+0.00%</div> */}
												</div>
											</div>
										</div>
										<div className="flex flex-col p-3 sm:max-md:text-xs py-5 bg-white dark:bg-[#273142] rounded-xl gap-4 border light:border-[#f1f1f1] w-full">
											<div>
												<Image src={p2} alt="p2" />
											</div>
											<div className="flex justify-between items-center ">
												<div className="flex flex-col gap-1">
													<div className="font-medium">All Orders</div>
													<div className="flex gap-1 text-xs  items-center">
														<div className="text-base font-medium">{getorderdata?.allorders}</div>
														{/* <div className="text-green-700">+0.00%</div> */}
													</div>
												</div>
												<div className="flex flex-col gap-1">
													<div className="font-medium">Pending</div>
													<div className="flex gap-1 text-xs  items-center">
														<div className="text-base font-medium">{getorderdata?.pendingOrders?.length}</div>
														{/* <div className="text-green-700">+0.00%</div> */}
													</div>
												</div>
												<div className="flex flex-col gap-1">
													<div className="font-medium">Completed</div>
													<div className="flex gap-1 text-xs  items-center">
														<div className="text-base font-medium">{getorderdata?.completedOrders?.length}</div>
														{/* <div className="text-green-700">+0.00%</div> */}
													</div>
												</div>
											</div>
										</div>
									</div>
									{/* mobile */}
									<div className="grid grid-cols-2 sm:hidden p-2 w-full items-center gap-2 md:gap-7">
										<div className="flex flex-col bg-white dark:bg-[#273142] p-3 rounded-xl gap-2 border light:border-[#f1f1f1] w-full">
											<div>
												<Image src={p3} alt="p1" />
											</div>
											<div>
												<div className="font-medium">Earnings</div>
												<div className="flex gap-1 text-xs  items-center">
													<div className="text-base font-medium">₹{(Number(getorderdata?.earnings)).toFixed(2)}</div>
													{/* <div className="text-green-700">+0.00%</div> */}
												</div>
											</div>
										</div>
										<div className="flex flex-col bg-white dark:bg-[#273142] p-3 rounded-xl gap-2 border light:border-[#f1f1f1] w-full">
											<div>
												<Image src={p1} alt="p2" />
											</div>
											<div>
												<div className="font-medium">Customers</div>
												<div className="flex gap-1 text-xs  items-center">
													<div className="text-base font-medium">{getorderdata?.customers}</div>
													{/* <div className="text-green-700">+0.00%</div> */}
												</div>
											</div>
										</div>
										<div className="flex col-span-2 bg-white dark:bg-[#273142] flex-col p-3 rounded-xl gap-3 border light:border-[#f1f1f1] w-full">
											<div>
												<Image src={p2} alt="p2" />
											</div>
											<div className="flex justify-between items-center ">
												<div>
													<div className="font-medium">All Orders</div>
													<div className="flex gap-1 text-xs  items-center">
														<div className="text-base font-medium">{getorderdata?.allorders}</div>
														{/* <div className="text-green-700">+0.00%</div> */}
													</div>
												</div>
												<div>
													<div className="font-medium">Pending</div>
													<div className="flex gap-1 text-xs  items-center">
														<div className="text-base font-medium">{getorderdata?.pendingOrders?.length}</div>
														{/* <div className="text-green-700">+0.00%</div> */}
													</div>
												</div>
												<div>
													<div className="font-medium">Completed</div>
													<div className="flex gap-1 text-xs  items-center">
														<div className="text-base font-medium">{getorderdata?.completedOrders?.length}</div>
														{/* <div className="text-green-700">+0.00%</div> */}
													</div>
												</div>
											</div>
										</div>
									</div>

									{productdata?.collections.length > 0 ?
										<div className="mb-[64px] sm:mb-0">
											<div className="p-3">
												<div className="flex w-full bg-white dark:bg-[#323d4e] py-4 vs:max-sm:hidden px-1 rounded-xl justify-between">
													<div className="w-64 sm:max-md:w-52 font-medium flex justify-start pl-4 ">
														Product
													</div>
													<div className="w-36 sm:max-md:w-24 flex justify-center font-medium ">
														Quantity
													</div>
													<div className="w-36 sm:max-md:w-24 flex justify-center font-medium ">
														Price
													</div>
													<div className="w-36 sm:max-md:w-24 flex justify-center font-medium ">
														Status
													</div>
													<div className="w-36 sm:max-md:w-24 flex justify-center font-medium ">
														Verification
													</div>
													<div className="w-36 sm:max-md:w-24 flex justify-center font-medium ">
														Actions
													</div>
												</div>
											</div>

											<div className="px-2 flex flex-col gap-5 py-3">
												{productdata?.collections.map((d, i) => (
													<div key={i} className="bg-white dark:bg-[#273142] py-2 rounded-xl">
														<div className="flex justify-between py-2 px-3 items-center">
															<div className="font-semibold text-[#4A4C56] dark:text-white">{d.name}</div>
															<div
																className="flex cursor-pointer justify-center items-center gap-2"
															>
																{memberships === "Free" && d.products?.length >= 5 ? <div
																	onClick={() => {
																		setPop(true)
																	}}
																	className="bg-[#5570F1] flex justify-center items-center gap-2 text-white p-1.5 px-3 text-xs sm:text-base sm:px-6 font-semibold rounded-xl"
																>
																	Add Product
																	<FaCrown />
																</div> : <Link href={"/main/store/addproduct"}
																	onClick={() => {

																		Cookies.set("clvss", encryptaes(d._id))
																	}}
																	className="bg-[#5570F1] text-white p-1.5 px-3 text-xs sm:text-base sm:px-6 font-semibold rounded-xl"
																>
																	Add Product
																</Link>}
															</div>
														</div>
														<div className="mt-1">
															{d.products?.length > 0 ? (
																<div className="flex flex-col gap-3">
																	{d.products.map((f, g) => (
																		<Productinformation
																			key={g}
																			index={g}
																			handleDelete={handleDelete}
																			data={f}
																			collectionid={d._id}
																			userid={f.creator}
																		/>
																	))}
																</div>
															) : (
																<div className="flex justify-center pn:max-sm:h-[100px] items-center mb-5">No product in this collection.</div>
															)}
														</div>
													</div>
												))}
											</div>

										</div>
										:
										<div className=" p-3  w-full rounded-xl h-[350px] ">
											<div className="flex justify-center rounded-xl font-semibold text-3xl items-center dark:bg-[#273142] bg-white h-full w-full">No Collections Found</div>
										</div>
									}
								</div>
							</div>
						</div>
					</div >
			}

		</>
	);
}
