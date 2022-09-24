import React from "react";
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	TimeScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import "chartjs-adapter-moment";

ChartJS.register(
	CategoryScale,
	LinearScale,
	TimeScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend
);

const LineChart = ({ chartData }) => {
	console.log("chartData", chartData);
	if (Object.keys(chartData).length !== 0) {
		return (
			<Line
				height={300}
				data={chartData}
				options={{
					responsive: true,
					plugins: {
						legend: {
							position: "top",
						},
						title: {
							display: true,
						},
					},
				}}
			/>
		);
	}
};

export default LineChart;
