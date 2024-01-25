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
					<XAxis dataKey="Dates" className='text-xs' />
					<YAxis className='text-xs' />
					<Tooltip />
					<Legend />
					<Bar dataKey="Sales" fill="#5a6acf" />
				</BarChart>
			</ResponsiveContainer>
		</div>
	);
};

export default ChartsStore;
