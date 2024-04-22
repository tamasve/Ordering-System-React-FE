import { SubmitHandler, useForm } from "react-hook-form";
import styled from "styled-components";


const Label = styled.label`
    appearance: none;
    -webkit-appearance: none;
    background-color: transparent;
    color: black;
    border: none;
    text-align: left;
    padding: 0.5em 1em;
`

const Input = styled.input`
    appearance: none;
    -webkit-appearance: none;
    background-color: aliceblue;
    color: black;
    border: 1px solid lightblue;
    border-radius: 0.5em;
    text-align: left;
    padding: 0.5em 1em;
`

const Select = styled.select`
    appearance: none;
    -webkit-appearance: none;
    background-color: aliceblue;
    color: black;
    border: 1px solid lightblue;
    border-radius: 0.5em;
    text-align: left;
    padding: 0.5em 1em;
`

const Button = styled.button`
    appearance: none;
    -webkit-appearance: none;
    background-color: #3437eb;
    color: whitesmoke;
    border: 1px solid black;
    border-radius: 0.5em;
    text-align: center;
    padding: 0.5em 1em;

    &:hover {
        background-color: #0c0e88;
        color: yellow;
    }

    &:active {
        color: #3ae23a;
    }
`

const Form = styled.form`
    display: flex;
    flex-direction: column;
`

const InputSection = styled.div`
    display: grid;
    grid-template-columns: 2fr 3fr;
`

const ErrorDiv = styled.div`
    color: red;
    text-align: left;
    font-size: 0.8em;
    font-weight: 700;
    font-style: oblique;
`


const inputData = {
    email: "test@email.com",
    password: "12345nom",
    role: "read"
};


const selectData = ["read", "read/write", "read/write/delete", "admin"];

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

export default function FlexibleFormOrig() {

    type FormFields = typeof inputData;
    
    const { register, 
            handleSubmit,
            setError,
            formState: { errors, isSubmitting } 
    } = useForm<FormFields>({
        defaultValues: inputData }
    );
    
    const onSubmit: SubmitHandler<FormFields> = async (data) => {
        try {
            await new Promise((resolve) => setTimeout(resolve, 2000));
            console.log(data);
            throw new Error();
        } catch {
            setError("root", {message: "! This e-mail is already taken"})
        }
    };
    
    const genPattern = /^[a-zA-Z0-9.:,;?_-]+$/;     // for fields not checked by regex
    
    const properties: string[] = Object.keys(inputData);
    

    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <InputSection>
                <Label htmlFor="email">E-mail:</Label>
                <Input 
                    {...register("email", {
                        required: "! E-mail is required",
                        pattern: {
                            value: /^[a-z0-9._-]+@[a-z0-9._-]+\.[a-z]{2,4}$/,
                            message: "! That's not an e-mail format"
                        }
                    })} 
                    type="text"
                    name="email"
                    placeholder="Email" />
                <p></p>
                {errors[properties[0]] && <ErrorDiv>{errors[properties[0]].message}</ErrorDiv>}
            </InputSection>

            <InputSection>
                <Label htmlFor="password">Password:</Label>
                <Input 
                    {...register("password", {
                        required: "! Password is required",
                        minLength: {
                            value: 8,
                            message: "! Password length should be at least 8 characters"
                        },
                        pattern: {
                            value: genPattern,
                            message: ""
                        }
                    })} 
                    type="text"
                    name="password"
                    placeholder="Password" />
                <p></p>
                {errors[properties[1]] && <ErrorDiv>{errors[properties[1]].message}</ErrorDiv>}
            </InputSection>

            <InputSection>
                <Label htmlFor="role">Role:</Label>
                <Select 
                    {...register("role", {
                        required: "! Role is required"
                    })}
                    name="role"
                >
                    {selectData.map((value, index) => (
                        <option key={index}>{value}</option>
                    ))}
                </Select>
                <p></p>
                {errors[properties[2]] && <ErrorDiv>{errors[properties[2]].message}</ErrorDiv>}
            </InputSection>

            <Button disabled={isSubmitting} type="submit">
                {isSubmitting ? "Sending..." : "Submit"}    
            </Button>     
            <p></p>
            {errors.root && <ErrorDiv>{errors.root.message}</ErrorDiv>}
        </Form>
    )
}