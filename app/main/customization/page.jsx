"use client"
import { getData } from '@/app/utilsHelper/Useful'
import React from 'react'

const page = () => {
	const { id } = getData()
	return (
		<>
			<div className='h-[80vh] text-3xl flex justify-center font-semibold items-center bg-white dark:bg-[#273142]'>
				<a target='_blank' href={`http://192.168.29.219:3000/lwozxip?id=${id}`} className='underline'>Customize Your Prosite</a>
			</div >
		</>
	)
}

export default page