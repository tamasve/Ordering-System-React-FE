import styled from 'styled-components';
import './App.css'
import FlexibleForm from './forms/FlexibleForm'
import { z } from "zod";


const GridMain = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2em;
`

export default function Users() {

    const inputData = {
        email: "test@email.com",
        password: "12345nom",
        role: ["read", "read/write", "read/write/delete", "admin"]
    };

    const schema = z.object({
        email: z.string().email(),
        password: z.string().min(8),
        role: z.string().min(4)
    });

    return (
        <GridMain>
            <FlexibleForm inputData={inputData} schema={schema} direction="horizontal" colorstyle="lily" />
        </GridMain>
    )
}
