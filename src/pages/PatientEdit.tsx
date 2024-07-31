///PatientEdit.tsx
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { CreateTypePatient } from "../@types/types";
import { getMergedPatientById, editMergedPatient } from "../services/mergedpatients";
import dialogs from "../ui/dialogs";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { fadeIn } from './veriants';

const PatientEdit = () => {

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<CreateTypePatient>();

    const navigate = useNavigate();
    const { id } = useParams();

    const onEdit = (data: CreateTypePatient) => {
        editMergedPatient(data, id)
            .then((res) => {
                localStorage.setItem("patient_id", res.data._id);
                dialogs.create("Success", "Patient edited successfully").then(() => {
                    navigate("/oontop");
                });
            })
            .catch((e) => {
                dialogs.error("Error", e.response.data);
            });
    };

    useEffect(() => {
        //@ts-ignore
        getMergedPatientById(id)
            .then((res) => {
                setValue("firstName", res.data.firstName);
                setValue("lastName", res.data.lastName);
                setValue("patientDOB", res.data.patientDOB);
                setValue("patientGender", res.data.patientGender);
                setValue("patientZipCode", res.data.patientZipCode);
                setValue("providers", res.data.providers);
                setValue("providerURL", res.data.providerURL);
                setValue("treatmentDate", res.data.treatmentDate);
                setValue("treatmentDuration", res.data.treatmentDuration);
                setValue("startTime", res.data.startTime);
                setValue("endTime", res.data.endTime);
                setValue("dayStart", res.data.dayStart);
                setValue("dayEnd", res.data.dayEnd);
                setValue("meetingType", res.data.meetingType);
                setValue("url", res.data.url);
                setValue("userActivity", res.data.userActivity);
                setValue("comments", res.data.comments);
                setValue("features", res.data.features);
            })
            .catch((err) => console.log(err))
    }, [])



    return (
        <div >
            <div className="p-4" >
                <h2 className="text-2xl  mb-4 dark:text-white">
                    Update Patient Information
                </h2>

                <motion.div
                    variants={fadeIn("up", 0.25)}
                    initial="hidden"
                    whileInView={"show"}
                    viewport={{ once: false, amount: 0.3 }}
                    className="shadow-md rounded mb-5 dark:bg-slate-700 dark:border"
                >

                    <form noValidate onSubmit={handleSubmit(onEdit)} className=" flex  flex-col justify-end items-center  px-6 py-12 lg:px-8 gap-4 ">
                        <input
                            className="custom-input-reg"
                            placeholder="First Name"
                            type="text"
                            {...register("firstName", {
                                required: "This field is mandatory",
                                minLength: { value: 2, message: "Too short" },
                                maxLength: { value: 25, message: "Too long" },
                            })}
                            defaultValue={"firstName"}
                        />
                        {errors.firstName && (
                            <p className="text-red-500">{errors.firstName.message as string}</p>
                        )}
                        <input
                            className="custom-input-reg"
                            placeholder="Last Name"
                            type="text"
                            {...register("lastName", {
                                required: "This field is mandatory",
                                minLength: { value: 2, message: "Too short" },
                                maxLength: { value: 25, message: "Too long" },
                            })}
                        />
                        {errors.lastName && (
                            <p className="text-red-500">{errors.lastName.message as string}</p>
                        )}

                        <input
                            className="custom-input-reg"
                            placeholder="Date of Birth"
                            type="text"
                            {...register("patientDOB", {
                                required: "This field is mandatory",
                                minLength: { value: 2, message: "Too short" },
                                maxLength: { value: 25, message: "Too long" },
                            })}
                        />
                        {errors.patientDOB && (
                            <p className="text-red-500">{errors.patientDOB.message as string}</p>
                        )}

                        <input
                            className="custom-input-reg"
                            placeholder="Gender"
                            type="text"
                            {...register("patientGender", {
                                required: "This field is mandatory",
                                minLength: { value: 2, message: "Too short" },
                                maxLength: { value: 11, message: "Too long" },
                            })}
                        />
                        {errors.patientGender && (
                            <p className="text-red-500">{errors.patientGender.message as string}</p>
                        )}

                        <input
                            className="custom-input-reg"
                            placeholder="ZipCode"
                            type="zipcode"
                            autoComplete="current-patientZipCode"
                            {...register("patientZipCode", {
                                required: "This field is mandatory",
                                minLength: { value: 2, message: "Too short" },
                                maxLength: { value: 20, message: "Too long" },
                            })}
                        />
                        {errors.patientZipCode && (
                            <p className="text-red-500">{errors.patientZipCode.message as string}</p>
                        )}

                        <input
                            className="custom-input-reg"
                            placeholder="Providers"
                            type="providers"
                            autoComplete="current-providers"
                            {...register("providers", {
                                required: "This field is mandatory",
                                min: { value: 2, message: "Too small" },
                                max: { value: 25, message: "Too big" },

                            })}
                        />
                        {errors.providers && (
                            <p className="text-red-500">{errors.providers.message as string}</p>
                        )}

                        <input
                            className="custom-input-reg"
                            placeholder="Provider URL"
                            type="text"
                            {...register("providerURL", {
                                minLength: { value: 6, message: "Too short" },
                                maxLength: { value: 256, message: "Too long" },
                            })}
                        />
                        {errors.providerURL && (
                            <p className="text-red-500">{errors.providerURL.message}</p>
                        )}

                        <input
                            className="custom-input-reg"
                            placeholder="Treatment Date"
                            type="text"
                            {...register("treatmentDate", {
                                minLength: { value: 6, message: "Too short" },
                                maxLength: { value: 25, message: "Too long" },
                            })}
                        />
                        {errors.treatmentDate && (
                            <p className="text-red-500">{errors.treatmentDate.message}</p>
                        )}

                        <input
                            className="custom-input-reg"
                            placeholder="Start Time"
                            type="text"
                            {...register("startTime", {
                                required: "This field is mandatory",
                                minLength: { value: 6, message: "Too short" },
                                maxLength: { value: 25, message: "Too long" },
                            })}
                        />
                        {errors.startTime && (
                            <p className="text-red-500">{errors.startTime.message}</p>
                        )}

                        <input
                            className="custom-input-reg"
                            placeholder="End Time"
                            type="text"
                            {...register("endTime", {
                                required: "This field is mandatory",
                                minLength: { value: 6, message: "Too short" },
                                maxLength: { value: 25, message: "Too long" },
                            })}
                        />
                        {errors.endTime && (
                            <p className="text-red-500">{errors.endTime.message}</p>
                        )}

                        <input
                            className="custom-input-reg"
                            placeholder="Features"
                            type="text"
                            autoComplete="current-features"
                            {...register("features", {
                                required: "This field is mandatory",
                                minLength: { value: 2, message: "Too short" },
                                maxLength: { value: 256, message: "Too long" },
                            })}
                        />
                        {errors.features && (
                            <p className="text-red-500">{errors.features.message}</p>
                        )}



                        <input
                            className="custom-input-reg"
                            placeholder="Day Start"
                            type="text"
                            {...register("dayStart", {
                                required: "This field is mandatory",
                                min: { value: 2, message: "Too small" },
                                max: { value: 25, message: "Too big" },
                            })}
                        />
                        {errors.dayStart && (
                            <p className="text-red-500">{errors.dayStart.message}</p>
                        )}
                        <input
                            className="custom-input-reg"
                            placeholder="Day End"
                            type="text"
                            {...register("dayEnd", {
                                required: "This field is mandatory",
                                min: { value: 2, message: "Too small" },
                                max: { value: 55, message: "Too big" },
                            })}
                        />
                        {errors.dayEnd && (
                            <p className="text-red-500">{errors.dayEnd.message}</p>
                        )}

                        <input
                            className="custom-input-reg"
                            placeholder="Meeting Type"
                            type="text"
                            autoComplete="current-meetingType"
                            {...register("meetingType", {
                                required: "This field is mandatory",
                                min: { value: 2, message: "Too small" },
                                max: { value: 256, message: "Too big" },
                            })}
                        />
                        {errors.meetingType && (
                            <p className="text-red-500">
                                {errors.meetingType.message}
                            </p>
                        )}
                        <input
                            className="custom-input-reg"
                            placeholder="Url"
                            type="text"
                            {...register("url", {
                                required: "This field is mandatory",
                                min: { value: 2, message: "Too small" },
                                max: { value: 256, message: "Too big" },
                            })}
                        />
                        {errors.url && (
                            <p className="text-red-500">{errors.url.message}</p>
                        )}
                        <input
                            className="custom-input-reg"
                            placeholder="User Activity"
                            type="text"
                            {...register("userActivity", {
                                required: "This field is mandatory",
                                min: { value: 2, message: "Too small" },
                                max: { value: 256, message: "Too big" },
                            })}
                        />
                        {errors.userActivity && (
                            <p className="text-red-500">{errors.userActivity.message}</p>
                        )}
                        <input
                            className="custom-input-reg"
                            placeholder="Comments"
                            type="text"
                            {...register("comments", {
                                required: "This field is mandatory",
                                min: { value: 2, message: "Too small" },
                                max: { value: 256, message: "Too big" },
                            })}
                        />
                        {errors.userActivity && (
                            <p className="text-red-500">{errors.userActivity.message}</p>
                        )}

                        <button className="bg-blue-500 hover:bg-blue-400 text-white rounded px-14 py-2 my-10 ">Edit</button>
                    </form>
                </motion.div>
            </div>
        </div>
    )
}

export default PatientEdit