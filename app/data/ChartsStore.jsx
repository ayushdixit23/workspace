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

const ChartsStore = ({ data }) => {
	const calculateYAxisDomain = (data) => {
		const allValues = data.reduce((acc, entry) => {
			const membersValue = parseFloat(entry.Sales);
			// Check if the parsed values are valid numbers before including them
			if (!isNaN(membersValue)) {
				acc.push(membersValue);
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
				<BarChart width={730} height={250} data={data}>
					<XAxis dataKey="Dates" className='text-xs' />
					<YAxis domain={calculateYAxisDomain(data)} className='text-xs' />
					<Tooltip cursor={{ fill: '#171717' }} />
					<Bar dataKey="Sales" fill="#5a6acf" />
				</BarChart>
			</ResponsiveContainer>
		</div>
	);
};

export default ChartsStore;
