import { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export const lineChartData = { /* ... (unchanged) */ };
export const fetchTaskStats = async () => { /* ... (unchanged) */ };
export const usePieChartData = () => { /* ... (unchanged) */ };

const useBarChartData = () => {  // Modified function
    const [barChartData, setBarChartData] = useState({
        labels: [], 
        datasets: [
            {
                label: 'Number of Occurrences',
                data: [],
                backgroundColor: ["rgba(255,99,132,0.2)"],
                borderColor: ["rgb(75, 192, 192)"],
                borderWidth: 1
            },
        ],
    });

    useEffect(() => {
        const fetchDuplicateActivities = async () => {
            try {
                const response = await axios.get('https://server-3uk1.onrender.com/admin/activities/duplicates'); // Make sure this matches your backend endpoint
                const data = response.data;

                setBarChartData({
                    labels: data.map(item => item.name),
                    datasets: [
                        {
                            ...barChartData.datasets[0],
                            data: data.map(item => item.count),
                        },
                    ],
                });
            } catch (error) {
                console.error('Error fetching duplicate activities:', error.message);
            }
        };

        fetchDuplicateActivities();
    }, []); // Empty dependency array ensures this runs once on mount

    return barChartData;
};

export const BarGraph = () => {
    const barChartData = useBarChartData();
    const options = {};

    return <Bar options={options} data={barChartData} />;
};

export { useBarChartData }; // Export the hook
