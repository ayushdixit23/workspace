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

	return (
		<div>
			<ResponsiveContainer width="100%" height={300}>
				<BarChart className='w-full relative -left-5 top-3' width={730} height={250} data={data}>
					<XAxis dataKey="X" className='text-xs' />
					<YAxis domain={[0, 10]} className='text-xs' />
					<Tooltip />
					<Legend />
					<Bar dataKey="members" fill="#5a6acf" />
					<Bar dataKey="visitors" fill="#16dbcc" />
				</BarChart>
			</ResponsiveContainer>
		</div>
	);
};

export default Charts;
