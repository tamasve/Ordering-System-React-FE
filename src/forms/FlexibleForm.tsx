import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import styled, { css } from "styled-components";

/*
    A flexible form with arbitrary number of fields: plain input or select fields
    using React Hook Form and Zod for evaluation
    and parametrized grid-template-areas as layout
    Apr 2024
*/

const Form = styled.form<{$direction: string, $gridareas: string, $colorstyle: string}>`
    border-radius: 1em;
    padding: 2em;
    display: grid;
    grid-template-areas: ${props => props.$gridareas};
    /* grid-template-rows: repeat(4, 1fr); */
    gap: 0.5em;

    ${props => {
        switch (props.$colorstyle) {
            case "aquamarine": return css`
                background-color: aquamarine;
                `
            case "orange": return css`
                background-color: #f8ecb7;
                `
            case "lily": return css`
                background-color: #cca9fa;
                `
            default: return css`
                background-color: whitesmoke;
                `
        }}
    }
`

const ErrorDiv = styled.div<{$index: number, $colorstyle: string}>`
    color: red;
    text-align: left;
    font-size: 0.8em;
    font-weight: 700;
    font-style: oblique;
    grid-area: ${props => "error" + props.$index};
`

const Label = styled.label<{$index: number, $colorstyle: string}>`
    appearance: none;
    -webkit-appearance: none;
    font: inherit;
    grid-area: ${props => "label" + props.$index};
    background-color: transparent;
    border: none;
    text-align: left;
    padding: 0.5em 1em;
    
    ${props => {
        switch (props.$colorstyle) {
            case "aquamarine": return css`
                color: #000000;
                `
            case "orange": return css`
                color: #e2175a;
                `
            case "lily": return css`
                color: #300d63;
                `
            default: return css`
                color: black;
                `
        }}
    }
`

const Input = styled.input<{$index: number, $colorstyle: string}>`
    appearance: none;
    -webkit-appearance: none;
    font: inherit;
    grid-area: ${props => "input" + props.$index};
    background-color: aliceblue;
    color: black;
    border: 1px solid lightblue;
    border-radius: 0.5em;
    text-align: left;
    padding: 0.5em 1em;
    height: 2em;
`

const Select = styled.select<{$index: number, $colorstyle: string}>`
    appearance: none;
    -webkit-appearance: none;
    font: inherit;
    grid-area: ${props => "input" + props.$index};
    background-color: aliceblue;
    color: black;
    border: 1px solid lightblue;
    border-radius: 0.5em;
    text-align: left;
    padding: 0.5em 1em;
    height: 3em;
`

const Option = styled.option`
    font-style: oblique;
`

const Button = styled.button<{$colorstyle: string}>`
    appearance: none;
    -webkit-appearance: none;
    font: inherit;
    grid-area: button;
    
    color: whitesmoke;
    border: 1px solid black;
    border-radius: 0.5em;
    text-align: center;
    padding: 0.5em 1em;
    height: 2.5em;

    ${props => {
        switch (props.$colorstyle) {
            case "aquamarine": return css`
                background-color: #3437eb;
                color: whitesmoke;

                &:hover {
                    background-color: #0c0e88;
                    color: yellow;
                }

                &:active {
                    color: #3ae23a;
                }
                `
            case "orange": return css`
                background-color: #eb4034;
                color: #e9d8b7;

                &:hover {
                    background-color: #ad3416;
                    color: yellow;
                }

                &:active {
                    color: #ece3ee;
                }
                `
            case "lily": return css`
                background-color: #a784cf;
                color: #300d63;

                &:hover {
                    background-color: #c177d8;
                    color: #1a1a17;
                }

                &:active {
                    color: #c3e23a;
                }
                `
            default: return css`
                /* color: black; */
                `
        }}
    }
`


// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


/*** parameters:
    - existing data as input (update)
    - Zod schema of input data
    - layout style name (from a fixed list)
    - direction of form elements
*/
interface Props {
    inputData: object,
    schema: z.ZodObject<object>,
    direction: "horizontal" | "vertical",
    colorstyle: "aquamarine" | "orange" | "lily"
}


export default function FlexibleForm({inputData, schema, direction, colorstyle}: Props) {

    type FormFields = z.infer<typeof schema>;
    
    const { register, 
            handleSubmit,
            setError,
            formState: { errors, isSubmitting } 
    } = useForm<FormFields>({
        defaultValues: inputData,
        resolver: zodResolver(schema)
    });
    
    const onSubmit: SubmitHandler<FormFields> = async (data) => {
        try {
            await new Promise((resolve) => setTimeout(resolve, 2000));
            console.log(data);
            throw new Error();
        } catch {
            setError("root", {message: "! This e-mail is already taken"})
        }
    };
    
    // properties of the form in an array
    const properties: string[] = Object.keys(inputData);

    // creating grid-template-areas string parameter on the basis of "direction"
    let areas = "";
    switch (direction) {
        case "vertical":
            properties.map((val, index) => {
                areas += `"label${index} input${index}"". error${index}"`;
            });
            areas += `"button button""error999 error999"`;
            break;
        case "horizontal":
            let areas1 = `"`;
            let areas2 = `"`;
            let areas3 = `"`;
            let areas4 = `"`;
            properties.map((val, index) => {
                areas1 += `label${index} `;    // labels, inputs, errors + main error separately (separate rows)
                areas2 += `input${index} `;
                areas3 += `error${index} `;
                areas4 += `error999 `;
            });
            areas1 += '."'
            areas2 += 'button"'
            areas3 += '."'
            areas4 += '."'
            areas = areas1 + areas2 + areas3 + areas4;
            break;
        default: break;
    }

    return (
        <Form $direction={direction} $gridareas={areas} $colorstyle={colorstyle} onSubmit={handleSubmit(onSubmit)}>

            {properties.map((prop, index) => 

                typeof inputData[prop] !== "object" ?       // in the case of a <select> the prop holds an array...
                <>
                    <Label $index={index} $colorstyle={colorstyle} htmlFor={prop} key={"L"+index}>{prop}:</Label>
                    <Input
                        $index={index}
                        {...register(prop)} 
                        type="text"
                        name={prop}
                        placeholder={prop}
                        key={"I"+index} />
                    {errors[prop] && <ErrorDiv $index={index} key={"E"+index}>{errors[prop].message}</ErrorDiv>}
                </>
                :
                <>
                    <Label $index={index} $colorstyle={colorstyle} htmlFor={prop} key={"L"+index}>{prop}:</Label>
                    <Select 
                        $index={index}
                        {...register(prop)}
                        name={prop}
                        key={"S"+index}
                    >
                        {inputData[prop].map((value: string, index: number) => (
                            <Option key={index}>{value}</Option>
                        ))}
                    </Select>
                    {errors[prop] && <ErrorDiv $index={index} key={"E"+index}>{errors[prop].message}</ErrorDiv>}
                </>
            )}

            <Button $colorstyle={colorstyle} disabled={isSubmitting} type="submit">
                {isSubmitting ? "Sending..." : "Submit"}    
            </Button>

            {errors.root && <ErrorDiv $index={999}>{errors.root.message}</ErrorDiv>}

        </Form>
    )
}