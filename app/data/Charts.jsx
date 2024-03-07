"use client"
import React from 'react';
import {
	Bar,
	BarChart,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis
} from 'recharts';


const Charts = ({ data }) => {
	const reversedData = data.reverse()
	const calculateYAxisDomain = (data) => {
		const allValues = data.reduce((acc, entry) => {
			const membersValue = parseFloat(entry.members);
			const visitorsValue = parseFloat(entry.visitors);

			// Check if the parsed values are valid numbers before including them
			if (!isNaN(membersValue)) {
				acc.push(membersValue);
			}

			if (!isNaN(visitorsValue)) {
				acc.push(visitorsValue);
			}

			return acc;
		}, []);

		const highestValue = Math.max(...allValues);
		console.log(highestValue);

		return [0, highestValue * 2];
	};

	return (
		<div>
			<ResponsiveContainer width="100%" height={300}>
				<BarChart className='w-full relative -left-9 sm:-left-7 top-3' width={730} height={250} data={reversedData}>
					<XAxis dataKey="X" className='text-xs' />
					<YAxis domain={calculateYAxisDomain(reversedData)} allowDecimals={false} fill="#000000" className='text-xs' />
					<Tooltip cursor={{ fill: '#171717' }} />
					<Bar dataKey="members" fill="#1814fc" />
					<Bar dataKey="visitors" fill="#a855f7" />
				</BarChart>
			</ResponsiveContainer>
		</div>
	);
};

export default Charts;