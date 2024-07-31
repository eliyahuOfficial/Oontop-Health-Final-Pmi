//mergedpatients.ts
import axios from "axios";
import { CreateTypePatient } from "../@types/types";

export const baseUrl = "http://localhost:8080/api/v1";


export const getMergedPatients = () => axios.get(`${baseUrl}/merged-patients`);


export const getMergedPatientById = (id: string) => axios.get(`${baseUrl}/merged-patients/${id}`);


export const mergedPatient = (data: CreateTypePatient) => {
    return axios.post(`${baseUrl}/merged-patients`, data, {
        headers: {
            'x-auth-token': localStorage.getItem('token'),
        },
    });
}


export const getComments = (patientId: string) => axios.get(`${baseUrl}/merged-patients/comments/${patientId}`);


export const addComment = (patientId: string, text: string) => {
    return axios.post(`${baseUrl}/merged-patients/comments`, { patientId, text }, {
        headers: {
            "x-auth-token": localStorage.getItem("token"),
        },
    });
};



export const editMergedPatient = (data: CreateTypePatient, id: string | undefined) => {
    return axios.put(`${baseUrl}/merged-patients/${id}`, data, {
        headers: {
            'x-auth-token': localStorage.getItem('token'),
        },
    });
}

export const deleteMergedPatient = (id: string) => {
    return axios.delete(`${baseUrl}/merged-patients/${id}`, {
        headers: {
            'x-auth-token': localStorage.getItem('token'),
        },
    });
};






const mergedPatients = {
    getMergedPatients,
    mergedPatient,
    getMergedPatientById,
    editMergedPatient,
    deleteMergedPatient,
    getComments,
    addComment,
}

export default mergedPatients;
