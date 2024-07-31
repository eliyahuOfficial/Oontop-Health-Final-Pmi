///MergedPatientDisplay.tsx
import React from 'react';
import { MergedPatientDisplayType } from '../@types/types';
import { Link } from 'react-router-dom';
import { formatDate } from '../utils/dateUtils';

const MergedPatientDisplay: React.FC<MergedPatientDisplayType> = ({ patient }) => {
    if (!patient) {
        return <p>No merged patient data available</p>;
    }

    return (
        <div className="p-6 mb-4 bg-white rounded shadow-md dark:border ">
            <Link to={`/oontop/${patient._id}`}>
                <h2 className="text-xl mb-4">Patient Details</h2>
                <p><strong>ID:</strong> {patient._id}</p>
                <p><strong>First Name:</strong> {patient.firstName}</p>
                <p><strong>Last Name:</strong> {patient.lastName}</p>
                <p><strong>Date of Birth:</strong> {formatDate(patient.patientDOB)}</p>
                <p><strong>Gender:</strong> {patient.patientGender}</p>
                <p><strong>Zip Code:</strong> {patient.patientZipCode}</p>
                <p><strong>Providers:</strong> {patient.providers}</p>
                <p><strong>Provider URL:</strong> {patient.providerURL}</p>
                <p><strong>Treatment Date:</strong> {formatDate(patient.treatmentDate)}</p>
                <p><strong>Treatment Duration:</strong> {patient.treatmentDuration} minutes</p>
                <p><strong>Start Time:</strong> {patient.startTime}</p>
                <p><strong>End Time:</strong> {patient.endTime}</p>
                <p><strong>Features: </strong> {patient.features}</p>
                <p><strong>Day Start:</strong> {patient.dayStart}</p>
                <p><strong>Day End:</strong> {patient.dayEnd}</p>
                <p><strong>Meeting Type:</strong> {patient.meetingType}</p>
                <p><strong>URL:</strong> {patient.url}</p>
                <p><strong>User Activity:</strong> {patient.userActivity}</p>
                <p><strong>Comments:</strong> {patient.comments}</p>
            </Link>
        </div>
    );
};

export default MergedPatientDisplay;
