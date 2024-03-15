"use client"
import { getData } from '@/app/utilsHelper/Useful'
import Image from 'next/image'
import t1 from "../../assets/image/t1.png"
import t2 from "../../assets/image/t2.png"
import t3 from "../../assets/image/t3.png"
import t4 from "../../assets/image/t4.png"
import t5 from "../../assets/image/t5.png"
import React from 'react'

const page = () => {
	const { id } = getData()
	return (
		// <>
		// 	<div className='h-[80vh] text-3xl flex justify-center font-semibold items-center bg-white dark:bg-[#273142]'>
		// 		<a target='_blank' href={`http://192.168.29.225:3000/lwozxip?id=${encodeURIComponent(id)}&temp=4`} className='underline'>Customize Your Prosite</a>
		// 		{/* <a target='_blank' href={`http://192.168.29.219:3000/lwozxip?id=${id}`} className='underline'>Customize Your Prosite</a> */}
		// 	</div >
		// </>

		<>
			<div className=' h-auto bg-white dark:bg-[#273142] flex flex-col'>
				<div className='flex justify-between border-b px-4 sm:px-7  dark:border-[#3d4654] items-center w-full'>
					<div className='pt-4 pb-2  w-full font-medium text-[#4880FF]'>Templates</div>
				</div>

				<div className='grid grid-cols-1 mt-5 px-5 w-full'>
					<div className='flex flex-col'>


						<div className='my-2 text-xl font-bold'>Basic Template</div>
						<div className='flex justify-center items-center w-full'>
							<div className='grid grid-cols-2 sm:grid-cols-3 gap-4 md:grid-cols-4 w-full'>

								<div className="max-w-[250px] flex flex-col bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
									<Image className="rounded-t-lg max-w-[250px] h-[150px] w-full object-contain bg-black" src={t1} alt="" />

									<div className="p-2 flex justify-between items-center px-2">
										<div className='font-semibold'>Text</div>
										<a target='_blank' href={`http://192.168.29.225:3000/lwozxip?id=${encodeURIComponent(id)}&temp=1`} className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
											Use
										</a>
									</div>
								</div>

								<div className="max-w-[250px] bg-white border flex flex-col border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
									<Image className="rounded-t-lg max-w-[250px] h-[150px] w-full object-contain bg-black" src={t2} alt="" />

									<div className="p-2 flex justify-between px-2 items-center">
										<div className='font-semibold'>Text</div>
										<a target='_blank' href={`http://192.168.29.225:3000/lwozxip?id=${encodeURIComponent(id)}&temp=2`} className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
											Use

										</a>
									</div>
								</div>
								<div className="max-w-[250px] bg-white border flex flex-col border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
									<Image className="rounded-t-lg max-w-[250px] h-[150px] w-full object-contain bg-black" src={t3} alt="" />

									<div className="p-2 flex justify-between px-2 items-center">
										<div className='font-semibold'>Text</div>
										<a target='_blank' href={`http://192.168.29.225:3000/lwozxip?id=${encodeURIComponent(id)}&temp=3`} className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
											Use

										</a>
									</div>
								</div>
								<div className="max-w-[250px] bg-white border flex flex-col border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
									<Image className="rounded-t-lg max-w-[250px] h-[150px] w-full object-contain bg-black" src={t4} alt="" />

									<div className="p-2 flex justify-between px-2 items-center">
										<div className='font-semibold'>Text</div>
										<a target='_blank' href={`http://192.168.29.225:3000/lwozxip?id=${encodeURIComponent(id)}&temp=4`} className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
											Use

										</a>
									</div>
								</div>
								<div className="max-w-[250px] bg-white border flex flex-col border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
									<Image className="rounded-t-lg max-w-[250px] h-[150px] w-full object-contain bg-black" src={t5} alt="" />

									<div className="p-2 flex justify-between px-2 items-center">
										<div className='font-semibold'>Text</div>
										<a target='_blank' href={`http://192.168.29.225:3000/lwozxip?id=${encodeURIComponent(id)}&temp=5`} className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
											Use

										</a>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default page