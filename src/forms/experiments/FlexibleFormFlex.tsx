import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import styled from "styled-components";

/*
    A flexible form with arbitrary number of fields: plain input or select fields
    using React Hook Form and Zod for evaluation
    with flex layout
    Apr 2024
*/

const Form = styled.form<{$direction: string}>`
    background-color: aquamarine;
    border-radius: 1em;
    padding: 2em;
    display: grid;
    flex-direction: ${props => props.$direction === "horizontal" ? "row" : "column"};
    gap: 0.5em;
`

const InputSection = styled.div<{$direction: string}>`
    display: grid;
    grid-template-columns: ${props => props.$direction === "horizontal" ? "2fr" : "2fr 3fr"};
`

const ErrorDiv = styled.div`
    color: red;
    text-align: left;
    font-size: 0.8em;
    font-weight: 700;
    font-style: oblique;
`

const Label = styled.label`
    appearance: none;
    -webkit-appearance: none;
    font: inherit;
    background-color: transparent;
    color: black;
    border: none;
    text-align: left;
    padding: 0.5em 1em;
`

const Input = styled.input`
    appearance: none;
    -webkit-appearance: none;
    font: inherit;
    background-color: aliceblue;
    color: black;
    border: 1px solid lightblue;
    border-radius: 0.5em;
    text-align: left;
    padding: 0.5em 1em;
    height: 2em;
`

const Select = styled.select`
    appearance: none;
    -webkit-appearance: none;
    font: inherit;
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

const Button = styled.button`
    appearance: none;
    -webkit-appearance: none;
    font: inherit;
    background-color: #3437eb;
    color: whitesmoke;
    border: 1px solid black;
    border-radius: 0.5em;
    text-align: center;
    padding: 0.5em 1em;
    height: 2.5em;

    &:hover {
        background-color: #0c0e88;
        color: yellow;
    }

    &:active {
        color: #3ae23a;
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
    style: string,
    direction: "horizontal" | "vertical"
}

export default function FlexibleFormFlex({inputData, schema, style, direction}: Props) {

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
    

    return (
        <>
        <Form $direction={direction} onSubmit={handleSubmit(onSubmit)}>

            {properties.map((prop, index) => 

                typeof inputData[prop] !== "object" ?       // for <select> an array arrives...

                <InputSection $direction={direction} key={index}>
                    <Label htmlFor={prop}>{prop}:</Label>
                    <Input 
                        {...register(prop)} 
                        type="text"
                        name={prop}
                        placeholder={prop} />
                    <p></p>
                    {errors[prop] && <ErrorDiv>{errors[prop].message}</ErrorDiv>}
                </InputSection>

                :

                <InputSection $direction={direction} key={index}>
                    <Label htmlFor={prop}>{prop}:</Label>
                    <Select 
                        {...register(prop)}
                        name={prop}
                    >
                        {inputData[prop].map((value, index) => (
                            <Option key={index}>{value}</Option>
                        ))}
                    </Select>
                    <p></p>
                    {errors[prop] && <ErrorDiv>{errors[prop].message}</ErrorDiv>}
                </InputSection>

            )}

            <InputSection $direction={direction} >
                <Label htmlFor=""></Label>
                <Button disabled={isSubmitting} type="submit">
                    {isSubmitting ? "Sending..." : "Submit"}    
                </Button>
            </InputSection>


        </Form>
            <p></p>
            {errors.root && <ErrorDiv>{errors.root.message}</ErrorDiv>}
        </>
    )
}