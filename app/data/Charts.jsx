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
					<YAxis className='text-xs' />
					<Tooltip />
					<Legend />
					<Bar dataKey="Y1" fill="#5a6acf" />
					<Bar dataKey="Y2" fill="#16dbcc" />
				</BarChart>
			</ResponsiveContainer>
		</div>
	);
};

export default Charts;
