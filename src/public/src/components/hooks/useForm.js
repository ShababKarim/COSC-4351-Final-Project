import { useState } from "react";

export const useForm = initiialValues => {
    const [values, setValues] = useState(initiialValues);

    return [
        values,
        e => {
            setValues({
                ...values,
                [e.target.name]: e.target.value
            });
        }
    ];
};
