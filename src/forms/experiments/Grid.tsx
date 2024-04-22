import styled from "styled-components";

// Experimenting with parametrized grid-template-areas using styled components

const areas = [
    "gr gr re",
    "gr gr re",
    "bl1 bl1 re"
];


const Main = styled.div<{$gridareas: string}>`
    display: grid;
    grid-template-areas: ${props => props.$gridareas};
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(3, 1fr);
    width: 500px;
    height: 400px;
`

// area name parametrized
const Green = styled.div<{$areaname: string}>`
    background-color: green;
    grid-area: ${props => props.$areaname};
`

const Red = styled.div`
    background-color: red;
    grid-area: re;
`

// area index parametrized
const Blue = styled.div<{$index: number}>`
    background-color: blue;
    grid-area: ${props => "bl" + props.$index};
`

export default function Grid() {

    let param = "";

    areas.map((value, i) => {
        param += `"${value}"`;
    })

    return (
        <Main $gridareas={param}>
            <Green $areaname="gr" />
            <Red />
            <Blue $index={1}/>
        </Main>
    );
}