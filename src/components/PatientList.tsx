///PatientList.tsx
import React from 'react';
import PatientRecordComponent from './PatientRecordComponent';
import { calculateTreatmentDurations, calculateMonthlyCounts } from '../utils/utils';
import Charts from '../components/Charts';
import { PatientListType } from '../@types/types';



const PatientList: React.FC<PatientListType> = ({ groupedPatients, selectedPatients, onCheckboxChange }) => {
    const allPatients = Object.values(groupedPatients).flat();

    const treatmentDurationCounts = calculateTreatmentDurations(allPatients);
    const monthlyCounts = calculateMonthlyCounts(allPatients);

    const treatmentDurationData = {
        labels: ['0-10 min', '10-20 min', '20+ min'],
        datasets: [
            {
                label: 'Number of Treatments',
                data: [treatmentDurationCounts['0-10 min'], treatmentDurationCounts['10-20 min'], treatmentDurationCounts['20+ min']],
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
        ],
    };

    const pastYearData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [
            {
                label: 'Number of Patients',
                data: monthlyCounts,
                fill: false,
                borderColor: 'rgba(75, 192, 192, 1)',
                tension: 0.1,
            },
        ],
    };

    const treatmentDurationOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
            },
            tooltip: {
                callbacks: {
                    label: (tooltipItem: any) => `Number of Treatments: ${tooltipItem.raw}`,
                },
            },
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Duration Ranges',
                },
            },
            y: {
                title: {
                    display: true,
                    text: 'Number of Treatments',
                },
                beginAtZero: true,
            },
        },
    };

    const pastYearOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
            },
            tooltip: {
                callbacks: {
                    label: (tooltipItem: any) => `Number of Patients: ${tooltipItem.raw}`,
                },
            },
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Months',
                },
            },
            y: {
                title: {
                    display: true,
                    text: 'Number of Patients',
                },
                beginAtZero: true,
            },
        },
    };

    return (
        <div className=" w-5/6 px-1 py-4 overflow-auto mx-auto">
            <h2 className="text-2xl  mb-4 dark:text-white">Master Patients Index</h2>
            <div className="flex flex-wrap gap-4 ">
                {Object.keys(groupedPatients).length > 0 ? (
                    Object.keys(groupedPatients).map((providerName) => (
                        <div key={providerName} className="flex-1 min-w-[250px] ">
                            <h3 className="text-xl  mb-2 dark:text-white">{providerName}</h3>
                            <div className="flex flex-col space-y-4 max-h-[490px] overflow-y-auto">
                                {groupedPatients[providerName].map((patient) => (
                                    <PatientRecordComponent
                                        key={patient._id}
                                        record={patient}
                                        onCheckboxChange={onCheckboxChange}
                                        isChecked={selectedPatients.includes(patient)}
                                    />
                                ))}
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No patients found</p>
                )}
            </div>
            <Charts
                treatmentDurationData={treatmentDurationData}
                pastYearData={pastYearData}
                treatmentDurationOptions={treatmentDurationOptions}
                pastYearOptions={pastYearOptions}
            />
        </div>
    );
};

export default PatientList;
