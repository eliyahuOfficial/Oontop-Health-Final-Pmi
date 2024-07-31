///UserActivityChart.tsx
import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import { UserActivityChartType } from '../@types/types';


ChartJS.register(Title, Tooltip, Legend, ArcElement);


const UserActivityChart: React.FC<UserActivityChartType> = ({ userActivity }) => {

    const activityCounts = userActivity.reduce((acc, activity) => {
        acc[activity] = (acc[activity] || 0) + 1;
        return acc;
    }, {} as Record<string, number>);


    const primaryGreen = 'rgba(75, 192, 192, 1)';
    const lightBlue = 'rgba(173, 216, 230, 1)';


    const data = {
        labels: Object.keys(activityCounts),
        datasets: [{
            data: Object.values(activityCounts),
            backgroundColor: [
                primaryGreen,
                lightBlue
            ],
        }],
    };

    return <Pie data={data} />;
};

export default UserActivityChart;
