import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Title, Tooltip, Legend } from 'chart.js';
import { usePieChartData } from './chartData';

ChartJS.register(ArcElement, Title, Tooltip, Legend);

const PieGraph = () => {
    const pieChartData = usePieChartData();

    const options = {};

    return <Pie options={options} data={pieChartData} />;
};

export default PieGraph;
