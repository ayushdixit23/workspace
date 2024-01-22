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

const ChartsStore = ({ data }) => {
	return (
		<div>
			<ResponsiveContainer width="100%" height={300}>
				<BarChart width={730} height={250} data={data}>
					<XAxis dataKey="X" className='text-xs' />
					<YAxis />
					<Tooltip />
					<Legend />
					<Bar dataKey="Y" fill="#5a6acf" />
				</BarChart>
			</ResponsiveContainer>
		</div>
	);
};

export default ChartsStore;
