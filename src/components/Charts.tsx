///Charts.tsx
import React from 'react';
import { Bar, Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, PointElement, LineElement } from 'chart.js';
import { ChartsType } from '../@types/types';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, PointElement, LineElement);



const Charts: React.FC<ChartsType> = ({ treatmentDurationData, pastYearData, treatmentDurationOptions, pastYearOptions }) => {
    return (
        <div className="w-full mt-12 flex flex-col gap-2 md:flex-row">
            <div className="bg-white shadow-md rounded p-4 w-full md:w-1/2">
                <h3 className="text-xl font-bold mb-4">Treatment Duration</h3>
                <Bar data={treatmentDurationData} options={treatmentDurationOptions} />
            </div>
            <div className="bg-white shadow-md rounded p-4 w-full md:w-1/2">
                <h3 className="text-xl font-bold mb-4">Patients in the Past Year</h3>
                <Line data={pastYearData} options={pastYearOptions} />
            </div>
        </div>
    );
};

export default Charts;
