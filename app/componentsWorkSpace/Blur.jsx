"use client";
import React, { useState } from 'react';
import MembershipPopup from './MembershipPopup';

const BlurredComponent = ({ width, height }) => {
	const [pop, setPop] = useState(false)
	return (
		<>
			{pop &&
				<div className='fixed inset-0 z-50 w-screen flex justify-center items-center bg-black/50 sm:h-screen'>
					<MembershipPopup setPop={setPop} />
				</div>
			}

			<div onClick={() => { setPop(true) }} className="absolute h-full max-w-[100%] max-h-[100%] z-40 w-full inset-0 bg-[#ffffffde] border-8 border-black filter blur-md transform scale-110"></div>

		</>
	);
};

export default BlurredComponent;
