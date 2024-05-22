import { Bar } from 'react-chartjs-2';
import {Chart as 
ChartJS, 
CategoryScale,
LinearScale, 
BarElement,
Title,
Tooltip,
Legend
}from 'chart.js'
import { barChartData } from './chartData'
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);
export const BarGraph = () => {
   const options = {};

   return <Bar options={options} data={barChartData} />;
       
};