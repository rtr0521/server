import { Pie } from 'react-chartjs-2';
import {Chart as 
ChartJS, 
Title,
Tooltip,
ArcElement
}from 'chart.js'
import { pieChartData } from './chartData'
ChartJS.register(
    ArcElement,
    Title,
    Tooltip
);
export const PieGraph = () => {
   const options = {};

   return <Pie options={options} data={pieChartData} />;
       
};