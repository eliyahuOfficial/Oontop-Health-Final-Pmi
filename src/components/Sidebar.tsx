///Sidebar.tsx
import React from 'react';
import SearchFilters from '../components/SearchFilters';
import { SidebarType } from '../@types/types';


const Sidebar: React.FC<SidebarType> = ({ patients, onFilterChange, showAdvancedSearch, setShowAdvancedSearch, onMergePatients }) => {
    return (
        <div className="w-full  md:w-1/5 flex flex-col space-y-4 p-4 border-r border-gray-300">
            <SearchFilters
                patients={patients}
                onFilterChange={onFilterChange}
                showAdvancedSearch={showAdvancedSearch}
                setShowAdvancedSearch={setShowAdvancedSearch}
            />
            <button
                className="mt-4 p-2 bg-blue-500 text-white rounded hover:bg-blue-400"
                onClick={onMergePatients}
            >
                Merge Selected Patients
            </button>

        </div>
    );
};

export default Sidebar;
