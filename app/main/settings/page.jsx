"use client"
import Loader from '@/app/data/Loader'
import { useGetProfileQuery, usePostProfileMutation } from '@/app/redux/apiroutes/userLoginAndSetting'
import { getItemSessionStorage, storeInSessionStorage } from '@/app/utilsHelper/Tokenwrap'
import { getData } from '@/app/utilsHelper/Useful'
import { deleteCookie, setCookie } from 'cookies-next'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import { FaCamera, FaPen } from 'react-icons/fa'

const page = () => {
	const { id } = getData()
	const [profileDetails] = usePostProfileMutation();
	const [loading, setLoading] = useState(true);
	const [loading2, setLoading2] = useState(false);
	const router = useRouter()
	const [profile, setProfile] = useState({
		fullname: "",
		username: "",
		date: "",
		image: "",
		email: "",
		phone: "",
		bio: ""
	})
	const sessionId = getItemSessionStorage()
	// const sessionId = getItemSessionStorage()

	const { data, isLoading } = useGetProfileQuery(
		{ id: id },
		{ skip: !id }
	);

	const formatDatetime = (datetimeString) => {
		const datetimeObject = new Date(datetimeString);
		return (
			("0" + datetimeObject.getDate()).slice(-2) + "/" +
			("0" + (datetimeObject.getMonth() + 1)).slice(-2) + "/" +
			datetimeObject.getFullYear()
		);
	};


	const formatDatetimereverse = (datetimeString) => {
		const date = datetimeString?.split("/")
		const revrsedDate = date?.reverse()
		const year = revrsedDate?.[0]
		const month = revrsedDate?.[1]
		const day = revrsedDate?.[2]
		return (
			`${year}-${month}-${day}`

		);
	};

	const sendDetails = async (e) => {
		e.preventDefault();
		const stringDate = formatDatetime(profile.date)
		try {
			setLoading2(true)
			// const data = {
			// 	name: profile.fullname,
			// 	phone: profile.phone,
			// 	email: profile.email,
			// 	username: profile.username,
			// 	image: profile.image,
			// 	date: stringDate,
			// 	bio: profile.bio
			// };
			const data = new FormData()
			data.append("name", profile.fullname)
			data.append("phone", profile.phone)
			data.append("email", profile.email)
			data.append("username", profile.username)
			data.append("date", stringDate)
			data.append("image", profile.image)
			data.append("bio", profile.bio)

			const response = await profileDetails({
				id: id,
				data: data,
			});
			if (response.data?.success) {
				await resetCookies(response.data);
				router.refresh()
				setLoading2(false)
				toast.success("Changes Saved!")
			} else {
				toast.error(response.error.message)
			}
		} catch (e) {
			setLoading2(false)
			console.log(e);
		} finally {
			setLoading2(false)
		}
	};

	const resetCookies = async (data) => {
		try {
			deleteCookie(`excktn${sessionId}`);
			deleteCookie(`sessionId_${sessionId}`);
			deleteCookie(`frhktn${sessionId}`);
			storeInSessionStorage(data?.sessionId)
			setCookie(`excktn${data?.sessionId}`, data?.access_token, { secure: false })
			setCookie(`frhktn${data?.sessionId}`, data?.refresh_token, { secure: false })
		} catch (e) {
			console.log(e);
		}
	};

	useEffect(() => {
		setLoading(true);
		setProfile({
			...profile,
			fullname: data?.data?.name,
			phone: data?.data?.phone,
			email: data?.data?.email,
			username: data?.data?.username,
			image: data?.data.image,
			date: formatDatetimereverse(data?.data.date.toString()),
			bio: data?.data.bio
		});
		setLoading(false);
	}, [data]);

	const handleImageChange = (e) => {
		const file = e.target.files[0];
		setProfile({
			...profile,
			image: file
		})
	}

	// const handleChangePhotoClick = () => {
	// 	console.log(document);
	// 	const fileInput = document.getElementById("maryona");
	// 	console.log(fileInput)

	// 	if (fileInput) {
	// 		fileInput.click();
	// 	} else {
	// 		console.error("Element with ID 'image' not found");
	// 	}
	// };

	const isProfileChanged = () => {
		return (
			profile.fullname !== data?.data?.name ||
			profile.phone !== data?.data?.phone ||
			profile.email !== data?.data?.email ||
			profile.username !== data?.data?.username ||
			profile.image !== data?.data.image ||
			profile.date !== formatDatetimereverse(data?.data.date?.toString()) ||
			profile.bio !== data?.data.bio
		);
	};

	const isProfileChangedAnswer = isProfileChanged()

	console.log(
		isProfileChanged()
	)

	if (isLoading || loading) {
		return <Loader />;
	}

	if (loading2) {
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

	return (
		<>
			<Toaster />
			<div className='md:h-[83vh] flex flex-1 flex-col dark:bg-[#273142] bg-white'>
				<div>
					<div className='pt-4 pb-2 border-b dark:border-[#3d4654] px-7 font-medium text-[#4880FF]'>Edit Profile</div>
				</div>
				<div className='flex justify-center items-center w-full'>

					<div className='grid sm:max-md:grid-cols-4 md:grid-cols-8 lg:grid-cols-7 gap-6 p-2 sm:p-5 w-[95%] h-full'>
						<div className='md:col-span-2 sm:max-md:col-span-4 lg:col-span-1 pt-5'>
							<div className='flex justify-center items-center'>
								{
									data?.data.image ? <label htmlFor="settings" className='relative light:border max-h-[130px] z-30 rounded-[30px] max-w-[130px]'>

										<img className='w-full h-full object-cover min-h-[130px] min-w-[130px] bg-cover rounded-[30px] max-h-[130px] max-w-[130px]' src={typeof profile.image === "string" ? data?.data.image : (profile.image ? URL.createObjectURL(profile.image) : "")} alt="" />
										<div className='absolute -bottom-1 right-1'>
											<div htmlFor='settings' className='w-9 h-9 cursor-pointer text-white flex justify-center items-center rounded-full bg-[#5570F1] '>
												<FaPen />
											</div>
										</div>

										<input id='settings' name='image' accept="image/*" type="file" className='hidden' onChange={handleImageChange} />
									</label>
										:
										<>
											<label htmlFor="settings" className="w-[130px] relative mb-2 dark:bg-[#323d4e] bg-[#ECECEE] items-center justify-center h-[130px] rounded-[30px] light:border-2 flex flex-col">
												{!profile.image ? < div className=' w-full h-full flex justify-center dark:bg-[#323d4e] bg-[#ECECEE] items-center rounded-[30px]'>
													<div
														className="flex justify-center flex-col items-center"
													>
														<FaCamera className="text-2xl" />
													</div>
												</div> :
													<>
														<img className='w-full h-full object-cover bg-cover rounded-[30px] max-h-[130px] max-w-[130px]' src={URL.createObjectURL(profile.image)} alt="" />
														<div className='absolute -bottom-1 right-1'>
															<div htmlFor='settings' className='w-9 h-9 z-30 cursor-pointer text-white flex justify-center items-center rounded-full bg-[#5570F1] '>
																<FaPen />
															</div>
														</div>
													</>}
											</label>
											<input id='settings' name='image' accept="image/*" type="file" className='hidden' onChange={handleImageChange} />
										</>

								}


							</div>
						</div>
						<div className='w-full flex lg:pl-3 flex-col gap-4 md:col-span-3 sm:max-md:col-span-2 lg:col-span-3'>
							<div className='w-full flex flex-col gap-1 sm:max-w-[450px]'>
								<div className='w-full text-sm'>Your Name</div>
								<input type="text" onChange={(e) => setProfile({ ...profile, fullname: e.target.value })} value={profile.fullname} className='w-full outline-none rounded-xl placeholder:text-sm  placeholder:text-[#718EBF] p-1.5 px-3 dark:bg-[#323d4e] dark:border-none border' placeholder='Charlene Reed' />
							</div>
							<div className='w-full flex flex-col gap-1 sm:max-w-[450px]'>
								<div className='w-full text-sm'>Email</div>
								<input type="email" onChange={(e) => setProfile({ ...profile, email: e.target.value })} value={profile.email} className='w-full outline-none rounded-xl placeholder:text-sm  placeholder:text-[#718EBF] p-1.5 px-3 dark:bg-[#323d4e] dark:border-none border' placeholder='charlenereed@gmail.com  ' />
							</div>
							<div className='w-full flex flex-col gap-1 sm:max-w-[450px]'>
								<div className='w-full text-sm'>Date of Birth</div>
								<input type="date" onChange={(e) => setProfile({ ...profile, date: e.target.value })} value={profile.date} className='w-full outline-none rounded-xl placeholder:text-sm  placeholder:text-[#718EBF] p-1.5 px-3 dark:bg-[#323d4e] dark:border-none border' placeholder='25 January 1990' />
							</div>
						</div>
						<div className='w-full lg:pl-3 flex flex-col gap-4 md:col-span-3 sm:max-md:col-span-2 lg:col-span-3'>
							<div className='w-full flex flex-col gap-1 sm:max-w-[450px]'>
								<div className='w-full text-sm'>User Name</div>
								<input type="text" onChange={(e) => setProfile({ ...profile, username: e.target.value })} value={profile.username} className='w-full outline-none rounded-xl placeholder:text-sm  placeholder:text-[#718EBF] p-1.5 px-3 dark:bg-[#323d4e] dark:border-none border' placeholder='@charlenereed' />
							</div>
							<div className='w-full flex flex-col gap-1 sm:max-w-[450px]'>
								<div className='w-full text-sm'>Mobile Number</div>
								<input type="tel" onChange={(e) => setProfile({ ...profile, phone: e.target.value })} value={profile.phone} className='w-full outline-none rounded-xl placeholder:text-sm  placeholder:text-[#718EBF] p-1.5 px-3 dark:bg-[#323d4e] dark:border-none border' placeholder=' ' />
							</div>
							<div className='w-full flex flex-col gap-1 sm:max-w-[450px]'>
								<div className='w-full text-sm'>Bio</div>
								<input type="text" onChange={(e) => setProfile({ ...profile, bio: e.target.value })} value={profile.bio} className='w-full outline-none rounded-xl placeholder:text-sm  placeholder:text-[#718EBF] p-1.5 px-3 dark:bg-[#323d4e] dark:border-none border' placeholder='Enter Your Bio' />
							</div>
						</div>
					</div>
				</div>
				<div className='flex justify-end items-end p-4 flex-grow'>
					{isProfileChangedAnswer ? < button onClick={(e) => sendDetails(e)} className='bg-[#5570F1] p-2 px-14 rounded-full text-white'>
						Save
					</button> :
						< button disabled className='bg-[#a1a8ce] p-2 px-14 rounded-full text-white'>
							Save
						</button>
					}
				</div>
			</div >
		</>
	)
}

export default page