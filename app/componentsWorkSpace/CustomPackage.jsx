import React from 'react'
import e2 from "../assets/image/e2.png"
import Image from 'next/image'
import { IoAdd } from 'react-icons/io5'
import { RxCross1 } from 'react-icons/rx'

const CustomPackage = ({ setPopup }) => {
	return (
		<div className='fixed inset-0 w-screen h-screen z-30 bg-black/30 p-5 flex justify-center items-center'>
			<div className='flex flex-col justify-center sm:w-full md:w-[80%]  overflow-y-scroll no-scrollbar max-h-[95vh] rounded-xl dark:bg-[#273142] bg-white'>
				<div className='flex justify-end items-end p-3 mt-4'><RxCross1 className='text-2xl font-semibold text-white' onClick={() => setPopup(false)} /></div>
				<div className='grid grid-cols-1 w-full overflow-y-scroll no-scrollbar max-h-screen'>
					<div className='grid grid-cols-1 pp:grid-cols-2 sm:grid-cols-3 gap-4 w-full p-3'>


						<div className='flex flex-col gap-3 border p-3 rounded-xl dark:border-white justify-normal'>
							<div className='flex gap-2 items-center'>
								<div>
									<Image src={e2} alt='image' />
								</div>
								<div className='flex -mt-1 flex-col'>
									<div className='font-semibold'>Add Products</div>
									<div className='text-xs'>$0.6 /product</div>
								</div>
							</div>
							<div>
								You can easily put more items in your store to give customers more choices.
							</div>
							<div className='flex justify-end items-center gap-2'>
								<div className='text-[#0B5CFF] p-2'>Learn More</div>
								<div className='bg-[#0B5CFF] flex p-2 pn:max-pp:min-w-[100px] sm:min-w-[100px] text-white rounded-full justify-center items-center'>
									<div>Add</div>
									<IoAdd className='text-xl font-semibold' />
								</div>
							</div>
						</div>
						<div className='flex flex-col gap-3 border p-3 rounded-xl dark:border-white justify-normal'>
							<div className='flex gap-2 items-center'>
								<div>
									<Image src={e2} alt='image' />
								</div>
								<div className='flex -mt-1 flex-col'>
									<div className='font-semibold'>Zero Platform Fee</div>
									<div className='text-xs'>$2.5</div>
								</div>
							</div>
							<div>
								List products, offer paid topics, all with zero platform fees.
							</div>
							<div className='flex justify-end items-center gap-2'>
								<div className='text-[#0B5CFF] p-2'>Learn More</div>
								<div className='bg-[#0B5CFF] flex p-2 pn:max-pp:min-w-[100px] sm:min-w-[100px] text-white rounded-full justify-center items-center'>
									<div>Add</div>
									<IoAdd className='text-xl font-semibold' />
								</div>
							</div>
						</div>
						<div className='flex flex-col gap-3 border p-3 rounded-xl dark:border-white justify-normal'>
							<div className='flex gap-2 items-center'>
								<div>
									<Image src={e2} alt='image' />
								</div>
								<div className='flex -mt-1 flex-col'>
									<div className='font-semibold'>Create Collection</div>
									<div className='text-xs'>$2.5 /Collection</div>
								</div>
							</div>
							<div>
								Enhance your store by organizing your products into curated collections.
							</div>
							<div className='flex justify-end items-center gap-2'>
								<div className='text-[#0B5CFF] p-2'>Learn More</div>
								<div className='bg-[#0B5CFF] flex p-2 pn:max-pp:min-w-[100px] sm:min-w-[100px] text-white rounded-full justify-center items-center'>
									<div>Add</div>
									<IoAdd className='text-xl font-semibold' />
								</div>
							</div>
						</div>
						<div className='flex flex-col gap-3 border p-3 rounded-xl dark:border-white justify-normal'>
							<div className='flex gap-2 items-center'>
								<div>
									<Image src={e2} alt='image' />
								</div>
								<div className='flex -mt-1 flex-col'>
									<div className='font-semibold'>Premier Support</div>
									<div className='text-xs'>$1.2 /Collection</div>
								</div>
							</div>
							<div>
								Connect directly with support engineers to
								diagnose problems via phone, chat, or email.
							</div>
							<div className='flex justify-end items-center gap-2'>
								<div className='text-[#0B5CFF] p-2'>Learn More</div>
								<div className='bg-[#0B5CFF] flex p-2 pn:max-pp:min-w-[100px] sm:min-w-[100px] text-white rounded-full justify-center items-center'>
									<div>Add</div>
									<IoAdd className='text-xl font-semibold' />
								</div>
							</div>
						</div>
						<div className='flex flex-col gap-3 border p-3 rounded-xl dark:border-white justify-normal'>
							<div className='flex gap-2 items-center'>
								<div>
									<Image src={e2} alt='image' />
								</div>
								<div className='flex -mt-1 flex-col'>
									<div className='font-semibold'>Advance Analytics</div>
									<div className='text-xs'>$3.6/Collection</div>
								</div>
							</div>
							<div>
								Maximize business and community impact through in-depth analytics.
							</div>
							<div className='flex justify-end items-center gap-2'>
								<div className='text-[#0B5CFF] p-2'>Learn More</div>
								<div className='bg-[#0B5CFF] flex p-2 pn:max-pp:min-w-[100px] sm:min-w-[100px] text-white rounded-full justify-center items-center'>
									<div>Add</div>
									<IoAdd className='text-xl font-semibold' />
								</div>
							</div>
						</div>
						<div className='flex flex-col gap-3 border p-3 rounded-xl dark:border-white justify-normal'>
							<div className='flex gap-2 items-center'>
								<div>
									<Image src={e2} alt='image' />
								</div>
								<div className='flex -mt-1 flex-col'>
									<div className='font-semibold'>Create Community</div>
									<div className='text-xs'>$0.6 /Collection</div>
								</div>
							</div>
							<div>
								Easily create various communities for different interests and preferences.
							</div>
							<div className='flex justify-end items-center gap-2'>
								<div className='text-[#0B5CFF] p-2'>Learn More</div>
								<div className='bg-[#0B5CFF] flex p-2 pn:max-pp:min-w-[100px] sm:min-w-[100px] text-white rounded-full justify-center items-center'>
									<div>Add</div>
									<IoAdd className='text-xl font-semibold' />
								</div>
							</div>
						</div>
						<div className='flex flex-col gap-3 border p-3 rounded-xl dark:border-white justify-normal'>
							<div className='flex gap-2 items-center'>
								<div>
									<Image src={e2} alt='image' />
								</div>
								<div className='flex -mt-1 flex-col'>
									<div className='font-semibold'>Create Topics</div>
									<div className='text-xs'>$0.06/Collection</div>
								</div>
							</div>
							<div>
								Create discussion topics, whether paid or free, to suit your community's needs.
							</div>
							<div className='flex justify-end items-center gap-2'>
								<div className='text-[#0B5CFF] p-2'>Learn More</div>
								<div className='bg-[#0B5CFF] flex p-2 pn:max-pp:min-w-[100px] sm:min-w-[100px] text-white rounded-full justify-center items-center'>
									<div>Add</div>
									<IoAdd className='text-xl font-semibold' />
								</div>
							</div>
						</div>
						<div className='flex flex-col gap-3 border p-3 rounded-xl dark:border-white justify-normal'>
							<div className='flex gap-2 items-center'>
								<div>
									<Image src={e2} alt='image' />
								</div>
								<div className='flex -mt-1 flex-col'>
									<div className='font-semibold'>Trusted Badge</div>
									<div className='text-xs'>$8.5 /Collection</div>
								</div>
							</div>
							<div>
								"Gain credibility and trust with our trusted badge, showcasing your reliability and commitment to quality."
							</div>
							<div className='flex justify-end items-center gap-2'>
								<div className='text-[#0B5CFF] p-2'>Learn More</div>
								<div className='bg-[#0B5CFF] flex p-2 pn:max-pp:min-w-[100px] sm:min-w-[100px] text-white rounded-full justify-center items-center'>
									<div>Add</div>
									<IoAdd className='text-xl font-semibold' />
								</div>
							</div>
						</div>
						<div className='flex flex-col gap-3 border p-3 rounded-xl dark:border-white justify-normal'>
							<div className='flex gap-2 items-center'>
								<div>
									<Image src={e2} alt='image' />
								</div>
								<div className='flex -mt-1 flex-col'>
									<div className='font-semibold'>Deliveries</div>
									<div className='text-xs'>$0.08 /Collection</div>
								</div>
							</div>
							<div>
								Get your orders delivered easily and on time.
							</div>
							<div className='flex justify-end items-center gap-2'>
								<div className='text-[#0B5CFF] p-2'>Learn More</div>
								<div className='bg-[#0B5CFF] flex p-2 pn:max-pp:min-w-[100px] sm:min-w-[100px] text-white rounded-full justify-center items-center'>
									<div>Add</div>
									<IoAdd className='text-xl font-semibold' />
								</div>
							</div>
						</div>
						<div className='flex flex-col gap-3 border p-3 rounded-xl dark:border-white justify-normal'>
							<div className='flex gap-2 items-center'>
								<div>
									<Image src={e2} alt='image' />
								</div>
								<div className='flex -mt-1 flex-col'>
									<div className='font-semibold'>Prosite</div>
									<div className='text-xs'>$12 </div>
								</div>
							</div>
							<div>
								Unlock enhanced features and benefits with ProSite, taking your online experience to the next level.
							</div>
							<div className='flex justify-end items-center gap-2'>
								<div className='text-[#0B5CFF] p-2'>Learn More</div>
								<div className='bg-[#0B5CFF] flex p-2 pn:max-pp:min-w-[100px] sm:min-w-[100px] text-white rounded-full justify-center items-center'>
									<div>Add</div>
									<IoAdd className='text-xl font-semibold' />
								</div>
							</div>
						</div>


					</div>
				</div>
			</div>
		</div>
	)
}

export default CustomPackage