import { FormField } from "semantic-ui-react";

export function TextDisplay({label, value })
{
    return(
        <FormField>
            <label>{label}</label>
            <input value={value} readonly></input>
        </FormField>
    );
}