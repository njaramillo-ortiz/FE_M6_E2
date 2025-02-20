import { FormSelect } from "semantic-ui-react";

export function DropdownInput({label, options, placeholder, onChange, required})
{
    return(
        <FormSelect
            fluid
            label={label}
            options={options}
            placeholder={placeholder}
            onChange={(e) => onChange(e.target.textContent)}
            required={required}
        />
    );
}