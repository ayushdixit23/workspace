"use client";
import React, { Suspense, useEffect, useState } from "react";
import Productinformation from "./productinformation";
import Link from "next/link";
import Image from "next/image";
import p1 from "../../assets/image/Icon.png";
import p2 from "../../assets/image/p2.png";
import p3 from "../../assets/image/p3.png";
import { useDispatch } from "react-redux";
import CreateStore from "./createStore";
import CreateCollection from "./createCollection";
import {
	useCheckStoreExistsQuery,
	useDeleteProductMutation,
	useGetProductQuery,
	useRemoveCollectionMutation,
} from "@/app/redux/apiroutes/product";
import { getData } from "@/app/utils/Useful";
import { encryptaes } from "@/app/utils/security";
import { GoPlus } from "react-icons/go";
import toast, { Toaster } from "react-hot-toast";
import { LoadThis } from "@/app/redux/slice/userData";
import { setCookie } from "cookies-next";
import { useSearchParams, useRouter } from "next/navigation";
import Loader from "@/app/data/Loader";

export default function Store() {
	const [data, setData] = useState([]);
	const { id } = getData()
	const dispatch = useDispatch();
	const [check, setCheck] = useState(null);
	const params = useSearchParams()
	const queryForCreation = params.get("q")
	const router = useRouter()
	const [loading, setLoading] = useState(false)
	const [col, setCol] = useState({
		d1: "",
		d2: "Retail",
		d3: null,
	});
	const [productdeletemutate] = useDeleteProductMutation();
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

	const [deleteMutation] = useRemoveCollectionMutation();
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
		}
	};

	useEffect(() => {
		if (!params.has("q")) {
			dispatch(LoadThis(false))
		}
	}, [params])

	if (isLoading) {
		return <div>
			<div className="overflow-auto pt-1 scrollbar-hide h-full ">
				<div className="flex justify-between items-center">
					<div className="sm:font-medium sm:pl-4 text-[18px] animate-pulse px-10 py-4 bg-[#f2f2f2] rounded-2xl text-[#8B8D97]"></div>
					<Link
						href="/main/store/addproduct"
						className="vs:max-sm:hidden  animate-pulse px-10 py-4  bg-[#f2f2f2] text-white rounded-2xl"
					></Link>
				</div>

				<div className=" sm:grid-cols-4 w-full grid-cols-2 grid gap-2 pt-8 sm:pl-[4%] vs:max-sm:px-[2%] ">
					<div className="sm:h-36 vs:max-sm:h-28  animate-pulse px-40 sm:w-[80%] rounded-3xl items-center flex justify-between md:px-10 vs:max-sm:px-2 bg-[#f2f2f2] ring-1 ring-[#f9f9f9] "></div>
					<div className="sm:h-36 vs:max-sm:h-28  animate-pulse px-40 sm:w-[80%] rounded-3xl items-center flex justify-between md:px-10 vs:max-sm:px-2 bg-[#f2f2f2] ring-1 ring-[#f9f9f9] "></div>
					<div className="sm:h-36 vs:max-sm:h-28  animate-pulse px-40 sm:w-[80%] rounded-3xl items-center flex justify-between md:px-10 vs:max-sm:px-2 bg-[#f2f2f2] ring-1 ring-[#f9f9f9] "></div>
					<div className="sm:h-36 vs:max-sm:h-28  animate-pulse px-40 sm:w-[80%] rounded-3xl items-center flex justify-between md:px-10 vs:max-sm:px-2 bg-[#f2f2f2] ring-1 ring-[#f9f9f9] "></div>
				</div>

				<div className="pt-4">
					<div className="flex w-full vs:max-sm:hidden sm:pt-4 px-4 justify-between">
						<div className="w-64 sm:max-md:w-52 bg-[#f2f2f2]  animate-pulse font-medium flex justify-start "></div>
						<div className="w-36 sm:max-md:w-24 bg-[#f2f2f2] animate-pulse flex justify-center font-medium "></div>
						<div className="w-36  sm:max-md:w-24 bg-[#f2f2f2] animate-pulse flex justify-center font-medium "></div>
						<div className="w-36 sm:max-md:w-24 bg-[#f2f2f2] animate-pulse flex justify-center font-medium "></div>
						<div className="w-36 sm:max-md:w-24 flex justify-center font-medium "></div>
					</div>
					<div className="bg-[#f2f2f2] animate-pulse h-20 sm:rounded-2xl mt-4"></div>
					<div className="bg-[#f2f2f2] animate-pulse h-20 sm:rounded-2xl mt-4"></div>
					<div className="bg-[#f2f2f2] animate-pulse h-20 sm:rounded-2xl mt-4"></div>
					<div className="bg-[#f2f2f2] animate-pulse h-20 sm:rounded-2xl mt-4"></div>
				</div>
			</div>
		</div>;
	}
	return (
		<>
			{queryForCreation == "collection" && check == 1 && (
				<CreateCollection
					setCheck={setCheck}
					refetch={refetch}
					dispatch={dispatch}
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
			{queryForCreation == "store" && check == 2 &&
				<CreateStore

					store={store}
					id={id}
					loading={loading}
					setLoading={setLoading}
					dispatch={dispatch}
					setCheck={setCheck}
					router={router}
					setStore={setStore}
					refetch={refetchStore}
					setShowImage={setShowImage}
					showImage={showImage}
				/>}

			<div>
				<div className="overflow-auto scrollbar-hide h-full ">
					<div className="flex justify-between py-1 px-4 items-center">
						<div className="sm:font-semibold sm:pl-4 text-[22px] text-[#202224] ">
							Product
						</div>

						<Link href={`/main/store?q=${checkstore?.q}`}
							onClick={createCheck}
							className="py-2 flex justify-center items-center gap-1 border border-[#f1f1f1] vs:max-pp:text-[12px] px-2.5 sm:px-5 font-medium bg-white text-black rounded-xl"
						>
							Create Collection
							<GoPlus />
						</Link>
					</div>

					<div className="p-1 px-2 w-full  grid grid-cols-1">
						<div className="rounded-2xl grid grid-cols-1 w-full">
							{/* web */}
							<div className="flex pn:max-sm:hidden justify-center p-3 w-full items-center gap-2 md:gap-5">
								<div className="flex sm:max-md:text-xs flex-col p-3 py-5 bg-white rounded-xl gap-4 border border-[#f1f1f1] w-full">
									<div>
										<Image src={p3} alt="p1" />
									</div>
									<div className="flex flex-col gap-1">
										<div className="font-medium">Earings</div>
										<div className="flex gap-1 text-xs  items-center">
											<div className="text-base font-medium">0</div>
											<div className="text-green-700">+0.00%</div>
										</div>
									</div>
								</div>
								<div className="flex sm:max-md:text-xs flex-col p-3 py-5 bg-white rounded-xl gap-4 border border-[#f1f1f1] w-full">
									<div>
										<Image src={p1} alt="p2" />
									</div>
									<div className="flex flex-col gap-1">
										<div className="font-medium">Customers</div>
										<div className="flex gap-1 text-xs  items-center">
											<div className="text-base font-medium">0</div>
											<div className="text-green-700">+0.00%</div>
										</div>
									</div>
								</div>
								<div className="flex flex-col p-3 sm:max-md:text-xs py-5 bg-white rounded-xl gap-4 border border-[#f1f1f1] w-full">
									<div>
										<Image src={p2} alt="p2" />
									</div>
									<div className="flex justify-between items-center ">
										<div className="flex flex-col gap-1">
											<div className="font-medium">All Orders</div>
											<div className="flex gap-1 text-xs  items-center">
												<div className="text-base font-medium">0</div>
												<div className="text-green-700">+0.00%</div>
											</div>
										</div>
										<div className="flex flex-col gap-1">
											<div className="font-medium">Pending</div>
											<div className="flex gap-1 text-xs  items-center">
												<div className="text-base font-medium">0</div>
												<div className="text-green-700">+0.00%</div>
											</div>
										</div>
										<div className="flex flex-col gap-1">
											<div className="font-medium">Completed</div>
											<div className="flex gap-1 text-xs  items-center">
												<div className="text-base font-medium">0</div>
												<div className="text-green-700">+0.00%</div>
											</div>
										</div>
									</div>
								</div>
							</div>
							{/* mobile */}
							<div className="grid grid-cols-2 sm:hidden  p-3 w-full items-center gap-2 md:gap-7">
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
											<div className="text-base font-medium">0</div>
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
												<div className="text-base font-medium">0</div>
												<div className="text-green-700">+0.00%</div>
											</div>
										</div>
										<div>
											<div className="font-medium">Pending</div>
											<div className="flex gap-1 text-xs  items-center">
												<div className="text-base font-medium">0</div>
												<div className="text-green-700">+0.00%</div>
											</div>
										</div>
										<div>
											<div className="font-medium">Completed</div>
											<div className="flex gap-1 text-xs  items-center">
												<div className="text-base font-medium">0</div>
												<div className="text-green-700">+0.00%</div>
											</div>
										</div>
									</div>
								</div>
							</div>

							{productdata?.collections.length > 0 ?
								<>
									<div className="p-3">
										<div className="flex w-full bg-white py-4 vs:max-sm:hidden px-1 rounded-xl justify-between">
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
												Added
											</div>
											<div className="w-36 sm:max-md:w-24 flex justify-center font-medium ">
												Actions
											</div>
										</div>
									</div>

									<div className="px-3 flex flex-col gap-5 py-3">
										{productdata?.collections.map((d, i) => (
											<div key={i} className="bg-white py-2 rounded-xl">
												<div className="flex justify-between py-2 px-3 items-center">
													<div className="font-semibold text-[#4A4C56]">{d.name}</div>
													<div
														className="flex cursor-pointer
					  justify-center
					  items-center gap-2"
													>
														<Link href={"/main/store/addproduct"}
															onClick={() => {
																setCookie("clvss", encryptaes(d._id))
															}}
															className="bg-[#5570F1] text-white p-1.5 px-3 text-xs sm:text-base sm:px-6 font-semibold rounded-xl"
														>
															Add Product
														</Link>
													</div>
												</div>
												<div className="mt-1">
													{d.products?.length > 0 ? (
														<React.Fragment className="flex flex-col gap-3">
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
														</React.Fragment>
													) : (
														<div className="flex justify-center items-center mb-5">No product in this collection.</div>
													)}
												</div>
											</div>
										))}
									</div>
								</>
								:
								<div className=" p-3  w-full rounded-xl h-[350px] ">
									<div className="flex justify-center rounded-xl font-semibold text-3xl items-center bg-white h-full w-full">No Collections Found</div>
								</div>
							}
						</div>
					</div>
				</div>
			</div >
		</>
	);
}
