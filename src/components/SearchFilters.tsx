///SearchFilters.tsx
import React, { useState } from 'react';
import { CreateTypePatient, SearchFiltersType } from '../@types/types';

const SearchFilters: React.FC<SearchFiltersType> = ({
    patients,
    onFilterChange,
    showAdvancedSearch,
    setShowAdvancedSearch,
}) => {
    const [firstName, setFirstName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');
    const [provider, setProvider] = useState<string>('');
    const [gender, setGender] = useState<string>('');
    const [dayStart, setDayStart] = useState<string>('');
    const [dayEnd, setDayEnd] = useState<string>('');

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

        if (provider) {
            filtered = filtered.filter(patient => patient.providers === provider);
        }

        if (gender) {
            filtered = filtered.filter(patient => patient.patientGender.toLowerCase() === gender.toLowerCase());
        }

        if (dayStart && dayEnd) {
            filtered = filtered.filter(patient => {
                const treatmentDate = new Date(patient.treatmentDate);
                return treatmentDate >= new Date(dayStart) && treatmentDate <= new Date(dayEnd);
            });
        }

        onFilterChange(filtered);
    };

    return (
        <div className="flex flex-col space-y-4 ">

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
                value={provider}
                onChange={e => setProvider(e.target.value)}
                className="p-2 border border-gray-300 rounded"
            >
                <option value="">All Providers</option>
                <option value="eCW">eCW</option>
                <option value="AMD">AMD</option>
                <option value="Quest">Quest</option>
                <option value="Behavidance">Behavidance</option>
            </select>

            <button
                onClick={() => setShowAdvancedSearch(prev => !prev)}
                className="p-2 bg-blue-500 text-white rounded hover:bg-blue-400"
            >
                {showAdvancedSearch ? 'Hide Advanced Search' : 'Show Advanced Search'}
            </button>

            {showAdvancedSearch && (
                <div className="flex flex-col space-y-4">
                    <select
                        value={gender}
                        onChange={e => setGender(e.target.value)}
                        className="p-2 border border-gray-300 rounded"
                    >
                        <option value="">All Genders</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                    </select>
                    <label className='dark:text-white'>Day Start / Day End:</label>
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
                </div>
            )}

            <button
                onClick={filterPatients}
                className="p-2 bg-green-500 text-white rounded hover:bg-green-400"
            >
                Apply Filters
            </button>
        </div>
    );
};

export default SearchFilters;
