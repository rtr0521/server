import { useEffect, useState } from 'react';
import axios from 'axios';

export const lineChartData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August','September','November','December'],
    datasets: [
        {
            label: "Brigada",
            data: [20, 15, 30,],
            borderColor: "rgb(75, 192, 192)",
        },
        {
          label: "Training",
          data: [50, 23, 10],
          borderColor: "rgb(175, 92, 152)",
      },
      {
        label: "Workforce",
        data: [31, 3, 5],
        borderColor: "rgb(5, 92, 92)",
    },
    ],
};
/* 
export const barChartData = {
    labels: ['Brigada', 'Checkpoint', 'Training', 'Exercise', 'Firing'],
    datasets: [
        {
            data: [50, 15, 40,60,80],
            backgroundColor: ["rgba(255,99,132,0.2)"],
            borderColor: ["rgb(75, 192, 192)"],
            borderWidth: 1
        },
    ],
}; */

export const fetchTaskStats = async () => {
    try {
        const response = await axios.get('http://localhost:5000/admin/task/PieSummary');
        return response.data;
    } catch (error) {
        console.error('Error fetching task statistics:', error.message);
        return { todo: 0, inProgress: 0, done: 0 };
    }
};

const usePieChartData = () => {
    const [chartData, setChartData] = useState({
        labels: ['Todo', 'In Progress', 'Done'],
        datasets: [{
            label: 'Task Status',
            data: [0, 0, 0],
            backgroundColor: [
                'rgb(255, 99, 132)',
                'rgb(54, 162, 235)',
                'rgb(255, 205, 86)'
            ],
            hoverOffset: 4
        }]
    });

    useEffect(() => {
        const getData = async () => {
            const data = await fetchTaskStats();
            setChartData({
                labels: ['Todo', 'In Progress', 'Done'],
                datasets: [{
                    label: 'Task Status',
                    data: [data.todo, data.inProgress, data.done],
                    backgroundColor: [
                        'rgb(255, 99, 132)',
                        'rgb(255, 205, 86)',
                        'rgb(50,205,50)'
                    ],
                    hoverOffset: 4
                }]
            });
        };

        getData();
    }, []);

    return chartData;
};

export { usePieChartData };
