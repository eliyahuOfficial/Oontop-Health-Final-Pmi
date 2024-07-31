///OonTop.tsx
import React, { useState, useEffect } from 'react';
import { CreateTypePatient } from '../@types/types';
import mergedPatientsService from '../services/mergedpatients';
import MergedPatientDisplay from '../components/MergedPatientDisplay';
import FilterMergedPatients from '../components/FilterMergedPatients';

const OonTop: React.FC = () => {
    const [mergedPatients, setMergedPatients] = useState<CreateTypePatient[]>([]);
    const [filteredPatients, setFilteredPatients] = useState<CreateTypePatient[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchMergedPatients = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await mergedPatientsService.getMergedPatients();
                setMergedPatients(response.data);
                setFilteredPatients(response.data);
            } catch (error) {
                setError('Error fetching merged patients');
                console.error('Error fetching merged patients:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchMergedPatients();
    }, []);

    const handleFilterChange = (filtered: CreateTypePatient[]) => {
        setFilteredPatients(filtered);
    };

    if (loading) return <p className="text-center text-blue-500">Loading...</p>;
    if (error) return <p className="text-center text-red-500">{error}</p>;

    return (
        <div className="p-4">
            <h2 className="text-2xl  mb-4 dark:text-white">OonTop Merged Patients</h2>
            <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row gap-24 px-4">
                <div className="md:w-1/3 lg:w-1/2 ">
                    <FilterMergedPatients patients={mergedPatients} onFilterChange={handleFilterChange} />
                </div>
                <div className="md:w-2/3 lg:w-3/4 flex flex-col">
                    <div className="flex-1 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 8rem)' }}>
                        <div className="grid gap-6 ">
                            {filteredPatients.length > 0 ? (
                                filteredPatients.map(patient => (
                                    <MergedPatientDisplay key={patient._id} patient={patient} />
                                ))
                            ) : (
                                <p className="text-center text-gray-600">No merged patients available.</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OonTop;
