import styled from 'styled-components';
import './App.css'
import FlexibleForm from './forms/FlexibleForm'
import { z } from "zod";
import axios from 'axios';
import { useEffect, useLayoutEffect, useState } from 'react';


const GridMain = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    gap: 2em;
`

const Field = styled.section`
    background-color: #dbec90;
    border: 1px solid darkgray;
    border-radius: 1em;
    padding: 0.5em;
    margin: 1em;
`

export default function Categories() {

    interface DataRecord {
        id: number,
        name: string
    }

    const [records, setRecords] = useState<DataRecord[]>({});
    const [loading, setLoading] = useState(true);
    const [refresh, setRefresh] = useState(false);
    const [error, setError] = useState<string>("");
    
    useEffect(() => {
        (async () => {
            setLoading(true);
            try {
                const response = await axios.get("http://localhost:8080/categories");
                setRecords(response.data);
                console.log(response.data)
                setError("");
                setRefresh(false);
            } catch (err) {
                setRecords({});
                setError(err.response.data.message);
            }
            setLoading(false);
        })();
    }, [refresh])

    const inputData: Partial<DataRecord> = {
        name: ""
    };

    const schema = z.object({
        name: z.string().min(4)
    });

    const dataHandler = async (data: object) => {
        console.log(data);
        const response = await axios.post("http://localhost:8080/categories", data);
        setRefresh(true);
        return response.data;
    }

    return (
        <GridMain>
            <FlexibleForm inputData={inputData} schema={schema} dataHandler={dataHandler} direction="horizontal" colorstyle="orange" />

            {loading && <div>Loading data...</div>}
            {!loading && (
            <div>
                {records.map((record, index) => (
                    <Field key={index}>{record.name}</Field>
                ))}
            </div>
            )}
            {error && <div>{error}</div>}
        </GridMain>
    )
}
