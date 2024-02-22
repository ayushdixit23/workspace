"use client"
import { useRouter, useSearchParams } from "next/navigation"
import React, { useEffect } from "react"
import { setCookie } from "cookies-next"
import { storeInSessionStorage } from "../utilsHelper/Tokenwrap"
import axios from "axios"
import toast from "react-hot-toast"


const Component = () => {
	const queryParams = useSearchParams()
	const id = queryParams.get("zyxxpht")
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
				router.push("/main/dashboard")
			} else {
				router.push("/login")
			}

		} else {
			toast.error("Something Went Wrong");
			router.push("/login")
		}
	}

	useEffect(() => {
		if (id) {
			f()
		}
	}, [id])


	return (
		<>

		</>
	)
}

export default Component