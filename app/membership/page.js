"use client"
import { useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { getData } from "../utils/Useful";
import axios from "axios";
import Razorpay from "razorpay";

const Sample5 = () => {
	const [monthprice, setMonthPrice] = useState(true);
	const { id, fullname } = getData()

	const pricingData = [
		{
			mainTitle: "",
			price: "",
			infoNote: "",
			"Product Listings": "Product Listings",
			"Platform  Fees": "Platform  Fees",
			"Create Collections": "Create Collections",
			"Product Review Time": "Product Review Time",
			"Create Community": "Create Community",
			"Analytics and Reports": "Analytics and Reports",
			"Export Reports": "Export Reports",
			"Discounts and Promotions": "Discounts and Promotions",
			titleRow1: "Store",
			"Create Topics (free/paid)": "Create Topics (free/paid)",
			"Analytics and reports for Community": "Analytics and reports",
			"Platform Fees (only for paid topics)": "Platform Fees (only for paid topics)",
			titleRow5: "Community",
			"Members Recognition": "Members Recognition",
			titleRow9: "Deliveries",
			Deliveries: "Deliveries",
			"Delivery Options": "Delivery Options",
			"Shipping Discounts": "Shipping Discounts",
			"Animated intro": "Animated intro",
			"Express Delivery": "Express Delivery",
			titleRow13: "Prosite",
			"Responsive Templates": "Responsive Templates",
			"Quick Suggestion": "Quick Suggestion",
			titleRow17: "AI Support",
			"Thumbnail Generator": "Thumbnail Generator",
			"Description generator": "Description generator",
			"Keyword Suggestions": "Keyword Suggestions",
			"Contact Support": "Contact Support"
		},
		{
			mainTitle: "Basic",
			popular: true,
			price: {
				month: "$0",
				year: "$0",
			},
			infoNote: "Basic features for up to 10 employees with everything you need.",
			"Product Listings": "Up-to 5 Products",
			"Analytics and Reports": "Basic analytics",
			"Platform  Fees": "10% per transaction",
			"Create Collections": "1",
			"Product Review Time": "6 Hrs",

			"Create Topics (free/paid)": "2",
			"Discounts and Promotions": "Not available",
			"Platform Fees (only for paid topics)": "10% per transaction",
			"Create Community": "2",
			"Analytics and reports for Community": <div className="flex flex-col justify-center items-center w-full h-full text-sm">
				<div>Basic analytics</div>
				<div>Popularity</div>
				<div>Custom</div>
				<div>Custom</div>
			</div>,
			"Export Reports": true,
			"Members Recognition": "Not available",
			Deliveries: "Free 10 Devilries for free ",
			"Delivery Options": "Basic Delivery option",
			"Shipping Discounts": "Not available",
			"Express Delivery": "Not available",
			"Responsive Templates": "Limited selection of templates",
			"Animated intro": "Not available",
			"Quick Suggestion": "Limited selection of templates",
			"Thumbnail Generator": "Not available",
			"Description generator": "Not available",
			"Keyword Suggestions": "Not available",
			"Contact Support": "Basic Support"
		},
		{
			mainTitle: "Professional",
			price: {
				month: "$108",
				year: "$1296",
			},
			infoNote:
				"Advanced features and reporting better workflows and automation.",
			"Product Listings": "10 products / collection",
			"Platform  Fees": "1% per transaaction",
			"Create Collections": "5",
			"Create Topics (free/paid)": "5",
			"Product Review Time": "1 hrs ",
			"Discounts and Promotions": "Create and manage discounts and promotions",
			"Create Community": "5",
			"Analytics and Reports": "Advanced analytics",
			"Platform Fees (only for paid topics)": "1% per transaction",
			"Analytics and reports for Community": <div className="flex flex-col justify-center items-center w-full h-full text-sm">
				<div>Advanced analytics</div>
				<div>Custom</div>
				<div>Custom</div>
				<div>Custom</div>
			</div>,
			"Export Reports": true,
			"Members Recognition": "Recognition and badges for premium members",
			Deliveries: "1000 deliveries",
			"Delivery Options": "Expanded delivery options",
			"Shipping Discounts": "Exclusive shipping discounts",
			"Animated intro": "Access to premium intro",
			"Express Delivery": "Priority and express delivery options",
			"Responsive Templates": "Access to premium responsive templates",
			"Quick Suggestion": "Access to premium responsive templates",
			"Thumbnail Generator": <FaCheckCircle />,
			"Description generator": <FaCheckCircle />,
			"Keyword Suggestions": <FaCheckCircle />,
			"Contact Support": "24 hrs Contact Support"
		},
		{
			mainTitle: "Custom",
			// price: {
			// 	month: "$4",
			// 	year: "$40",
			// },
			infoNote: "Personalised service and enterprise security for large teams.",
			"Create Topics (free/paid)": "custom",
			"Product Listings": "Custom",
			"Platform  Fees": "1% per transaaction",
			"Create Collections": "Custom",
			"Discounts and Promotions": "Custom",
			"Product Review Time": "Custom",
			"Analytics and Reports": "Custom",
			"Platform Fees (only for paid topics)": "Custom",
			"Analytics and reports for Community": "Custom",
			"Create Community": "custom",
			"Export Reports": true,
			"Members Recognition": "Custom",
			Deliveries: "Custom",
			"Delivery Options": "Custom",
			"Shipping Discounts": "Custom",
			"Express Delivery": "Custom",
			"Responsive Templates": "Custom",
			"Animated intro": "Custom",
			"Quick Suggestion": "Custom",
			"Thumbnail Generator": "Custom",
			"Description generator": "Custom",
			"Keyword Suggestions": "Custom",
			"Contact Support": "Custom"
		},
	];

	const buyMembership = async (data) => {
		console.log(data)
		try {
			const res = await axios.post(`http://localhost:7200/api/v1/membershipbuy/${id}/65671ded04b7d0d07ef0e794`)
			if (res.data.success) {
				let options = {
					"key_id": "rzp_live_Ms5I8V8VffSpYq", // Enter the Key ID generated from the Dashboard
					"amount": monthprice ? data.price.month * 100 : data.price.year * 100,
					"currency": "INR",
					"name": `${fullname}`,
					"description": `Buying Membership of ${data.mainTitle}`,
					// "image": "https://example.com/your_logo",
					"order_id": res?.data?.oid, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
					"handler": async function (response) {
						const finalres = await axios.post(`http://localhost:7200/api/v1/memfinalize/${id}/${res.data?.order}`,
							{
								razorpay_order_id: response?.razorpay_order_id,
								razorpay_payment_id: response?.razorpay_payment_id,
								razorpay_signature: response?.razorpay_signature,
								status: true,
							},
						);
						console.log(finalres)
					},
					prefill: {
						email: res?.data?.email || '',
						contact: res?.data?.phone || '',
						name: fullname,
					},

					"theme": {
						"color": "#3399cc"
					}
				};

				let rpay = new Razorpay(options);

				// rpay.on('payment.failed', async function (response) {
				// 	const finalres = await axios.post(`http://localhost:7200/api/v1/memfinalize/${id}/${res.data?.order}`,
				// 		{
				// 			razorpay_order_id: response?.razorpay_order_id,
				// 			razorpay_payment_id: response?.razorpay_payment_id,
				// 			razorpay_signature: response?.razorpay_signature,
				// 			status: false,
				// 		},
				// 	);
				// 	console.log(finalres)
				// })

				// rpay.open();
			}
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<div className="bg-gray-300 min-h-[100vh] scrollbar-hide flex items-center justify-center">
			<div className="sm:mx-5 mx-2 pb-10">
				<div className="py-8 lg:py-14 flex flex-col items-center">
					<span className="text-[#365CCE] text-base">Pricing</span>
					<span className="font-semibold text-center text-4xl sm:text-5xl mt-3 mb-6">
						Find your perfect plan
					</span>
					<span className="sm:text-xl text-center text-lg font-light">
						Simple, transparent pricing that grows with you. Try any plan free
						for 30 days.
					</span>

					<div className="px-2 py-2 bg-[#F2F4F7] md:m-auto mt-5 md:mt-10 space-x-1 flex justify-center items-center rounded-lg">
						<button
							onClick={() => setMonthPrice(true)}
							className={`py-2 px-2 md:px-1.5 sm:px-3.5 drop-shadow-md hover:bg-white text-[#667085] hover:text-black rounded-md
                ${monthprice && "bg-white border-[#94a3b8] border text-black "}`}
						>
							Monthly billing
						</button>
						<button
							onClick={() => setMonthPrice(false)}
							className={`ml-1 py-2 px-2 md:px-1.5 sm:px-3.5 border-[#94a3b8] drop-shadow-md hover:bg-white text-[#667085]  hover:text-black rounded-md
                ${!monthprice && "bg-white border-[#94a3b8] border text-black"}`}
						>
							Annual billing
						</button>
					</div>
				</div>

				<div className="sm:max-w-[1280px] max-w-[450px] mx-auto bg-white rounded-xl">
					<table className="w-full text-start border-spacing-5 border-separate flex gap-4 flex-col md:flex-row sm:p-5 lg:p-0">
						{pricingData.map((data, index) => (
							<tbody
								key={index}
								className={
									index === 0
										? "hidden lg:block"
										: "border-2 lg:border-none font-medium text-sm text-[#101828] mb-10 lg:mb-0 rounded-lg"
								}
							>
								<tr>
									<td>
										<div className="font-semibold text-xl  text-[#101828] h-7">
											{data.mainTitle}
											{data.popular && (
												<span
													className="text-sm font-medium text-[#365CCE] px-2.5 py-0.5 bg-[#F9F5FF] rounded-2xl ml-2"
												>
													Popular
												</span>
											)}
										</div>
									</td>
								</tr>
								<tr>
									<td className="h-[50px]">
										<div>
											<span className="font-semibold text-5xl">
												{monthprice ? data.price?.month : data.price?.year}
											</span>
											{data.price && (
												<span className="text-[#475467] font-normal ml-1">
													{monthprice ? "per month" : "per year"}
												</span>
											)}
										</div>
									</td>
								</tr>
								<tr>
									<td className="h-[50px] lg:h-[70px] xl:h-[50px]">
										<span className="text-[#475467] text-sm font-normal">
											{data.infoNote}
										</span>
									</td>
								</tr>
								<tr>
									{index === 0 ? (
										<td className="h-[50px]"></td>
									) : (
										<td>
											<button
												onClick={() => buyMembership(data)}
												className="w-full bg-[#365CCE] text-white rounded-lg py-3 font-semibold"
											>
												Get Started
											</button>
										</td>
									)}
								</tr>
								{/* portion after first title */}
								<tr>
									<td
										className="h-5 text-sm font-semibold text-[#365CCE]"
										colSpan={2}
									>
										{data.titleRow1}
										<span className="lg:hidden">
											{pricingData[0]["titleRow1"]}
										</span>
									</td>
								</tr>
								<tr>
									<td
										className={
											index === 0
												? "h-5"
												: "h-6 text-center flex justify-between lg:justify-center flex-row-reverse"
										}
									>
										<span className="font-medium text-sm text-[#101828]">
											{data["Product Listings"]}
										</span>
										<span className="lg:hidden">{pricingData[0]["Product Listings"]}</span>
									</td>
								</tr>

								<tr>
									<td
										className={
											index === 0
												? "h-5"
												: "h-6 text-center flex justify-between lg:justify-center flex-row-reverse"
										}
									>
										<span className="font-medium text-sm text-[#101828]">
											{data["Platform  Fees"]}
										</span>
										<span className="lg:hidden">{pricingData[0]["Platform  Fees"]}</span>
									</td>
								</tr>
								<tr>
									<td
										className={
											index === 0
												? "h-5"
												: "h-7 text-center flex justify-between lg:justify-center flex-row-reverse"
										}
									>
										<span className="font-medium text-sm text-[#101828]">
											{data["Create Collections"]}
										</span>
										<span className="lg:hidden">
											{pricingData[0]["Create Collections"]}
										</span>
									</td>
								</tr>
								<tr>
									<td
										className={
											index === 0
												? "h-5"
												: "h-7 text-center flex justify-between lg:justify-center flex-row-reverse"
										}
									>
										<span className="font-medium text-sm text-[#101828]">
											{data["Product Review Time"]}
										</span>
										<span className="lg:hidden">
											{pricingData[0]["Product Review Time"]}
										</span>
									</td>
								</tr>
								<tr>
									<td
										className={
											index === 0
												? "h-5"
												: "h-7 text-center flex justify-between lg:justify-center flex-row-reverse"
										}
									>
										<span className="font-medium text-sm text-[#101828]">
											{data["Analytics and Reports"]}
										</span>
										<span className="lg:hidden">
											{pricingData[0]["Analytics and Reports"]}
										</span>
									</td>
								</tr>
								<tr>
									<td
										className={
											index === 0
												? "h-5"
												: "h-7 text-center flex justify-between lg:justify-center flex-row-reverse"
										}
									>
										<span className="font-medium text-sm text-[#101828]">
											{data["Discounts and Promotions"]}
										</span>
										<span className="lg:hidden">
											{pricingData[0]["Discounts and Promotions"]}
										</span>
									</td>
								</tr>
								<tr>
									<td>
										<hr />
									</td>
								</tr>
								{/* portion after second title */}
								<tr >
									<td
										colSpan={2}
										className="h-5 text-sm font-semibold text-[#365CCE] whitespace-nowrap"
									>
										{data.titleRow5}
										<span className="lg:hidden">
											{pricingData[0]["titleRow5"]}
										</span>
									</td>
								</tr>
								<tr>
									<td

										className={
											index === 0
												? "h-5"
												: "h-7 text-center flex justify-between lg:justify-center flex-row-reverse"
										}
									>
										<span className="font-medium text-sm text-[#101828]">{data["Create Community"]}</span>
										<span className="lg:hidden">
											{pricingData[0]["Create Community"]}
										</span>
									</td>
								</tr>
								<tr>
									<td

										className={
											index === 0
												? "h-5"
												: "h-7 text-center flex justify-between lg:justify-center flex-row-reverse"
										}
									>
										<span className="font-medium text-sm text-[#101828]">{data["Create Topics (free/paid)"]}</span>
										<span className="lg:hidden">
											{pricingData[0]["Create Topics (free/paid)"]}
										</span>
									</td>
								</tr>

								<tr>
									<td

										className={
											index === 0
												? "h-5"
												: "h-7 text-center flex justify-between lg:justify-center flex-row-reverse"
										}
									>
										<span>{data["Platform Fees (only for paid topics)"]}</span>
										<span className="lg:hidden">
											{pricingData[0]["Platform Fees (only for paid topics)"]}
										</span>
									</td>
								</tr>
								<tr>
									<td

										className={
											index === 0
												? "h-[82px]"
												: "h-[100px] text-center flex justify-between lg:justify-center flex-row-reverse"
										}
									>
										<span>{data["Analytics and reports for Community"]}</span>
										<span className="lg:hidden">
											{pricingData[0]["Analytics and reports for Community"]}
										</span>
									</td>
								</tr>
								<tr>
									<td
										className={
											index === 0
												? "h-10"
												: "h-10 text-center flex justify-between lg:justify-center flex-row-reverse"
										}
									>
										<span>{data["Members Recognition"]}</span>
										<span className="lg:hidden">
											{pricingData[0]["Members Recognition"]}
										</span>
									</td>
								</tr>
								<tr>
									<td>
										<hr />
									</td>
								</tr>
								<tr>
									<td colSpan={2} className="h-5 text-sm font-semibold text-[#365CCE] whitespace-nowrap">
										{data.titleRow9}
										<span className="lg:hidden">
											{pricingData[0]["titleRow9"]}
										</span>
									</td>
								</tr>
								<tr>
									<td className={index === 0 ? "h-5" : "h-7 text-center flex justify-between lg:justify-center flex-row-reverse"}>
										<span>{data["Deliveries"]}</span>
										<span className="lg:hidden">
											{pricingData[0]["Deliveries"]}
										</span>
									</td>
								</tr>
								<tr>
									<td className={index === 0 ? "h-5" : "h-7 text-center flex justify-between lg:justify-center flex-row-reverse"}>
										<span>{data["Delivery Options"]}</span>
										<span className="lg:hidden">
											{pricingData[0]["Delivery Options"]}
										</span>
									</td>
								</tr>
								<tr>
									<td className={index === 0 ? "h-5" : "h-7 text-center flex justify-between lg:justify-center flex-row-reverse"}>
										<span>{data["Shipping Discounts"]}</span>
										<span className="lg:hidden">
											{pricingData[0]["Shipping Discounts"]}
										</span>
									</td>
								</tr>
								<tr>
									<td className={index === 0 ? "h-5" : "h-7 text-center flex justify-between lg:justify-center flex-row-reverse"}>
										<span>{data["Express Delivery"]}</span>
										<span className="lg:hidden">
											{pricingData[0]["Express Delivery"]}
										</span>
									</td>
								</tr>
								<tr>
									<td>
										<hr />
									</td>
								</tr>
								<tr>
									<td colSpan={2} className="h-5 text-sm font-semibold text-[#365CCE] whitespace-nowrap">
										{data.titleRow13}
										<span className="lg:hidden">
											{pricingData[0]["titleRow13"]}
										</span>
									</td>
								</tr>
								<tr>
									<td className={index === 0 ? "h-5" : "h-7 text-center flex justify-between lg:justify-center flex-row-reverse"}>
										<span>{data["Responsive Templates"]}</span>
										<span className="lg:hidden">
											{pricingData[0]["Responsive Templates"]}
										</span>
									</td>
								</tr>
								<tr>
									<td className={index === 0 ? "h-5" : "h-7 text-center flex justify-between lg:justify-center flex-row-reverse"}>
										<span>{data["Animated intro"]}</span>
										<span className="lg:hidden">
											{pricingData[0]["Animated intro"]}
										</span>
									</td>
								</tr>
								<tr>
									<td>
										<hr />
									</td>
								</tr>
								<tr>
									<td colSpan={2} className="h-5 text-sm font-semibold text-[#365CCE] whitespace-nowrap">
										{data.titleRow17}
										<span className="lg:hidden">
											{pricingData[0]["titleRow17"]}
										</span>
									</td>
								</tr>
								<tr>
									<td className={index === 0 ? "h-5" : "h-7 text-center flex justify-between lg:justify-center flex-row-reverse"}>
										<span>{data["Quick Suggestion"]}</span>
										<span className="lg:hidden">
											{pricingData[0]["Quick Suggestion"]}
										</span>
									</td>
								</tr>
								<tr>
									<td className={index === 0 ? "h-5" : "h-7 text-center flex justify-between lg:justify-center flex-row-reverse"}>
										<span>{data["Thumbnail Generator"]}</span>
										<span className="lg:hidden">
											{pricingData[0]["Thumbnail Generator"]}
										</span>
									</td>
								</tr>
								<tr>
									<td className={index === 0 ? "h-5" : "h-7 text-center flex justify-between lg:justify-center flex-row-reverse"}>
										<span>{data["Description generator"]}</span>
										<span className="lg:hidden">
											{pricingData[0]["Description generator"]}
										</span>
									</td>
								</tr>
								<tr>
									<td className={index === 0 ? "h-5" : "h-7 text-center flex justify-between lg:justify-center flex-row-reverse"}>
										<span>{data["Keyword Suggestions"]}</span>
										<span className="lg:hidden">
											{pricingData[0]["Keyword Suggestions"]}
										</span>
									</td>
								</tr>
								<tr>
									<td className={index === 0 ? "h-5" : "h-7 text-center flex justify-between lg:justify-center flex-row-reverse"}>
										<span>{data["Contact Support"]}</span>
										<span className="lg:hidden">
											{pricingData[0]["Contact Support"]}
										</span>
									</td>
								</tr>

							</tbody>
						))}
					</table>
				</div>
			</div>
		</div>
	);
};

export default Sample5;
