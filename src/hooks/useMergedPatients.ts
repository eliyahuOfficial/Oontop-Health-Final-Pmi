///useMergedPatients.ts
import { useEffect, useState } from "react";
import { IPatient } from "../@types/types";
import { getMergedPatients } from "../services/mergedpatients";

export const useMergedPatients = () => {
    const [mergedPatients, setmergedPatients] = useState<IPatient[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>();


    useEffect(() => {
        setError(null);
        setLoading(true);
        getMergedPatients()
            .then((res) => {
                setmergedPatients(res.data);
                setError(null);
            })
            .catch(() => {
                setError("Network error");
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    return { mergedPatients, loading, error, setmergedPatients };
};