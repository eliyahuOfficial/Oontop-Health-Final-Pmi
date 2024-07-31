///PatientProfile.tsx
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { IPatient, ErrorType } from "../@types/types";
import { deleteMergedPatient, getMergedPatientById } from "../services/mergedpatients";
import { showErrorDialog } from "../ui/dialogs";
import { RiDeleteBin5Line } from "react-icons/ri";
import { formatDate } from '../utils/dateUtils';
import MeetingTypeChart from "../components/MeetingTypeChart";
import UserActivityChart from "../components/UserActivityChart";
import { convertToCSV } from '../utils/csvUtils';
import { RiDownload2Line } from 'react-icons/ri';
import { useAuth } from "../hooks/useAuth";


const PatientProfile = () => {

    const { id } = useParams<{ id: string }>();
    const [mergedPatient, setmergedPatient] = useState<IPatient>();
    const [error, setError] = useState<ErrorType>();
    const { isAdmin } = useAuth();
    const navigate = useNavigate();
    useEffect(() => {
        getMergedPatientById(id ?? "")
            .then((res) => {
                setmergedPatient(res.data);
            })
            .catch((e) => {
                const status = e.response ? e.response.status : null;
                const message = e.message;
                const details = e.response ? e.response.data : null;
                setError({ status, message, details });
            });
    }, [id]);



    const downloadCSV = (patient: IPatient) => {
        const csvContent = convertToCSV(patient);
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.setAttribute('href', url);
        link.setAttribute('download', `patient_${patient._id}.csv`);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };




    const deleteCardHandler = (id: string) => {
        deleteMergedPatient(id)
            .then((res) => {
                console.log(res);
                showErrorDialog("Delete", "User deleted").then(() => {
                    navigate("/oontop");
                })

            })

            .catch((err) => console.log(err));
    };
    if (!mergedPatient) {
        return <p>Loading...</p>;
    }

    const meetingTypes = mergedPatient.meetingType?.split(", ") ?? [];
    const userActivity = mergedPatient.userActivity?.split(", ") ?? [];

    return (
        <div className="  flex flex-col p-4" >
            <h2 className="text-2xl  mb-4 dark:text-white">Patient Details</h2>
            {mergedPatient && (

                <div className="rounded shadow-md p-4 bg-white">
                    <div className="mt-1">

                        <h3 className="text-lg py-0.5 font-bold">{mergedPatient.firstName} {mergedPatient.lastName}</h3>
                        <p><strong>Date of Birth:</strong> {formatDate(mergedPatient.patientDOB)}</p>
                        <p><strong>Gender:</strong> {mergedPatient.patientGender}</p>
                        <p><strong>Zip Code:</strong> {mergedPatient.patientZipCode}</p>
                        <p><strong>Providers:</strong> {mergedPatient.providers}</p>
                        <p><strong>Provider URL:</strong> {mergedPatient.providerURL}</p>
                        <p><strong>Treatment Date:</strong> {formatDate(mergedPatient.treatmentDate)}</p>
                        <p><strong>Treatment Duration:</strong> {mergedPatient.treatmentDuration} minutes</p>
                        <p><strong>Start Time:</strong> {mergedPatient.startTime}</p>
                        <p><strong>End Time:</strong> {mergedPatient.endTime}</p>
                        <p><strong>Features:</strong> {mergedPatient.features} </p>
                        <p><strong>Day Start:</strong> {mergedPatient.dayStart}</p>
                        <p><strong>Day End:</strong> {mergedPatient.dayEnd}</p>
                        <p><strong>Meeting Type:</strong> {mergedPatient.meetingType}</p>
                        <p><strong>URL:</strong> {mergedPatient.url}</p>
                        <p><strong>User Activity:</strong> {mergedPatient.userActivity}</p>
                        <p><strong>Comments:</strong> {mergedPatient.comments}</p>

                        <div className="md:flex gap-20 mx-auto mt-4">
                            <div className="flex flex-col my-5 gap-12 w-64 justify-center mx-auto mb-4">
                                <MeetingTypeChart meetingTypes={meetingTypes} />
                            </div>

                            <div className="flex flex-col my-5 gap-12 w-64 justify-center mx-auto mb-4">
                                <UserActivityChart userActivity={userActivity} />
                            </div>
                        </div>

                        <div className="md:flex my-5 gap-8 ">
                            <div className="flex justify-center items-center ">
                                <button className="bg-blue-500 hover:bg-blue-400 text-white rounded px-12 py-2 my-10 ">
                                    <Link to={`/patientprofile/${id}`}>
                                        Update Patient Information
                                    </Link>
                                </button>

                            </div>
                            {isAdmin && (
                                <div className="flex justify-center items-center ">

                                    <RiDeleteBin5Line
                                        onClick={() => deleteCardHandler(mergedPatient._id)}
                                        style={{
                                            cursor: "pointer",
                                            fontSize: "28px",
                                            color: "blue"
                                        }}
                                    />

                                </div>
                            )}
                            <div className="flex justify-center items-center">
                                <button
                                    onClick={() => downloadCSV(mergedPatient)}
                                    className="bg-green-500 hover:bg-green-400 text-white rounded px-14 py-2 my-10 flex items-center gap-2"
                                >
                                    <RiDownload2Line style={{ fontSize: "20px" }} />
                                    Download CSV
                                </button>
                            </div>


                        </div>
                    </div>
                </div>
            )}


        </div >
    );
};

export default PatientProfile;
