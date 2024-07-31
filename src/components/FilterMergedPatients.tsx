///FilterMergedPatients.tsx
import React, { useState } from 'react';
import { CreateTypePatient, FilterMergedPatientsType } from '../@types/types';


const FilterMergedPatients: React.FC<FilterMergedPatientsType> = ({ patients, onFilterChange }) => {
    const [firstName, setFirstName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');
    const [gender, setGender] = useState<string>('');
    const [zipCode, setZipCode] = useState<string>('');
    const [dayStart, setDayStart] = useState<string>('');
    const [dayEnd, setDayEnd] = useState<string>('');
    const [treatmentDate, setTreatmentDate] = useState<string>('');
    const [dob, setDob] = useState<string>('');

    const filterPatients = () => {
        let filtered: CreateTypePatient[] = patients;

        if (firstName) {
            filtered = filtered.filter(patient =>
                patient.firstName.toLowerCase().includes(firstName.toLowerCase())
            );
        }

        if (lastName) {
            filtered = filtered.filter(patient =>
                patient.lastName.toLowerCase().includes(lastName.toLowerCase())
            );
        }

        if (gender) {
            filtered = filtered.filter(patient => patient.patientGender.toLowerCase() === gender.toLowerCase());
        }

        if (zipCode) {
            filtered = filtered.filter(patient => patient.zipCode.includes(zipCode));
        }

        if (dayStart && dayEnd) {
            filtered = filtered.filter(patient => {
                const treatmentDate = new Date(patient.treatmentDate);
                return treatmentDate >= new Date(dayStart) && treatmentDate <= new Date(dayEnd);
            });
        }

        if (treatmentDate) {
            filtered = filtered.filter(patient => {
                const treatment = new Date(patient.treatmentDate).toLocaleDateString('en-CA');
                return treatment === treatmentDate;
            });
        }

        if (dob) {
            filtered = filtered.filter(patient => {
                const patientDob = new Date(patient.patientDOB).toISOString().split('T')[0];
                return patientDob === dob;
            });
        }

        onFilterChange(filtered);
    };

    return (
        <div className="flex flex-col space-y-4 dark:text-white">
            <input
                type="text"
                placeholder="First Name"
                value={firstName}
                onChange={e => setFirstName(e.target.value)}
                className="p-2 border border-gray-300 rounded"
            />
            <input
                type="text"
                placeholder="Last Name"
                value={lastName}
                onChange={e => setLastName(e.target.value)}
                className="p-2 border border-gray-300 rounded"
            />

            <select
                value={gender}
                onChange={e => setGender(e.target.value)}
                className="p-2 border border-gray-300 rounded"
            >
                <option value="">All Genders</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
            </select>

            <input
                type="text"
                placeholder="Zip Code"
                value={zipCode}
                onChange={e => setZipCode(e.target.value)}
                className="p-2 border border-gray-300 rounded"
            />
            <label>Day Start / Day End:</label>
            <input
                type="date"
                value={dayStart}
                onChange={e => setDayStart(e.target.value)}
                className="p-2 border border-gray-300 rounded"
            />
            <input
                type="date"
                value={dayEnd}
                onChange={e => setDayEnd(e.target.value)}
                className="p-2 border border-gray-300 rounded"
            />
            <label>Treatment Date:</label>
            <input
                type="date"

                value={treatmentDate}
                onChange={e => setTreatmentDate(e.target.value)}
                className="p-2 border border-gray-300 rounded"
            />
            <label>Date of Birth:</label>
            <input
                type="date"
                value={dob}
                onChange={e => setDob(e.target.value)}
                className="p-2 border border-gray-300 rounded"
            />

            <button
                onClick={filterPatients}
                className="p-2 bg-green-500 text-white rounded hover:bg-green-400 "
            >
                Apply Filters
            </button>
        </div>
    );
};

export default FilterMergedPatients;
