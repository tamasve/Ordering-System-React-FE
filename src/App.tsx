import styled from 'styled-components';
import './App.css'
import Categories from './Categories';


const GridMain = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2em;
`

function App() {


    return (
        <>
            <Categories />
        </>
    )
}

export default App
