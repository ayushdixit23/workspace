"use client"
import { useFetchPostsQuery } from '@/app/redux/apiroutes/community'
import { formatISOStringToDMY, getData } from '@/app/utilsHelper/Useful'
import { decryptaes } from '@/app/utilsHelper/security'
import { usePathname } from 'next/navigation'
import React, { useState } from 'react'
import { GoPlus } from 'react-icons/go'
import CreatePost from '../../community/CreatePost'
import { BiUpArrowAlt } from 'react-icons/bi'
import Loader from '@/app/data/Loader'
import NoPost from '@/app/componentsWorkSpace/NoPost'
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table"

const page = () => {
	const path = usePathname()
	const decomid = path.split("/").pop()
	const { id } = getData()
	const comid = decryptaes(decomid)

	const { data, refetch, isLoading } = useFetchPostsQuery({ id, comid }, { skip: !id || !comid })

	const mergedData = data?.posts?.map((d, i) => ({
		post: d,
		dps: data.content[i],
		engrate: data.eng[i]
	}))

	const [open, setOpen] = useState(false)

	if (isLoading) {
		return <Loader />
	}

	return (
		<>
			{
				open && <CreatePost id={id} comid={comid} open={open} setOpen={setOpen} refetch={refetch} />
			}

			<div className={`${open ? "pn:max-sm:hidden" : null}`}>
				<div className="flex px-4 py-2 justify-between dark:text-white items-center">
					<div className=" p-2 text-[22px] text-[#202224] dark:text-white sm:font-semibold  ">
						Posts
					</div>
					<div
						onClick={() => setOpen(true)}
						className="py-2 vs:max-pp:text-[12px] flex justify-center items-center gap-1 border dark:bg-[#3d4654] dark:text-white light:border-[#f1f1f1] px-2.5 sm:px-5 font-medium bg-white text-black rounded-xl"
					>
						Create Posts
						<GoPlus />
					</div>
				</div>

				{/* web */}

				<div className='pn:max-sm:hidden'>
					{
						mergedData?.length > 0 ? <div className="bg-white dark:bg-[#273142] rounded-xl sm:p-2 w-full">
							{/* <table className="w-full sm:max-lg:min-w-[750px] rounded-xl border-collapse">
								<thead>
									<tr className="bg-gray-50">
										<th
											colSpan="2"
											className="text-left text-xs leading-4 py-2 px-3 font-medium uppercase tracking-wider"
										>
											Posts
										</th>
										<th className="text-center text-xs leading-4 py-2 px-3 font-medium uppercase tracking-wider">
											Date Uploaded
										</th>
										<th className="text-center text-xs leading-4 py-2 px-3 font-medium uppercase tracking-wider">
											Applauses
										</th>
										<th className="text-center text-xs leading-4 py-2 px-3 font-medium uppercase tracking-wider">
											Comments
										</th>
										<th className="text-center text-xs leading-4 py-2 px-3 font-medium uppercase tracking-wider">
											Shares
										</th>
										<th className="text-center text-xs leading-4 py-2 px-3 font-medium uppercase tracking-wider">
											Engagement Rate
										</th>
									</tr>
								</thead>
								<tbody className="gap-10">
									{
										mergedData?.map((d, i) => (
											<tr key={i}>
												<td
													colSpan="2"
													className="text-left text-sm py-2 leading-5 font-medium text-gray-900 col-span-3"
												>
													<div className="flex gap-2 p-1 items-center">
														<div>
															<img
																src={d?.dps}
																className="h-12 w-12 cursor-pointer flex justify-center items-center rounded-[18px] ring-1 ring-white "
																alt="image"
															/>
														</div>
														<div className="flex flex-col text-xs font-medium gap-1">
															{d?.post.title.length <= 15 ? d?.post.title : `${d?.post.title.slice(0, 15)}...`}
														</div>
													</div>
												</td>
												<td className="text-xs leading-5 py-2 px-3 text-center">
													{formatISOStringToDMY(d?.post.createdAt)}
												</td>
												<td className="text-sm leading-5 py-2 px-3 text-center">
													{d?.post.likes}
												</td>
												<td className="text-sm leading-5 py-2 px-3 text-center">
													{d?.post.comments?.length}
												</td>
												<td className="text-sm leading-5 py-2 px-3 text-center">
													{d?.post.sharescount}
												</td>
												<td className="text-sm leading-5 py-2 px-3 text-center">
													{Math.round(parseInt(d?.engrate))}%

												</td>
											</tr>
										))
									}

								</tbody>
							</table> */}

							<Table>
								<TableHeader>
									<TableRow>
										<TableHead className="w-[150px] text-left">Posts</TableHead>
										<TableHead className="text-center">Applauses</TableHead>
										<TableHead className="text-center">Title</TableHead>
										<TableHead className="text-center">Comments</TableHead>
										<TableHead className="text-center">Shares</TableHead>
										<TableHead className="text-center">Date Uploaded</TableHead>
										{/* <TableHead className="text-center">Engagement Rate</TableHead> */}
									</TableRow>
								</TableHeader>
								<TableBody>
									{
										mergedData?.map((d, i) => (

											<TableRow key={i}>
												<TableCell className="font-medium w-[150px] text-left">
													<div className="flex gap-2 p-1 items-center">
														<div>
															{d?.post.post[0].type.startsWith("image") && <img
																src={d?.dps}
																className="object-cover max-h-[50px] min-w-[50px] cursor-pointer flex justify-center items-center rounded-[18px] ring-1 ring-white "
																alt="image"
															/>}

															{d?.post.post[0].type.startsWith("video") && <video
																src={d?.dps}
																className=" object-cover max-h-[50px] min-w-[50px] cursor-pointer flex justify-center items-center rounded-[18px] ring-1 ring-white "
																alt="video"
															/>}

														</div>

													</div>
												</TableCell>
												<TableCell className="text-center">
													<div className="flex flex-col text-xs font-medium gap-1">
														{d?.post.title.length <= 15 ? d?.post.title : `${d?.post.title.slice(0, 15)}...`}
													</div>
												</TableCell>
												<TableCell className="text-center">{d?.post.likes}</TableCell>
												<TableCell className="text-center">{d?.post.comments?.length}</TableCell>
												<TableCell className="text-center">{d?.post.sharescount}</TableCell>
												<TableCell className="text-center">{formatISOStringToDMY(d?.post.createdAt)}</TableCell>
												{/* <TableCell className="text-center">{`${Math.round(parseInt(d?.post.engrate))}%`}</TableCell> */}
											</TableRow>
										))
									}
								</TableBody>
							</Table>
						</div>
							: <NoPost setOpen={setOpen} />
					}
				</div>


				<div className='sm:hidden'>
					{
						mergedData?.length > 0 ? <div className="dark:bg-[#273142] dark:text-white bg-white">
							{mergedData?.map((d, i) => (
								<div
									key={i}
									className={`light:border-b light:border-[#eaecf0] px-2 flex flex-col justify-center items-center gap-4 w-full`}
								>
									<div className="flex justify-between mt-3 px-3 w-full items-center">
										<div className="flex justify-center items-center gap-2">
											<div>
												{d?.post.post[0].type.startsWith("image") && <img
													src={d?.dps}
													className="object-cover max-h-[50px] min-w-[50px] cursor-pointer flex justify-center items-center rounded-[18px] ring-1 ring-white "
													alt="image"
												/>}

												{d?.post.post[0].type.startsWith("video") && <video
													src={d?.dps}
													className=" object-cover max-h-[50px] min-w-[50px] cursor-pointer flex justify-center items-center rounded-[18px] ring-1 ring-white "
													alt="video"
												/>}
											</div>
											<div className="text-sm font-bold dark:text-white text-[#101828]">{d?.post.title.length <= 15 ? d?.post.title : `${d?.post.title.slice(0, 15)}...`}</div>
										</div>
										<div className="text-[#667085] dark:text-white text-sm">
											{formatISOStringToDMY(d?.post.createdAt)}
										</div>
									</div>
									<div className="flex justify-evenly dark:text-white text-[#101828] mb-3 w-full items-center">
										<div className="flex text-sm flex-col justify-center items-center">
											<div>{d?.post.likes}</div>
											<div className="pn:max-pp:text-xs">Applauses</div>
										</div>
										<div className="flex text-sm flex-col justify-center items-center">
											<div>{d?.post.comments?.length}</div>
											<div className="pn:max-pp:text-xs">Comments</div>
										</div>
										<div className="flex text-sm flex-col justify-center items-center">
											<div>{d?.post.sharescount}</div>
											<div className="pn:max-pp:text-xs">Shares</div>
										</div>
										{/* <div>
											<div className="bg-[#ecfdf3] p-1 px-2 flex justify-center items-center rounded-xl">
												<div><BiUpArrowAlt className="text-[#12b76a]" /></div>

												<div className="text-[#12b76a]">{Math.round(parseInt(d?.engrate))}%</div>
											</div>

											<div className="hidden">-5</div>
										</div> */}
									</div>
								</div>
							))}
						</div> :
							<NoPost setOpen={setOpen} />
					}

				</div>



			</div>
		</>
	)
}

export default page