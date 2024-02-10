"use client"
import React from 'react';
import {
	Bar,
	BarChart,
	Legend,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis
} from 'recharts';


const Charts = ({ data }) => {
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
				<BarChart className='w-full relative -left-5 top-3' width={730} height={250} data={data}>
					<XAxis dataKey="X" className='text-xs' />
					<YAxis domain={calculateYAxisDomain(data)} allowDecimals={false} fill="#000000" className='text-xs' />
					<Tooltip />
					
					<Bar dataKey="members" fill="#1814fc" />
					<Bar dataKey="visitors" fill="#a855f7" />
					{/* a855f7 */}
				</BarChart>
			</ResponsiveContainer>
		</div>
	);
};

export default Charts;
