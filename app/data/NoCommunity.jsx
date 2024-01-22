"use client"
import Lottie from "lottie-react";
import React from "react";
import animationData from "../assets/image/animationData.json"

const NoCommunity = () => {
	return (
		<>
			<div className="flex justify-center items-center pn:max-sm:h-[75vh] ">
				<Lottie
					animationData={animationData}
					size={200}
					loop={true}
				/>
			</div>
		</>
	);
};

export default NoCommunity;
