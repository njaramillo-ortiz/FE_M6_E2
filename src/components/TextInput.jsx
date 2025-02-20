import { FormField } from "semantic-ui-react";

export function TextInput({label, placeholder, onChange, useRef})
{
    return(
        <FormField>
            <label>{label}</label>
            <input placeholder={"Ej: "+placeholder} onChange={(e) => onChange(e.target.value)} ref={useRef}></input>
        </FormField>
    );
}