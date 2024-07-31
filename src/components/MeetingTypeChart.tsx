///MeetingTypeChart.tsx
import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import { MeetingTypeChartType } from '../@types/types';


ChartJS.register(Title, Tooltip, Legend, ArcElement);



const MeetingTypeChart: React.FC<MeetingTypeChartType> = ({ meetingTypes }) => {

    const typeCounts = meetingTypes.reduce((acc, type) => {
        acc[type] = (acc[type] || 0) + 1;
        return acc;
    }, {} as Record<string, number>);


    const primaryGreen = 'rgba(75, 192, 192, 1)';
    const lightBlue = 'rgba(173, 216, 230, 1)';


    const data = {
        labels: Object.keys(typeCounts),
        datasets: [{
            data: Object.values(typeCounts),
            backgroundColor: [
                primaryGreen,
                lightBlue
            ],
        }],
    };

    return <Pie data={data} />;
};

export default MeetingTypeChart;
