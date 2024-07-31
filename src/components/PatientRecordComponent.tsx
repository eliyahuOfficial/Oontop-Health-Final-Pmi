///PatientRecordComponent.tsx
import React from 'react';
import { calculateDuration } from '../utils/utils';
import { PatientRecordType } from '../@types/types';


const PatientRecordComponent: React.FC<PatientRecordType> = ({ record, onCheckboxChange, isChecked }) => {
    const calculateAge = (dob: string): number => {
        const birthDate = new Date(dob);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDifference = today.getMonth() - birthDate.getMonth();
        if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    };



    const age = calculateAge(record.patientDOB);
    const duration = calculateDuration(record.startTime, record.endTime);

    return (
        <div className="bg-white shadow-md rounded p-6 mb-4 relative">
            <p><strong>First Name:</strong> {record.firstName}</p>
            <p><strong>Last Name:</strong> {record.lastName}</p>
            <p><strong>Age:</strong> {age} years</p>
            <p><strong>Gender:</strong> {record.patientGender}</p>
            <p><strong>Zip Code:</strong> {record.patientZipCode}</p>
            <p><strong>Provider:</strong> {record.providers}</p>
            <p><strong>Provider URL:</strong> <a href={record.providerURL} target="_blank" rel="noopener noreferrer">{record.providerURL}</a></p>
            <p><strong>Treatment Date:</strong> {new Date(record.treatmentDate).toDateString()}</p>
            <p><strong>Treatment Duration:</strong> {duration} minutes</p>
            <p><strong>Day Start:</strong> {record.dayStart}</p>
            <p><strong>Day End:</strong> {record.dayEnd}</p>
            <p><strong>Features:</strong> {record.features}</p>
            <p><strong>Time Start:</strong> {record.startTime}</p>
            <p><strong>Time End:</strong> {record.endTime}</p>
            <p><strong>Meeting Type:</strong> {record.meetingType}</p>
            <p><strong>URL:</strong> {record.url}</p>
            <p><strong>User Activity:</strong> {record.userActivity}</p>
            <p><strong>Comments:</strong> {record.comments}</p>
            <input
                type="checkbox"
                className="absolute top-2 right-2"
                checked={isChecked}
                onChange={() => onCheckboxChange(record)}
            />

        </div>
    );
};

export default PatientRecordComponent;
