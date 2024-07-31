///PMI.tsx
import React, { useState, useEffect } from 'react';
import PatientList from '../components/PatientList';
import Sidebar from '../components/Sidebar';
import { getTotalDuration, createMergedPatient } from '../utils/mergePatientUtils';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { CreateTypePatient } from '../@types/types';
import mergedPatients from '../services/mergedpatients';
import { usePatients } from '../hooks/usePatients';


const PMI: React.FC = () => {
    const { patients, loading, error, setPatients } = usePatients();
    const [filteredPatients, setFilteredPatients] = useState<CreateTypePatient[]>([]);
    const [showAdvancedSearch, setShowAdvancedSearch] = useState<boolean>(false);
    const [selectedPatients, setSelectedPatients] = useState<CreateTypePatient[]>([]);
    const [mergedPatient, setMergedPatient] = useState<CreateTypePatient | null>(null);

    const navigate = useNavigate();

    useEffect(() => {
        if (error) {
            toast.error(error);
        }
    }, [error]);

    useEffect(() => {
        if (patients.length > 0) {
            setFilteredPatients(patients);
        }
    }, [patients]);

    const handleFilterChange = (filtered: CreateTypePatient[]) => {
        setFilteredPatients(filtered);
    };


    const groupByProvider = (patients: CreateTypePatient[]) => {
        return patients.reduce((acc: Record<string, CreateTypePatient[]>, patient) => {
            const { providers } = patient;
            if (!acc[providers]) {
                acc[providers] = [];
            }
            acc[providers].push(patient);
            return acc;
        }, {});
    };

    const groupedPatients = groupByProvider(filteredPatients);

    const handleCheckboxChange = (record: CreateTypePatient) => {
        setSelectedPatients(prevSelected =>
            prevSelected.includes(record)
                ? prevSelected.filter(p => p !== record)
                : [...prevSelected, record]
        );
    };

    const mergePatients = async () => {
        const totalDuration = getTotalDuration(selectedPatients);
        const mergedPatient = createMergedPatient(selectedPatients, totalDuration);

        try {
            await mergedPatients.mergedPatient(mergedPatient);
            setMergedPatient(mergedPatient);
            toast.success('Merged Patient successfully for OonTop!');
            navigate('/oontop');
        } catch (error) {
            console.error('Error posting merged patient:', error);
            toast.error('Failed to post merged patient.');
        }
    };

    return (
        <div>
            <div className="flex flex-col md:flex-row">
                <Sidebar
                    patients={patients}
                    onFilterChange={handleFilterChange}
                    showAdvancedSearch={showAdvancedSearch}
                    setShowAdvancedSearch={setShowAdvancedSearch}
                    onMergePatients={mergePatients}
                />

                <PatientList
                    groupedPatients={groupedPatients}
                    selectedPatients={selectedPatients}
                    onCheckboxChange={handleCheckboxChange}
                />
            </div>
        </div>
    );
};

export default PMI;
