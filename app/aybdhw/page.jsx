"use client"
import { useRouter, useSearchParams } from "next/navigation"
import React, { useEffect, useState } from "react"
import { setCookie } from "cookies-next"
import toast, { Toaster } from "react-hot-toast"
import { storeInSessionStorage } from "../utilsHelper/Tokenwrap"
import axios from "axios"

const page = () => {
	const queryParams = useSearchParams()
	const id = queryParams.get("zyxxpht")

	const [loading, setLoading] = useState(false)
	const path = queryParams.get("path")
	const router = useRouter()

	const waitkrnevalafunc = async (data) => {
		try {
			storeInSessionStorage(data.sessionId)
			setCookie(`excktn${data.sessionId}`, data.access_token)
			setCookie(`frhktn${data.sessionId}`, data.refresh_token)

			return true;
		} catch (e) {
			console.log(e);
		}
	};

	const f = async () => {
		const res = await axios.get(`http://localhost:7190/api/v1/fetchwithid/${id}`)
		console.log(res.data)
		if (res.data?.success) {
			const a = await waitkrnevalafunc(res.data);
			if (a === true) {
				setLoading(false);
				router.push("/main/dashboard")
			}
			setLoading(false);
		} else {
			toast.error("Something Went Wrong");
		}
	}

	useEffect(() => {
		if (id) {
			f()
		}
	}, [id])

	return (
		<>
			<Toaster />
		</>
	)
}

export default page