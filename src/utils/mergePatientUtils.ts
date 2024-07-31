///mergePatientUtils.ts
import { CreateTypePatient } from '../@types/types';
import { calculateDuration } from '../utils/utils';


export const getTotalDuration = (patients: CreateTypePatient[]) => {
    return patients.reduce((total, patient) => {
        const duration = calculateDuration(patient.startTime, patient.endTime);
        return total + duration;
    }, 0);
};


export const createMergedPatient = (patients: CreateTypePatient[], totalDuration: number): CreateTypePatient => {
    return {
        firstName: [...new Set(patients.map(p => p.firstName))].join(', '),
        lastName: patients.map(p => p.lastName).join(', '),
        patientDOB: patients[0]?.patientDOB || '',
        patientGender: patients[0]?.patientGender || '',
        patientZipCode: patients[0]?.patientZipCode || '',
        providers: patients.map(p => p.providers).join(', '),
        providerURL: patients.map(p => p.providerURL).join(', '),
        treatmentDate: new Date().toISOString().split('T')[0],
        treatmentDuration: totalDuration,
        startTime: patients.map(p => p.startTime).join(', '),
        endTime: patients.map(p => p.endTime).join(', '),
        features: patients.map(p => p.features).join(', '),
        dayStart: patients.map(p => p.dayStart || '').join(', '),
        dayEnd: patients.map(p => p.dayEnd || '').join(', '),
        meetingType: patients.map(p => p.meetingType).join(', '),
        url: patients.map(p => p.url).join(', '),
        userActivity: patients.map(p => p.userActivity).join(', '),
        comments: patients.map(p => p.comments).join(', '),


    };
};
