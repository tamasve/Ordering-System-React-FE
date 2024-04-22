import styled from 'styled-components';
import './App.css'
import FlexibleForm from './forms/FlexibleForm'
import FlexibleFormOrig from './forms/experiments/FlexibleFormOrig';
import FlexibleFormOrigZod from './forms/experiments/FlexibleFormOrigZod'
import { z } from "zod";
import Grid from './forms/experiments/Grid';


const GridMain = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2em;
`

function App() {

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

export default App
