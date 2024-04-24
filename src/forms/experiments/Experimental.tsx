import styled from 'styled-components';
import './App.css'
import FlexibleForm from '../FlexibleForm'
import FlexibleFormOrig from './FlexibleFormOrig';
import FlexibleFormOrigZod from './FlexibleFormOrigZod'
import { z } from "zod";
import Grid from './Grid';


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
            {/* <Grid /> */}
            {/* <FlexibleFormOrig /> */}
            {/* <FlexibleFormOrigZod /> */}
            {/* <FlexibleForm inputData={inputData} schema={schema} direction="vertical" /> */}
            <FlexibleForm inputData={inputData} schema={schema} direction="horizontal" colorstyle="lily" />
        </GridMain>
    )
}
