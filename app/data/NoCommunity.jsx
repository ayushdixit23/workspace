import dynamic from "next/dynamic";
const Lottie = dynamic(() => import("lottie-react"), { ssr: false });
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
